const router = require("express").Router();

const userRouter = require("./users");
const clothingItemsRouter = require("./clothingItems");
const { login, createUser} = require("../controllers/users");
const { signinSchema, signupSchema } = require("../utils/validationSchemas");
const { NotFoundError } = require("../utils/errors");

router.use("/users", userRouter);
router.use("/items", clothingItemsRouter);
router.post("/signin", signinSchema, login);
router.post("/signup", signupSchema, createUser);

router.use(() => {
  throw new NotFoundError("Requested resource not found");
});

module.exports = router;
