import * as functions from "firebase-functions";
import admin = require("firebase-admin");
import Constant from "./../common/constant";
import { Pojo, Actions } from "./../types";

const db = admin.firestore();

declare class AccessData {
  path: string
  action: string
}

const Authentication = {
  access: functions.https.onCall(async (data: AccessData, context) => {

    let path = "-";
    if (!data.path) {
      throw new functions.https.HttpsError('unauthenticated', "FUNCERR000000001");
    } if (!data.action) {
      throw new functions.https.HttpsError('unauthenticated', "FUNCERR000000002");
    }

    let uid = "999999999"
    if (context.auth) {
      uid = context.auth.uid;
    }

    console.log(data.path);
    const paths = await db.collection("paths").where("path", "==", data.path).get();
    const user = await db.doc("users/" + uid).get();
    if (paths.docs && paths.docs.length && paths.docs.length === 1) {
      let pathData: any = paths.docs[0].data();
      let pathPojo: Pojo.Paths = pathData;

      if(!user || !user.data()) {
          throw new functions.https.HttpsError('unauthenticated', "FUNCERR000000004");
      }

      let flagAuthUser = await getAuhenticationPathUser(pathPojo, uid, data);
      let flagAuthRole = await getAuhenticationRole(pathPojo, user.data(), data);
      let flagAuthGroup = await getAuhenticationGroup(pathPojo, uid, data);

      if (flagAuthUser === AUTHEN_RESULT.DENY) {
        throw new functions.https.HttpsError('unauthenticated', "FUNCERR000000004");
      } if (flagAuthUser === AUTHEN_RESULT.ALLOW) {
        return;
      } else if (flagAuthGroup == AUTHEN_RESULT.DENY) {
        throw new functions.https.HttpsError('unauthenticated', "FUNCERR000000004");
      } else if (flagAuthGroup == AUTHEN_RESULT.ALLOW) {
        return;
      } else if (flagAuthRole == AUTHEN_RESULT.DENY) {
        throw new functions.https.HttpsError('unauthenticated', "FUNCERR000000004");
      } else if (flagAuthRole == AUTHEN_RESULT.ALLOW) {
        return;
      } else {
        throw new functions.https.HttpsError('unauthenticated', "FUNCERR000000004");
      }
    } else {
      throw new functions.https.HttpsError('unauthenticated', "FUNCERR000000003");
    }
  })
}

enum AUTHEN_RESULT {
  ALLOW,
  DENY,
  UN_KNOWN
}

function AuthenticationCheckAction(actions: Actions, action: string) {
  let flagAuth = false;
  switch (action) {
    case Constant.ACTION.FULL_CONTROL:
      flagAuth = actions.full_control;
      break;
    case Constant.ACTION.ACCESS:
      flagAuth = actions.access || actions.full_control;
      break;
    case Constant.ACTION.CREATE:
      flagAuth = actions.create || actions.full_control;
      break;
    case Constant.ACTION.DELETE:
      flagAuth = actions.delete || actions.full_control;
      break;
    case Constant.ACTION.EXECUTE:
      flagAuth = actions.execute || actions.full_control;
      break;
    case Constant.ACTION.MODIFY:
      flagAuth = actions.modify || actions.full_control;
      break;
    case Constant.ACTION.READ:
      flagAuth = actions.read || actions.full_control;
      break;
    case Constant.ACTION.SPECIAL_PERMISSION:
      flagAuth = actions.special_permission || actions.full_control;
      break;
    default:
      return AUTHEN_RESULT.UN_KNOWN;
  }
  if (flagAuth) {
    return AUTHEN_RESULT.ALLOW;
  } else {
    return AUTHEN_RESULT.DENY;
  }
}

async function getAuhenticationPathUser(pathInfo: Pojo.Paths, uid: string, data: AccessData): Promise<AUTHEN_RESULT> {
  let userPaths = pathInfo.users.filter(user => user.uid == uid);
  if (userPaths && userPaths.length && userPaths.length >= 1) {
    return AuthenticationCheckAction(userPaths[0].actions, data.action);
  }
  return AUTHEN_RESULT.UN_KNOWN
}
async function getAuhenticationRole(pathInfo: Pojo.Paths, user: any, data: AccessData): Promise<AUTHEN_RESULT> {
  const roles = pathInfo.roles.filter(role => role === user.role);
  if (roles && roles.length && roles.length >= 1) {
    let role = await db.doc("roles/" + roles[0]).get();
    let roleData: any = role.data();
    let rolePojo: Actions = roleData;
    return AuthenticationCheckAction(rolePojo, data.action);
  }
  return AUTHEN_RESULT.UN_KNOWN
}

function getFlagAuthenGroup(action: string, groups: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>) {
  let deny: any = null;
  let allow: any = null;
  deny = groups.docs.find(group => !group.get("full_control") && !group.get(action));
  allow = groups.docs.find(group => group.get("full_control") || group.get(action));
  if (deny) {
    return AUTHEN_RESULT.DENY;
  } else if (allow) {
    return AUTHEN_RESULT.ALLOW;
  } else {
    return AUTHEN_RESULT.UN_KNOWN;
  }
}

async function getAuhenticationGroup(pathInfo: Pojo.Paths, uid: string, data: AccessData): Promise<AUTHEN_RESULT> {
  if(!pathInfo.groups || !pathInfo.groups.length || pathInfo.groups.length === 0) {
    return AUTHEN_RESULT.UN_KNOWN;
  }
  const groups = await db.collection("groups")
    .where("id", "in", pathInfo.groups)
    .where("users", "in", uid).get();

  if (!groups || groups.size || groups.size === 0) {
    return AUTHEN_RESULT.UN_KNOWN;
  }

  let action = data.action;
  switch (action) {
    case Constant.ACTION.FULL_CONTROL:
      return getFlagAuthenGroup("full_control", groups);
    case Constant.ACTION.ACCESS:
      return getFlagAuthenGroup("access", groups);
    case Constant.ACTION.CREATE:
      return getFlagAuthenGroup("create", groups);
    case Constant.ACTION.DELETE:
      return getFlagAuthenGroup("delete", groups);
    case Constant.ACTION.EXECUTE:
      return getFlagAuthenGroup("execute", groups);
    case Constant.ACTION.MODIFY:
      return getFlagAuthenGroup("modify", groups);
    case Constant.ACTION.READ:
      return getFlagAuthenGroup("read", groups);
    case Constant.ACTION.SPECIAL_PERMISSION:
      return getFlagAuthenGroup("special_permission", groups);
    default:
      return AUTHEN_RESULT.UN_KNOWN;
  }
}
export {
  Authentication
}