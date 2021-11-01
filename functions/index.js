const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.addRole1 = functions.https.onCall((data, context) => {
  //get user add ROLE-1 by email address
  return admin
    .auth()
    .getUserByEmail(data.email)
    .then((user) => {
      return admin.auth().setCustomUserClaims(user.uid, {
        role1: true,
      });
    })
    .then(() => {
      return {
        message: `Success! ${data.email} has been added as role-1`,
      };
    })
    .catch((err) => {
      return err;
    });
});

exports.addRole2 = functions.https.onCall((data, context) => {
  //get user add ROLE-1 by email address
  return admin
    .auth()
    .getUserByEmail(data.email)
    .then((user) => {
      return admin.auth().setCustomUserClaims(user.uid, {
        role2: true,
      });
    })
    .then(() => {
      return {
        message: `Success! ${data.email} has been added as role-2`,
      };
    })
    .catch((err) => {
      return err;
    });
});

exports.addRole3 = functions.https.onCall((data, context) => {
  //get user add ROLE-1 by email address
  return admin
    .auth()
    .getUserByEmail(data.email)
    .then((user) => {
      return admin.auth().setCustomUserClaims(user.uid, {
        role3: true,
      });
    })
    .then(() => {
      return {
        message: `Success! ${data.email} has been added as role-3`,
      };
    })
    .catch((err) => {
      return err;
    });
});
