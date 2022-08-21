import admin = require("firebase-admin");

admin.initializeApp();

export {default as bandData} from "./routes/bandHandler";
export {default as venueData} from "./routes/venueHandler";
