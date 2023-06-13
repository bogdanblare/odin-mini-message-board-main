const NewMessage = require("../models/newMessageModel");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// get messages
exports.message_list = asyncHandler(async (req, res, next) => {
    // retrieve the messages from the database.
    const message = await NewMessage.find().exec();
    res.render("index", { title: "Mini Messageboard", messages: message });
});

// display the form to create a new message
exports.message_create_get = (req, res, next) => {
    res.render("form");
};

// handle new message submission on POST
exports.message_create_post = [
    // check that both fields are not empty. must have at least one character entered.
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

        // if there is an error, then re-render the form with the valid entered data, and send an array containing the error messages.
        if (!errors.isEmpty()) {
            res.render("form", {
                newMessage: newMessage,
                errors: errors.array(),
            });
            return;
        } else {
            // if no error, then save to database
            await newMessage.save();
            res.redirect("/");
        }
    }),
];
