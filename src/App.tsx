import { useEffect, useState } from "react";
import "./App.css";
import Modal, { ModalBody, ModalFooter, ModalHeader } from "./components/Modal";
import ProductService, { Product } from "./services/Product.service";
import StorageService from "./services/Storage.service";

const emptyProduct = { product_name: "", img_url: "" };

function App() {
  const [newProduct, setNewProduct] = useState<Product>(emptyProduct);
  const [products, setProducts] = useState<Product[]>([]);
  const [uploadedImage, setUploadedImage] = useState<File>();
  const [preview, setPreview] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const subscribtion = ProductService.getAllProductsRealtime().subscribe(
      (data) => setProducts(data as Product[])
    );
    return () => {
      subscribtion.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!uploadedImage) {
      setPreview("");
      return;
    }
    const objectUrl = URL.createObjectURL(uploadedImage);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [uploadedImage]);

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setUploadedImage(event.target.files[0]);
    }
  };

  const handleAddProduct = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    const storageResponse = await StorageService.insertFile(uploadedImage!);

    await ProductService.addProduct({
      ...newProduct,
      img_url: storageResponse.url,
    })
      .catch((err) => alert(err))
      .finally(() => setShowModal(false));

    setNewProduct(emptyProduct);
    setPreview("");
    setUploadedImage(undefined);
  };

  return (
    <div className="App">
      <h1>Spica Storage </h1>
      <ul className="product__list">
        <li
          onClick={(e) => setShowModal(true)}
          style={{ cursor: "pointer" }}
          key={"add_product"}
        >
          <big>+ Add New Product</big>
        </li>
        {products?.map((product: Product) => (
          <li className="card" key={product._id}>
            <img
              className="product__img"
              src={product.img_url}
              alt={product.product_name}
            />
            <span>{product.product_name}</span>
          </li>
        ))}
      </ul>
      <Modal show={showModal} setShow={setShowModal} hideCloseButton={false}>
        <ModalHeader>
          <div className="modal__header__text">New Product</div>
        </ModalHeader>
        <ModalBody>
          <div className="input__container">
            <input
              className="product__input"
              name="product_name"
              type="text"
              placeholder="Enter new product name..."
              value={newProduct?.product_name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNewProduct({ ...newProduct, product_name: e.target.value })
              }
            />
            <input type="file" onChange={onFileChange} />
            {uploadedImage && preview ? (
              <img
                alt="Not Found"
                style={{ marginTop: "10px" }}
                width={"250px"}
                src={preview}
              />
            ) : null}
          </div>
        </ModalBody>
        <ModalFooter>
          <button onClick={handleAddProduct}>Submit</button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default App;
