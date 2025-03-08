const router = require("express").Router();

const userRouter = require("./users");
const clothingItemsRouter = require("./clothingItems");
const { login, createUser} = require("../controllers/users");
const { NOT_FOUND_STATUS_CODE } = require("../utils/errors");

router.use("/users", userRouter);
router.use("/items", clothingItemsRouter);
router.post("/signin", login);
router.post("/signup", createUser);

router.use((req, res) => {
  res
    .status(NOT_FOUND_STATUS_CODE)
    .send({ message: "Requested resource not found" });
});

module.exports = router;
