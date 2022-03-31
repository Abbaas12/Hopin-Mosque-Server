const mongoose = require("mongoose");

const advertisingSchema = mongoose.Schema({
  title: {
    type: String,
  },
  body: {
    type: String,
  },
  images: [
    {
      type: String,
    },
  ],
  date: {
    type: Date,
    default: Date.now(),
  },
});

advertisingSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

advertisingSchema.set("toJSON", {
  virtuals: true,
});

exports.Advertising = mongoose.model("Advertising", advertisingSchema);
