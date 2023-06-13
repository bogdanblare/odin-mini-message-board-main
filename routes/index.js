const express = require("express");
const router = express.Router();
const newMessageController = require("../controllers/newMessageController");

/* GET home page. */
router.get("/", newMessageController.message_list);

// get the /new page which will render the new message form
router.get("/new", newMessageController.message_create_get);

// the form has a post method which will run this code
router.post("/new", newMessageController.message_create_post);

module.exports = router;
