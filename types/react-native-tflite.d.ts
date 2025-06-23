declare module 'react-native-tflite' {
  export default class Tflite {
    loadModel(
      options: { model: string; labels: string; numThreads?: number },
      callback: (err: any, res: any) => void
    ): void;

    runModelOnImage(
      options: {
        path: string;
        imageMean?: number;
        imageStd?: number;
        numResults?: number;
        threshold?: number;
      },
      callback: (err: any, results: any) => void
    ): void;
  }
}
