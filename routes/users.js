const router = require("express").Router();
const { getCurrentUser, updateCurrentUser } = require("../controllers/users");
const auth = require("../middlewares/auths");
const { updateUserSchema } = require("../utils/validationSchemas");

// Protected routes
router.get("/me", auth, getCurrentUser);
router.patch("/me", auth, updateUserSchema, updateCurrentUser);

module.exports = router;
