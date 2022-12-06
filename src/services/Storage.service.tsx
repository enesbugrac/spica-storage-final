import * as Storage from "@spica-devkit/storage";

class StorageService {
  private API_KEY = "<YOUR_API_KEY>";

  constructor() {
    Storage.initialize({
      apikey: this.API_KEY,
      publicUrl: "<YOUR_API_URL>",
    });
  }

  insertFile = (storageObjects: File) => {
    return Storage.insert(storageObjects, (data) => {
      const loadedPercentage = (data.loaded / data.total) * 100;
      console.log(`Upload progress: %${loadedPercentage}`);
    });
  };
}

export default new StorageService();
