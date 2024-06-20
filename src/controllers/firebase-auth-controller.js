const { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  sendEmailVerification,
  sendPasswordResetEmail,
  updateProfile,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword
} = require("firebase/auth");

const { getStorage, ref, uploadBytes, getDownloadURL } = require('firebase/storage');
const { db } = require('../config/firebase');
const auth = getAuth();
const storage = getStorage();

class FirebaseAuthController {
  async registerUser(req, res) {
    const { email, password, displayName, birthDay, birthMonth, birthYear, gender } = req.body;

    if (!email || !password || !displayName || !birthDay || !birthMonth || !birthYear || !gender) {
      return res.status(422).json({
        email: "Email is required",
        password: "Password is required",
        displayName: "Display Name is required",
        birthDay: "Birth day is required",
        birthMonth: "Birth month is required",
        birthYear: "Birth year is required",
        gender: "Gender is required"
      });
    }

    const birthdate = new Date(`${birthYear}-${birthMonth}-${birthDay}`);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(auth.currentUser, { displayName });

      await db.collection('user').doc(user.uid).set({
        email: user.email,
        displayName: displayName,
        birthdate: birthdate,
        gender: gender,
        userId: user.uid,
        createdAt: new Date()
      });

      await sendEmailVerification(auth.currentUser);
      res.status(201).json({ message: "Verification email sent! User created successfully!" });
    } catch (error) {
      console.error(error);
      const errorMessage = error.message || "An error occurred while registering user";
      res.status(500).json({ error: errorMessage });
    }
  }

  async loginUser(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(422).json({
        email: "Email is required",
        password: "Password is required",
      });
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await userCredential.user.getIdToken();
      if (idToken) {
        res.cookie('access_token', idToken, { httpOnly: true });
        res.status(200).json({ message: "User logged in successfully", userCredential });
      } else {
        res.status(500).json({ error: "Internal Server Error" });
      }
    } catch (error) {
      console.error(error);
      const errorMessage = error.message || "An error occurred while logging in";
      res.status (500).json({ error: errorMessage });
    }
  }

  async logoutUser(req, res) {
    try {
      await signOut(auth);
      res.clearCookie('access_token');
      res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async resetPassword(req, res) {
    const { email } = req.body;
    if (!email) {
      return res.status(422).json({ email: "Email is required" });
    }
    try {
      await sendPasswordResetEmail(auth, email);
      res.status(200).json({ message: "Password reset email sent successfully!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async changePassword(req, res) {
    const { email, oldPassword, newPassword, confirmNewPassword } = req.body;
    if (!email || !oldPassword || !newPassword || !confirmNewPassword) {
      return res.status(422).json({
        email: "Email is required",
        oldPassword: "Old password is required",
        newPassword: "New password is required",
        confirmNewPassword: "Confirm new password is required",
      });
    }

    if (newPassword !== confirmNewPassword) {
      return res.status(422).json({ error: "New password and confirm new password do not match" });
    }

    try {
      const user = auth.currentUser;
      if (!user) {
        return res.status(401).json({ error: "User is not authenticated" });
      }

      const credential = EmailAuthProvider.credential(email, oldPassword);
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);

      res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred while updating the password" });
    }
  }

  async getUserData(req, res) {
    const { userId } = req.params;

    try {
      const userDoc = await db.collection('user').doc(userId).get();

      if (!userDoc.exists) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({ user: userDoc.data() });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred while fetching user data" });
    }
  }

  async updateDisplayName(req, res) {
    const { displayName } = req.body;

    try {
      const user = auth.currentUser;
      if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      await updateProfile(user, { displayName });

      await db.collection('user').doc(user.uid).update({
        displayName: displayName
      });

      res.status(200).json({ message: "Display name updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred while updating display name" });
    }
  }

  async updateProfilePhoto(req, res) {
    try {
      const user = auth.currentUser;

      if (!user) {
        console.error('User not authenticated');
        return res.status(401).json({ message: "Unauthorized" });
      }

      if (!req.file) {
        console.error('No file uploaded');
        return res.status(400).json({ error: "Photo is required" });
      }

      const photo = req.file;
      const photoRef = ref(storage, `profile_photos/${user.uid}_${Date.now()}_${photo.originalname}`);

      const metadata = {
        contentType: photo.mimetype,
      };

      const uploadTask = await uploadBytes(photoRef, photo.buffer, metadata);

      const photoURL = await getDownloadURL(uploadTask.ref);

      await updateProfile(user, { photoURL });

      await db.collection('user').doc(user.uid).update({
        photoURL: photoURL
      });

      res.status(200).json({ message: "Profile photo updated successfully", photoURL });
    } catch (error) {
      console.error('Error updating profile photo:', error);
      res.status(500).json({ error: "An error occurred while updating profile photo" });
    }
  }
}

module.exports = new FirebaseAuthController();
