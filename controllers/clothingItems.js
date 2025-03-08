const ClothingItem = require("../models/clothingItem");
const {
  BAD_REQUEST_STATUS_CODE,
  NOT_FOUND_STATUS_CODE,
  SERVER_ERROR_STATUS_CODE,
  FORBIDDEN_STATUS_CODE,
} = require("../utils/errors");

module.exports.getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.send(items))
    .catch((err) => {
      console.error(err);
      return res
        .status(SERVER_ERROR_STATUS_CODE)
        .send({ message: "An error has occurred on the server" });
    });
};

module.exports.createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;
  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => {
      console.log(item);
      res.status(201).send(item);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res
          .status(BAD_REQUEST_STATUS_CODE)
          .send({ message: err.message });
      }
      return res
        .status(SERVER_ERROR_STATUS_CODE)
        .send({ message: "An error has occurred on the server" });
    });
};

const updateLike = (req, res, method) => {
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
      error.statusCode = NOT_FOUND_STATUS_CODE;
      throw error;
    })
    .then((item) => {
      res.send(item);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        res
          .status(BAD_REQUEST_STATUS_CODE)
          .send({ message: "Invalid item ID" });
      } else if (err.statusCode === NOT_FOUND_STATUS_CODE) {
        res.status(NOT_FOUND_STATUS_CODE).send({ message: err.message });
      } else {
        res
          .status(SERVER_ERROR_STATUS_CODE)
          .send({ message: "An error has occurred on the server" });
      }
    });
};

module.exports.deleteItem = (req, res) => {
  const userId = req.user._id;
  const { itemId } = req.params;
  ClothingItem.findById(itemId)
    .orFail(() => {
      const error = new Error("Item not found");
      error.statusCode = NOT_FOUND_STATUS_CODE;
      throw error;
    })
    .then((item) => {
      if (item.owner.toString() !== userId.toString()) {
        const error = new Error("You are not authorized to delete this item");
        error.statusCode = FORBIDDEN_STATUS_CODE;
        throw error;
      }
      return ClothingItem.findByIdAndDelete(itemId)
        .then(() => res.json({ message: "Item successfully deleted" }));
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res
          .status(BAD_REQUEST_STATUS_CODE)
          .send({ message: err.message });
      }
      if (err.statusCode === NOT_FOUND_STATUS_CODE) {
        return res.status(NOT_FOUND_STATUS_CODE).send({ message: err.message });
      }
      if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST_STATUS_CODE)
          .send({ message: err.message });
      }
      if (err.statusCode === FORBIDDEN_STATUS_CODE) {
        return res
          .status(FORBIDDEN_STATUS_CODE)
          .send({ message: err.message });
      }
      return res
        .status(SERVER_ERROR_STATUS_CODE)
        .send({ message: "An error has occurred on the server" });
    });
};

module.exports.likeItem = (req, res) => updateLike(req, res, "$addToSet");

module.exports.dislikeItem = (req, res) => updateLike(req, res, "$pull");
