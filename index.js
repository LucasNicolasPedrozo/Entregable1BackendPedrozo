class ProductManager {
    constructor() {
        this.products = [];
        this.newId = 1
    };

    addProduct(title, description, price, thumbnail, code, stock) {

        const productExists = this.products.find((product) => product.code === code);

        if (productExists) {
            console.log(`Error: El producto ${title} tiene un error. El codigo ${code} ya existe en ${productExists.title}.`);
            return;
        };
        
        if (!title || !description || !price || !thumbnail || !code || !stock) {
                console.log(`Todos los campos son obligatorios para el producto ${title} a ingresar`);
            } else {
                const product = {
                    id: this.newId++,
                    title,
                    description,
                    price,
                    thumbnail,
                    code,
                    stock,
                };

                this.products.push(product);
                    {
                        console.log(`El producto ${product.title} fue agregado correctamente`);
                    };
            };
        };
    
    getProduct() {
            return this.products;
        };

    getProductById(id) {
        const productId = this.products.find((product) => product.id === id);
        
        {
            if (!productId) {
                console.log(`El id ${id} de producto no existe`);
            } else {
                console.log(`El producto ${id} existe`);
                return productId;
            };
        };
    };
};

const product = new ProductManager()
product.addProduct("titulo1", "description1", 1000, "image1", "code1", 10);

console.log(product.getProduct());

product.getProductById(1);

product.addProduct("titulo2", "description2", 1200, "image2", "code1", 20);

product.getProductById(2);