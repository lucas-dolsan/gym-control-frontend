const REMOTE_ADDRESS = 'http://localhost:3001';

class ProductController {
  async createProduct(productData) {
    try {
      const response = await fetch(`${REMOTE_ADDRESS}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const product = await response.json();
      return product;
    } catch (error) {
      console.error('Failed to create product:', error);
      throw new Error('Failed to create product');
    }
  }

  async getAllProducts() {
    try {
      const response = await fetch(`${REMOTE_ADDRESS}/products`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const products = await response.json();
      return products;
    } catch (error) {
      console.error('Failed to get products:', error);
      throw new Error('Failed to get products');
    }
  }

  async getProductById(productId) {
    try {
      const response = await fetch(`${REMOTE_ADDRESS}/products/${productId}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const product = await response.json();
      return product;
    } catch (error) {
      console.error('Failed to get product:', error);
      throw new Error('Failed to get product');
    }
  }

  async updateProduct(productId, productData) {
    try {
      const response = await fetch(`${REMOTE_ADDRESS}/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const product = await response.json();
      return product;
    } catch (error) {
      console.error('Failed to update product:', error);
      throw new Error('Failed to update product');
    }
  }

  async deleteProduct(productId) {
    try {
      const response = await fetch(`${REMOTE_ADDRESS}/products/${productId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
    } catch (error) {
      console.error('Failed to delete product:', error);
      throw new Error('Failed to delete product');
    }
  }
}

export default new ProductController();
