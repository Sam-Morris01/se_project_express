const router = require("express").Router();
const { login, createUser, getCurrentUser, updateCurrentUser } = require("../controllers/users");
const auth = require("../middlewares/auths");

// Auth routes
router.post("/signin", login);
router.post("/signup", createUser);

// Protected routes
router.get("/me", auth, getCurrentUser);
router.patch("/me", auth, updateCurrentUser);

module.exports = router;
