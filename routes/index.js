const router = require("express").Router();

const userRouter = require("./users");
const clothingItemsRouter = require("./clothingItems");
const { login, createUser} = require("../controllers/users");
const { signinSchema, signupSchema } = require("../utils/validationSchemas");

router.use("/users", userRouter);
router.use("/items", clothingItemsRouter);
router.post("/signin", signinSchema, login);
router.post("/signup", signupSchema, createUser);

router.use(() => {
  const error = new Error("Requested resource not found");
  error.name = "NotFoundError";
  throw error;
});

module.exports = router;
