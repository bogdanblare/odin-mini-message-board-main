const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const NewMessageSchema = new Schema({
  text: { type: String, maxLength: 250 },
  user: { type: String, maxLength: 50 },
  added: { type: Date },
});

NewMessageSchema.virtual("added_formatted").get(function () {
  return DateTime.fromJSDate(this.added).toLocaleString(
    DateTime.DATETIME_MED_WITH_SECONDS,
  );
});

module.exports = mongoose.model("NewMessage", NewMessageSchema);
