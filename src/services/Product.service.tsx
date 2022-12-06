import * as Bucket from "@spica-devkit/bucket";

export interface Product {
  product_name: string;
  img_url: string;
  _id?: string;
}

class ProductService {
  private API_KEY = "<YOUR_API_KEY>";
  private BUCKET_ID = "<YOUR_BUCKET_ID>";
  constructor() {
    Bucket.initialize({
      apikey: this.API_KEY,
      publicUrl: "<YOUR_API_URL>",
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
