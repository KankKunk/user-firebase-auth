const { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  sendEmailVerification,
  sendPasswordResetEmail,
  updateProfile
} = require('../config/firebase');

const { db } = require('../config/firebase');

const auth = getAuth();

class FirebaseAuthController {
  async registerUser(req, res) {
    const { email, password, displayName } = req.body;
    if (!email || !password || !displayName) {
      return res.status(422).json({
        email: "Email is required",
        password: "Password is required",
        displayName: "Display Name is required"
      });
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(auth.currentUser, { displayName });

      await db.collection('user').doc(user.uid).set({
        email: user.email,
        displayName: displayName,
        password: password,
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
      res.status(500).json({ error: errorMessage });
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
}

module.exports = new FirebaseAuthController();
