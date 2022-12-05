import * as Storage from "@spica-devkit/storage";

class StorageService {
  private API_KEY = "f2bcj17lb3j394d";

  constructor() {
    Storage.initialize({
      apikey: this.API_KEY,
      publicUrl: "https://master.spicaengine.com/api",
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
