const NewMessage = require("../models/newMessageModel");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.message_list = asyncHandler(async (req, res, next) => {
  const message = await NewMessage.find().exec();
  res.render("index", { title: "Mini Messageboard", messages: message });
});

exports.message_create_get = (req, res, next) => {
  res.render("form");
};

exports.message_create_post = [
  body("messageUser", "You must enter a name")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("messageText", "You must enter a message")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const newMessage = await NewMessage({
      user: req.body.messageUser,
      text: req.body.messageText,
      added: new Date(),
    });

    if (!errors.isEmpty()) {
      res.render("form", {
        newMessage: newMessage,
        errors: errors.array(),
      });
      return;
    } else {
      await newMessage.save();
      res.redirect("/");
    }
  }),
];
