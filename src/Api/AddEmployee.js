import { getAuth } from '@firebase/auth';

const AddEmployee = () => {
    getAuth()
    .createUser({
      email: 'user@example.com',
      emailVerified: false,
      phoneNumber: '+11234567890',
      password: 'secretPassword',
      displayName: 'John Doe',
      photoURL: 'http://www.example.com/12345678/photo.png',
      disabled: false,
    })
    .then((userRecord) => {
      // See the UserRecord reference doc for the contents of userRecord.
      console.log('Successfully created new user:', userRecord.uid);
    })
    .catch((error) => {
      console.log('Error creating new user:', error);
    });
};

export default AddEmployee;