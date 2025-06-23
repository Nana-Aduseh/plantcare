import { useState, useEffect } from 'react';
import tensorflowService from '../services/tensorflowService';

export const usePlantDiagnosis = () => {
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastResult, setLastResult] = useState(null);

  useEffect(() => {
    loadModel();
  }, []);

  const loadModel = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      await tensorflowService.loadModel();
      setIsModelLoaded(true);
      
    } catch (err) {
      setError(err.message);
      console.error('Failed to load model:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const diagnose = async (imageUri) => {
    if (!isModelLoaded) {
      throw new Error('Model not loaded yet');
    }

    try {
      setIsLoading(true);
      setError(null);
      
      const result = await tensorflowService.predict(imageUri);
      setLastResult(result);
      
      return result;
      
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isModelLoaded,
    isLoading,
    error,
    lastResult,
    diagnose,
    retryLoad: loadModel,
  };
};