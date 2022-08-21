import * as functions from "firebase-functions";
// import {Festival} from "../model/festivalData";
import express = require("express");
import admin = require("firebase-admin");
// const cors = require('cors');

const app = express();

app.get("/", async (req, res) => {
  const snapshot = await admin.firestore().collection("Festival").get();

  const festivals: {id: string}[] = [];
  snapshot.forEach((doc) => {
    const id = doc.id;
    const data = doc.data();

    festivals.push({id, ...data});
  });

  res.status(200).send(JSON.stringify(festivals));
});


export default functions.https.onRequest(app);

