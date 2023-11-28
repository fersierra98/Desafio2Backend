const fs = require("fs");

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  static id = 0;

  async addProduct(product) {
    if (
      !product.title ||
      !product.description ||
      !product.code ||
      !product.stock ||
      !product.thumbnail ||
      !product.price
    ) {
      return console.error("Datos incompletos");
    }
    let newId = ProductManager.id++;
    const products = await this.getProducts();
    const newProduct = {
      id: newId + 1,
      title: product.title,
      description: product.description,
      price: product.price,
      thumbnail: product.thumbnail,
      code: product.code,
      stock: product.stock,
    };
    products.push(newProduct);

    await fs.promises.writeFile(this.path, JSON.stringify(products), "utf-8");
  }

  async getProducts() {
    try {
      const data = await fs.promises.readFile(this.path, "utf-8");
      const products = JSON.parse(data);
      return products;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async getProductsById(id) {
    const products = await this.getProducts();
    const product = products.find((p) => p.id === id);
    if (!product) {
      return console.error("Producto no encontrado");
    }
    return product;
  }

  async deleteProduct(id) {
    const products = await this.getProducts();
    const productDeleted = products.filter((p) => p.id !== id);
    await fs.promises.writeFile(
      this.path,
      JSON.stringify(productDeleted),
      "utf-8"
    );
  }

  async updateProduct(id, productToUpdate) {
    const products = await this.getProducts();
    const updatedProducts = products.map((p) => {
      if (p.id === id) {
        return {
          ...p,
          ...productToUpdate,
          id,
        };
      }
      return p;
    });

    await fs.promises.writeFile(
      this.path,
      JSON.stringify(updatedProducts),
      "utf-8"
    );
  }
}

const test = async () => {
  const productManager = new ProductManager("./products.json");
//   await productManager.addProduct({
//   title: "Iphone 14pro",
//   description: "250GB",
//   code: 4300,
//   price: 1800,
//   thumbnail: "./iphone-14.jpg",
//   stock: 52,
// });

//   await productManager.addProduct({
//     title: "Iphone 11",
//     description: "128GB",
//     code: 4400,
//     price: 700,
//     thumbnail: "./iphone-11.jpg",
//     stock: 20,
//   });

//   await productManager.addProduct({
//     title: "Iphone 13",
//     description: "250GB",
//     code: 4500,
//     price: 1100,
//     thumbnail: "./iphone-13.jpg",
//     stock: 40,
//   });
// };

// const productById = await productManager.getProductsById(2);
// console.log(productById);

// await productManager.updateProduct(2, {
//     title: 'Iphone 11'
// });

// await productManager.deleteProduct(1);
};

test();
