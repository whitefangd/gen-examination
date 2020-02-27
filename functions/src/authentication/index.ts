import * as functions from "firebase-functions";
import admin = require("firebase-admin");
import Constant from "./../common/constant";
import { Paths } from "./../types";

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
    let path = "-";
    if (!data.path || !data.action) {
      throw new functions.https.HttpsError('unauthenticated', "FUNCERR000000000");
    } else {
      path = data.path.replace(/[\/\\]/g, "-").toLowerCase();
    }

    let uid = "999999999"
    if (context.auth) {
      uid = context.auth.uid;
    }

    const documentRef = await db.doc("users/" + uid);
    const docData = await documentRef.get();
    const role: string = await docData.get("role");
    const groups: Array<string> = await docData.get("groups");
    const paths = await db.collection("paths").where("path", "==", path).get();


    if (data.path === "/login") {
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