const ClothingItem = require("../models/clothingItem");

module.exports.getItems = (req, res, next) => {
  ClothingItem.find({})
    .then((items) => res.send(items))
    .catch(next);
};

module.exports.createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  ClothingItem.create({
    name,
    weather,
    imageUrl,
    owner,
    likes: []  // Explicitly set empty likes array
  })
    .then((item) => {
      console.log(item);
      res.status(201).send(item);
    })
    .catch(next);
};

const updateLike = (req, res, next, method) => {
  const {
    params: { itemId },
  } = req;
  console.log(itemId);
  ClothingItem.findByIdAndUpdate(
    itemId,
    { [method]: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      const error = new Error("Item ID not found");
      error.name = "NotFoundError";
      throw error;
    })
    .then((item) => {
      res.send(item);
    })
    .catch(next);
};

module.exports.deleteItem = (req, res, next) => {
  const userId = req.user._id;
  const { itemId } = req.params;
  ClothingItem.findById(itemId)
    .orFail(() => {
      const error = new Error("Item not found");
      error.name = "NotFoundError";
      throw error;
    })
    .then((item) => {
      if (item.owner.toString() !== userId.toString()) {
        const error = new Error("You are not authorized to delete this item");
        error.name = "ForbiddenError";
        throw error;
      }
      return ClothingItem.findByIdAndDelete(itemId)
        .then(() => res.json({ message: "Item successfully deleted" }));
    })
    .catch(next);
};

module.exports.likeItem = (req, res, next) => updateLike(req, res, next, "$addToSet");

module.exports.dislikeItem = (req, res, next) => updateLike(req, res, next, "$pull");
