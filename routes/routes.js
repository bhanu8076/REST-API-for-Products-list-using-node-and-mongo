const router = require("express").Router();
const mongodb = require('mongodb');
const { db } = require("../db");

router.post("/product-list", (req, res, next) => {
  try {
    const newItem = req.body;
    db.then((result) => {
      result.collection("product-list").insertOne(newItem);
      return res.status(200).send({ message: "Product saved successfully" });
    }).catch((err) => console.error(err));
  } catch (err) {
    next(err);
  }
});

router.get("/product-list", (req, res, next) => {
  try {
    db.then((result) => {
      result
        .collection("product-list")
        .find()
        .toArray()
        .then((collectionRes) => {
          return res.status(200).send(collectionRes);
        });
    }).catch((err) => console.error(err));
  } catch (err) {
    next(err);
  }
});

router.patch("/product-list/:id", (req, res, next) => {
    try {
      const productId = req.params.id;
      const fieldToUpdate = req.body;
      db.then((result) => {
        result
          .collection("product-list")
          .updateOne({ _id: new mongodb.ObjectId(productId) }, { $set: fieldToUpdate })
          .then((collectionRes) => {
            return res.status(200).send({'updated field': collectionRes});
          });
      }).catch((err) => console.error(err));
    } catch (err) {
      next(err);
    }
});

router.delete("/product-list/:id", (req, res, next) => {
    try {
      const productId = req.params.id;
      db.then((result) => {
        result
          .collection("product-list")
          .deleteOne({ _id: new mongodb.ObjectId(productId) })
          .then((collectionRes) => {
            return res.status(200).send({'deleted field': collectionRes});
          });
      }).catch((err) => console.error(err));
    } catch (err) {
      next(err);
    }
});

module.exports = router;
