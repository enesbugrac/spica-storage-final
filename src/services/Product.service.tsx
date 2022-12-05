import * as Bucket from "@spica-devkit/bucket";

export interface Product {
  product_name: string;
  img_url: string;
  _id?: string;
}

class ProductService {
  private API_KEY = "f2bcj17lb3j394d";
  private BUCKET_ID = "638de603ea080c002bb4c0f1";
  constructor() {
    Bucket.initialize({
      apikey: this.API_KEY,
      publicUrl: "https://master.spicaengine.com/api",
    });
  }
  getProducts = () => {
    return Bucket.data.getAll(this.BUCKET_ID);
  };
  addProduct = (object: Product) => {
    return Bucket.data.insert(this.BUCKET_ID, object);
  };
  getAllProductsRealtime = () => {
    return Bucket.data.realtime.getAll(this.BUCKET_ID);
  };
}

export default new ProductService();
