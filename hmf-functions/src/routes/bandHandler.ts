import * as functions from "firebase-functions";
import {Band} from "../model/bandData";
import express = require("express");
import admin = require("firebase-admin");
// const cors = require('cors');

const app = express();

app.get("/", async (req, res) => {
  const snapshot = await admin.firestore().collection("Bands").get();

  const bands: {id: string}[] = [];
  snapshot.forEach((doc) => {
    const id = doc.id;
    const data = doc.data();

    bands.push({id, ...data});
  });

  res.status(200).send(JSON.stringify(bands));
});

// ADD NEW BAND
app.post("/", async (req: any, res: any) => {
  const band = req.body as Band;

  await admin.firestore().collection("Bands").add(band);

  res.status(201).send();
  console.log(band);
});

export default functions.https.onRequest(app);

