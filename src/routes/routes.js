const express = require('express');
const firebaseAuthController = require('../controllers/firebase-auth-controller');
const upload = require('../middleware/multer-config');
const router = express.Router();

router.post('/api/register', firebaseAuthController.registerUser);
router.post('/api/login', firebaseAuthController.loginUser);
router.post('/api/logout', firebaseAuthController.logoutUser);
router.post('/api/reset-password', firebaseAuthController.resetPassword);
router.post('/api/change-password', firebaseAuthController.changePassword);
router.post('/api/update-display-name', firebaseAuthController.updateDisplayName);
router.post('/api/update-profile-photo', upload.single('photo'), firebaseAuthController.updateProfilePhoto);
router.get('/api/user/:userId', firebaseAuthController.getUserData);

module.exports = router;
