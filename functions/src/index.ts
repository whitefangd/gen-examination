import * as functions from 'firebase-functions';
import * as admin from "firebase-admin";
import { namespace } from 'firebase-functions/lib/providers/firestore';
// import * as authentication from '@/authentication'

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://gen-exemination.firebaseio.com'
});

export declare namespace Authentication {
    function access(path: string, acction: string): void
}