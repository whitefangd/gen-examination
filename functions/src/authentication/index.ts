import * as functions from "firebase-functions";
import { https } from "firebase-functions";
import admin = require("firebase-admin");
import Constant from "./../common/constant";
import {Paths} from "./../types";

const db = admin.firestore();

declare class AccessData {
  path: string
  action: string
}

const Authentication = {
  access: functions.https.onCall(async (data: AccessData, context) => {
    // // Grab the text parameter.
    // const original = req.query.text;
    // // Push the new message into the Realtime Database using the Firebase Admin SDK.
    // const snapshot = await admin.database().ref('/messages').push({ original: original });
    // // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
    // res.redirect(303, snapshot.ref.toString());
    if (!data.path || !data.action) {
      throw new functions.https.HttpsError('unauthenticated', "FUNCERR000000000");
    }
    let uid = "999999999"
    if (context.auth) {
      uid = context.auth.uid;
    }

    let documentRef = await db.doc("users/" + uid);
    let docData = await documentRef.get();
    let role: string = docData.get("role");
    let paths: Paths = docData.get("paths");
    if(role == Constant.ROLE.ANONYMOUS) {
      paths[data.path]
    }
    if (data.path = "/login") {
      console.log(context.rawRequest.route);
      if (context.auth) {
        https.decode

      }
    }
  })
}

export {
  Authentication
}