const express = require('express');
const app = express();
const PORT = 8080;
const { ProductManager } = require("./productManager");

app.get('/:cantidad?', async (req, res) => {
  try {
    const cantidad = req.params.cantidad;
    const response = await ProductManager.get();
    const datos = response.data;

    if (cantidad) {
      const datosFiltrados = datos.slice(0, cantidad);
      res.json(datosFiltrados);
    } else {
      res.json(datos);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ha ocurrido un error en la solicitud' });
  }
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));