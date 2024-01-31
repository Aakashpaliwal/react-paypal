// const express = require('express');
// const app = express();
// const cors = require("cors");
import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import axios from "axios";

const app = express();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;


const data = {
  url: 'https://webhook.site/bc172ba7-9362-4cd4-99b7-4afe3ec21b8a',
  event_types: [
    { name: 'PAYMENT.AUTHORIZATION.CREATED' },
    { name: 'PAYMENT.AUTHORIZATION.VOIDED' }
  ]
};

app.post('/webhook', async(req, res) => {
  try {
      const result = await axios.post('https://api-m.sandbox.paypal.com/v1/notifications/webhooks', data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer A21AAK19lJChKh0bHnA5ut3YwvDK52z8_2YSlCWwWlu4DP8w8-v70eLnt_FM58Wzjw-ZPEeup6UjKhOyLp6n_G7dk0LFn97Vw`
        }
      })
      console.log('34444444444444444444444444444444444444444444444444444444',result)
      return res.send({result})
  } catch (error) {
      console.log('22222222222222222222222',error)
  }
})  


app.listen(PORT, (req, res) => {
  console.log(`app is listening to PORT ${PORT}`);
});
