const router = require("express").Router();
const auth = require("../middlewares/auths");
const { createItemSchema, itemIdParamSchema } = require("../utils/validationSchemas");
const {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");

router.get("/", getItems);
router.post("/", auth, createItemSchema, createItem);
router.delete("/:itemId", auth, itemIdParamSchema, deleteItem);
router.put("/:itemId/likes", auth, itemIdParamSchema, likeItem);
router.delete("/:itemId/likes", auth, itemIdParamSchema, dislikeItem);

module.exports = router;
