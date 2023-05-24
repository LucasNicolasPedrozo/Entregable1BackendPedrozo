const ARCHIVO = "products.txt";
const fs = require("fs");

class ProductManager {
    constructor() {
        this.products = [];
        this.automaticId = 0;
        this.path = ARCHIVO;
    };

    async addProduct(title, description, price, thumbnail, code, stock) {
        try{
            const productExists = this.products.find((product) => product.code === code);

            if (productExists) {
                console.log(`Error: El producto ${title} tiene un error. El codigo ${code} ya existe en ${productExists.title}.`);
                return;
            };

        const idExists = this.products.find((prod) => prod.id === this.automaticId);
        if (idExists) {
                    console.log(`Error: La id ${this.automaticId} tiene un error. Por lo tanto no se puede agregar el producto.`);
        };
        
        if (!title || !description || !price || !thumbnail || !code || !stock) {
                    console.log(`Todos los campos son obligatorios para el producto ${title} a ingresar`);
        } else {
                const product = {
                id: this.automaticId++,
                title,
                description,
                price,
                thumbnail,
                code,
                stock,
            };

            this.products.push(product);
            console.log(`El producto ${product.title} fue agregado correctamente`);
            let text = JSON.stringify(this.products, null, 2);
            fs.writeFileSync(ARCHIVO, text, (error) => console.log(error));
        };
    } catch (error) {
            console.log(error)
        };
    };
    
    async getProduct() {
        try {
            if (this.products.length === 0) {
                console.log("No se encontraron productos disponibles");
            } else {
                console.log("Productos disponibles");
                this.products.forEach((product) => { console.log(product) });
            };
        } catch (error) {
                console.log(error);
        };
    };
        

    async getProductById(id) {
        try {        
            const productId = this.products.find((product) => product.id === id);
            if (!productId) {
                console.log(`El id ${id} de producto no existe`);
            } else {
                console.log(`El producto ${id} existe`);
                return productId;
            };
        } catch (error) {
            console.log(error);
        };
    };

    async updateProduct(id, fieldToUpdate, newValue) {
        try {
            const product = this.products.find((prod) => prod.id === id);
      
            if (!product) {
                console.log("El producto no fue posible de hallar");
            };

            product[fieldToUpdate] = newValue;

            fs.writeFile(this.path, JSON.stringify(this.products, null, 2), (error) => {
                if (error) {
                    console.log("Error al actualizar el producto");
                } else {
                    console.log("El producto fue actualizado correctamente");
                };
            });
        } catch (error) {
            console.log(error);
        };
    };

    async deleteProduct(id) {
        try {
            const index = this.products.findIndex((prod) => prod.id === id);

            if (index === -1) {
                console.log(`No se encontro ningún elemento con el id ${id}`);
                return;
            } else {
                console.log("El elemento del archivo se eliminó correctamente");
            };

            this.products.splice(index, 1);

            fs.readFile(ARCHIVO, "utf-8", (error, data) => {
                if (error) {
                    console.log("Ocurrió un error al leer el archivo");
                };

                let productsData = JSON.parse(data);

                productsData = this.products;
                const contenidoActualizado = JSON.stringify(productsData, null, 2);

                fs.writeFile(ARCHIVO, contenidoActualizado, (error) => {
                    if (error) {
                        console.log("Hubo un error al actualizar el archivo");
                    };
                });
            });
        } catch (error) {
            console.log(error);
        };
    };
};

(async () => {
        try {
            let test = new ProductManager();
            
            await test.addProduct(
                "Test product",
                "This is a test product",
                3,
                "No image",
                "a111",
                10
            );
            await test.addProduct(
                "Test product 2",
                "This is a test product 2",
                6,
                "No image",
                "a222",
                20
            );
            await test.addProduct(
                "Test product 3",
                "This is a test product 3",
                9,
                "No image",
                "a333",
                30
            );
            test.getProduct();
            await test.getProductById(1);
            await test.updateProduct(2, "stock", 60);
            await test.getProductById(4);
            await test.deleteProduct(2);
            await test.deleteProduct(4);
            await test.getProductById(2);
        } catch (error) {
            console.log(error);
        };
    }
)();