import React, { useEffect, useState } from 'react';
import ProductController from '../controllers/productController';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const products = await ProductController.getAllProducts();
      setProducts(products);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const newProduct = {
      name,
      price,
    };

    try {
      await ProductController.createProduct(newProduct);
      console.log('Product created successfully!');
      fetchProducts();
    } catch (error) {
      console.error('Failed to create product:', error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await ProductController.deleteProduct(productId);
      console.log('Product deleted successfully!');
      fetchProducts();
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };

  return (
    <div>
      <h1>Products</h1>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Name:</label>
          <input type='text' value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Price:</label>
          <input type='number' value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>
        <button type='submit'>Create Product</button>
      </form>
      <h2>Product List</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
            <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductPage;
