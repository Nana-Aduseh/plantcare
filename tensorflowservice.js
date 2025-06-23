import * as tf from '@tensorflow/tfjs';
import { bundleResourceIO } from '@tensorflow/tfjs-react-native';
import { decodeJpeg } from '@tensorflow/tfjs-react-native';

class TensorFlowService {
  constructor() {
    this.model = null;
    this.isModelLoaded = false;
    // Your exact class labels matching the Python model
    this.labels = [
      'Cassava___bacterial_blight',
      'Cassava___green_mite', 
      'Cassava___healthy',
      'Cassava___mosaic',
      'Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot',
      'Corn_(maize)___Northern_Leaf_Blight',
      'Corn_(maize)___healthy',
      'Pepper_bell___Bacterial_spot',
      'Pepper_bell___healthy',
      'Potato___Early_blight',
      'Potato___Late_blight',
      'Potato___healthy',
      'Tomato___Bacterial_spot',
      'Tomato___Early_blight',
      'Tomato___Late_blight',
      'Tomato___Tomato_Yellow_Leaf_Curl_Virus',
      'Tomato___healthy'
    ];
  }

  async loadModel() {
    try {
      console.log('Loading TensorFlow Lite model...');
      
      // Load the model from assets
      const modelUrl = bundleResourceIO(require('/Users/Nana Kojo/Desktop/Plantcare new/plantcare/assets/model/plant_disease_model.tflite'));
      this.model = await tf.loadLayersModel(modelUrl);
      
      this.isModelLoaded = true;
      console.log('Model loaded successfully!');
      
      // Warm up the model with a dummy prediction
      await this.warmupModel();
      
    } catch (error) {
      console.error('Error loading model:', error);
      throw new Error('Failed to load TensorFlow model');
    }
  }

  async warmupModel() {
    // Create a dummy input to warm up the model
    const dummyInput = tf.zeros([1, 224, 224, 3]);
    await this.model.predict(dummyInput);
    dummyInput.dispose();
    console.log('Model warmed up');
  }

  preprocessImage(imageUri) {
    return new Promise((resolve, reject) => {
      try {
        // Decode the image from URI
        const imageTensor = decodeJpeg(imageUri);
        
        // Resize to exactly 128x128 to match your model's input size
        const resized = tf.image.resizeBilinear(imageTensor, [128, 128]);
        
        // IMPORTANT: Keep values in range [0, 255] to match your preprocessing
        // Your Python code uses img_to_array which keeps values in [0, 255]
        // DO NOT normalize to [0, 1] - this would break the model!
        
        // Add batch dimension (1, 128, 128, 3)
        const batched = resized.expandDims(0);
        
        // Clean up intermediate tensors to prevent memory leaks
        imageTensor.dispose();
        resized.dispose();
        
        console.log('Image preprocessed:', {
          shape: batched.shape,
          dtype: batched.dtype
        });
        
        resolve(batched);
      } catch (error) {
        console.error('Image preprocessing error:', error);
        reject(error);
      }
    });
  }

  async predict(imageUri) {
    if (!this.isModelLoaded) {
      throw new Error('Model not loaded. Call loadModel() first.');
    }

    try {
      // Preprocess the image
      const preprocessedImage = await this.preprocessImage(imageUri);
      
      // Make prediction
      console.log('Making prediction...');
      const predictions = await this.model.predict(preprocessedImage);
      
      // Get prediction data
      const predictionData = await predictions.data();
      
      // Clean up tensors
      preprocessedImage.dispose();
      predictions.dispose();
      
      // Process results
      const results = this.processResults(predictionData);
      
      console.log('Prediction completed:', results);
      return results;
      
    } catch (error) {
      console.error('Prediction error:', error);
      throw new Error('Failed to make prediction');
    }
  }

  processResults(predictionData) {
    // Convert to array and create result objects
    const predictions = Array.from(predictionData);
    
    // Get the index with highest probability (argmax)
    const resultIndex = predictions.indexOf(Math.max(...predictions));
    
    // Create array of {class, confidence} objects
    const results = predictions.map((confidence, index) => ({
      class: this.labels[index],
      confidence: Math.round(confidence * 100 * 100) / 100, // Round to 2 decimal places
      isTopPrediction: index === resultIndex
    }));
    
    // Sort by confidence (highest first)
    results.sort((a, b) => b.confidence - a.confidence);
    
    // Format class names for better display (remove underscores, capitalize)
    const formatClassName = (className) => {
      return className
        .replace(/___/g, ' - ')
        .replace(/_/g, ' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
    };
    
    const formattedResults = results.map(result => ({
      ...result,
      displayName: formatClassName(result.class),
      originalName: result.class
    }));
    
    return {
      topPrediction: formattedResults[0],
      allPredictions: formattedResults.slice(0, 5), // Top 5 predictions
      timestamp: new Date().toISOString(),
      modelInfo: {
        inputSize: '128x128',
        totalClasses: this.labels.length
      }
    };
  }
}

// Export singleton instance
export default new TensorFlowService();