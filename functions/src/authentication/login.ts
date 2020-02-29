import * as functions from "firebase-functions";
import admin = require("firebase-admin");

import LOGGER from "./../logger";
import Constant from "./../common/constant";

const db = admin.firestore();

const login = functions.auth.user().onCreate(async (user, context) => {
    if (user && user.email) {
        const email = user.email;
        const name = user.displayName;

        const userDb = await db.doc("users/" + email).get();
        if (!userDb || !userDb.data()) {
            await db.collection("users").doc(email).set({
                name: name,
                role: Constant.ROLE.ANONYMOUS
            })
        }
    } else {
        await LOGGER.error("Authentication-login", "No have user information for create");
        throw new functions.https.HttpsError('internal', "FUNCERR000200001");
    }
});

export default login;