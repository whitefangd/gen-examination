import * as functions from "firebase-functions";
import admin = require("firebase-admin");

import LOGGER from "./../logger";
import Constant from "./../common/constant";

const db = admin.firestore();

const create = functions.auth.user().onCreate(async (user, context) => {
    if (user && user.email) {
        const email = user.email;
        const name = user.displayName;

        const userDb = await db.doc("users/" + email).get();
        if (!userDb || !userDb.data()) {
            return await db.collection("users").doc(email).set({
                name: name,
                role: Constant.ROLE.USER
            }).then(async ref => {
                await LOGGER.info("Authentication-create", "Create user is successful", ref);
                return ref;
            }).catch(async onrejected => {
                await LOGGER.error("Authentication-create", "Create user is failed", onrejected);
                throw new functions.https.HttpsError('aborted', "FUNCERR000200003");
            })
        } else {
            await LOGGER.error("Authentication-create", "No have user information for create");
            throw new functions.https.HttpsError('already-exists', "FUNCERR000200002");
        }
    } else {
        await LOGGER.error("Authentication-create", "No have user information for create");
        throw new functions.https.HttpsError('internal', "FUNCERR000200001");
    }
});

export default create;