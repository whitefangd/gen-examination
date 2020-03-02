// export default firebase;

// // Get a Firestore instance
// export const db = firebase
//     .firestore()

// // Export types that exists in Firestore
// // This is not always necessary, but it's used in other examples
// const { Timestamp, GeoPoint, Blob } = firebase.firestore
// export { Timestamp, GeoPoint, Blob }

import * as firebase from "firebase/app";

class State {
  private static STATE = new State()
  private _firebase: typeof firebase;
  private _googleToken: string
  private _alertMessage: Array<any>
  private _database: firebase.firestore.Firestore;

  private constructor() {
    this._firebase = firebase;
    this._database = firebase.firestore();
    this._googleToken = "";
    this._alertMessage = [];
  }

  public static get instance(): State {
    return State.STATE;
  }

  public get firebase(): any {
    return this._firebase;
  }
  public get database(): any {
    return this._database;
  }
  public get googleToken(): string {
    return this._googleToken;
  }
  public set googleToken(token: string) {
    this._googleToken = token;
  }
  public get alertMessage(): Array<any> {
    return this._alertMessage;
  }
  public pushAlertMessage(alert: any) {
    this._alertMessage.push(alert);
  }
  public cleanAlertMessage() {
    this._alertMessage.length = 0;
  }
};
export default State;