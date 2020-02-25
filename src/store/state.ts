import firebase from "@/firebase";
import { firebaseAuth } from "@/firebase";

class State {
  private static STATE = new State()
  private _firebase: any
  private _firebaseAuth: any
  private _googleToken: string
  private _alertMessage: Array<any>

  private constructor() {
    this._firebase = firebase;
    this._firebaseAuth = firebaseAuth;
    this._googleToken = "";
    this._alertMessage = [];
  }

  public static get instance(): State {
    return State.STATE;
  }

  public get firebase(): any {
    return this._firebase;
  }
  public get firebaseAuth(): any {
    return this._firebaseAuth;
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