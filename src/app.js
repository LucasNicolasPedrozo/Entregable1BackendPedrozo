const express = require('express');
const app = express();
const PORT = 8080;
const { ProductManager } = require("./productManager");

const productManager = new ProductManager();

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('3ER ENTREGABLE BACKEND CORDERHOUSE');
});

app.get('/products', async (req, res) => {
  try {
    const limit = req.query.limit;
    const response = await productManager.getProducts();
    console.log(limit);
    console.log(response);
    
    if (limit) {
      products = products.slice(0, limit);
    }

    res.send(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ha ocurrido un error en la solicitud' });
  }
});

app.get('/products/:pid', async (req, res) => {
  try {
    const productId = parseInt(req.params.pid);
    const response = await ProductManager.getProducts();

    const product = response.data.find((p) => p.id === productId);

    if (!product) {
      res.status(404).json({ error: 'Producto no encontrado' });
    } else {
      res.json(product);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ha ocurrido un error en la solicitud' });
  }
});


app.listen(PORT, () => console.log(`http://localhost:${PORT}`));