const functions = require("firebase-functions");
const admin = require("firebase-admin");
// const { getDatabase } = require("firebase-admin/database");

admin.initializeApp();
// const db = getDatabase();
const db = admin.database();

exports.createUser = functions.https.onCall(async (data, context) => {
  const infos = {
    uid: data.id,
    email: data.email,
    password: data.password,
    displayName: data.displayName,
    emailVerified: false,
    disabled: Boolean(data.status === "inactive"),
  };
  return await admin
    .auth()
    .createUser(infos)
    .then((userRecord) => {
      ///////////Saving Data To DB////////////
      const ref = db.ref("/inventory/employees");
      const userRef = ref.child(userRecord.uid);
      userRef.set({ ...data, ...infos });
      return {
        message: `Successfully created new user! USERD: ${userRecord.toJSON()}`,
      };
    })
    .catch((error) => {
      return { error };
    });
});

exports.updateUser = functions.https.onCall(async (data, context) => {
  return await admin
    .auth()
    .getUserByEmail(data.email)
    .then((userRecord) => {
      const updatedData = {
        email: data.email,
        password: data.password,
        displayName: data.displayName,
        emailVerified: false,
        disabled: Boolean(data.status === "inactive"),
        uid: userRecord.uid,
      };
      return admin
        .auth()
        .updateUser(userRecord.uid, updatedData)
        .then((userRecord) => {
          ///////////UPDATING Data To DB ////////////
          const ref = db.ref("/inventory/employees");
          const userRef = ref.child(userRecord.uid);
          userRef.update({ ...data, ...updatedData });
          return { Success: userRecord.uid };
        })
        .catch((error) => {
          return { error };
        });
    })
    .catch((error) => {
      return { error };
    });
});

//////////////////ADDING USER ROLE///////////////////
exports.addRole1 = functions.https.onCall(async (data, context) => {
  //get user add ROLE-1 by email address
  return await admin
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

exports.addRole2 = functions.https.onCall(async (data, context) => {
  //get user add ROLE-2 by email address
  return await admin
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

exports.addRole3 = functions.https.onCall(async (data, context) => {
  //get user add ROLE-3 by email address
  return await admin
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
