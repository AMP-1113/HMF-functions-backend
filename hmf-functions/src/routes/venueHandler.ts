import * as functions from "firebase-functions";
import {Venue} from "../model/venueData";
import express = require("express");
import admin = require("firebase-admin");
// const cors = require('cors');

const app = express();

app.get("/", async (req, res) => {
  const snapshot = await admin.firestore().collection("Venues").get();

  const venues: {id: string}[] = [];
  snapshot.forEach((doc) => {
    const id = doc.id;
    const data = doc.data();

    venues.push({id, ...data});
  });

  res.status(200).send(JSON.stringify(venues));
});

// ADD NEW Venue
app.post("/", async (req: any, res: any) => {
  const venue = req.body as Venue;

  await admin.firestore().collection("Venues").add(venue);

  res.status(201).send();
  console.log(venue);
});

export default functions.https.onRequest(app);

