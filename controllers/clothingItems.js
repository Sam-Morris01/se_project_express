const ClothingItem = require("../models/clothingItem");
const {
  BadRequestError,
  NotFoundError,
  ForbiddenError,
} = require("../utils/errors");

module.exports.getItems = (req, res, next) => {
  ClothingItem.find({})
    .then((items) => res.send(items))
    .catch(next);
};

module.exports.createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;
  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => {
      console.log(item);
      res.status(201).send(item);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });
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
      throw new NotFoundError("Item ID not found");
    })
    .then((item) => {
      res.send(item);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Invalid item ID"));
      } else {
        next(err);
      }
    });
};

module.exports.deleteItem = (req, res, next) => {
  const userId = req.user._id;
  const { itemId } = req.params;
  ClothingItem.findById(itemId)
    .orFail(() => {
      throw new NotFoundError("Item not found");
    })
    .then((item) => {
      if (item.owner.toString() !== userId.toString()) {
        throw new ForbiddenError("You are not authorized to delete this item");
      }
      return ClothingItem.findByIdAndDelete(itemId)
        .then(() => res.json({ message: "Item successfully deleted" }));
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });
};

module.exports.likeItem = (req, res, next) => updateLike(req, res, next, "$addToSet");

module.exports.dislikeItem = (req, res, next) => updateLike(req, res, next, "$pull");
