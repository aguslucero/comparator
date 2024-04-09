const express = require('express');
const bodyParser = require('body-parser');
const axios = require("axios");

const cors = require('cors');
const app = express();
const puerto = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.post('/api/compare', async (req, res) => {
  const { url, body, config, method } = req.body;
  try {
    let response: any = {}

    switch (method) {
      case 'GET':
        response = await axios.get(url, body, config);
        break;
      case 'POST':
        response = await axios.post(url, body, config);
        break;
      case 'PUT':
        response = await axios.put(url, body, config);
        break;
      case 'DELETE':
        response = await axios.delete(url, body, config);
        break;
      default:
        response = await axios.post(url, body, config);
        break;
    }

    res.send(response.data);
  } catch (error: any) {
    console.log(error)
    res.status(500).send(error.message);
  }
});



app.listen(puerto, () => {
  console.log(`Servidor escuchando en el puerto ${puerto}`);
});
