const mongoose = require("mongoose");

const prayertimeSchema = mongoose.Schema({
  morning: {
    type: String,
    required: true,
  },
  sunrise: {
    type: String,
    required: true,
  },
  demise: {
    type: String,
    required: true,
  },
  aleasr1: {
    type: String,
    required: true,
  },
  aleasr2: {
    type: String,
    required: true,
  },
  sunset: {
    type: String,
    required: true,
  },
  night: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

prayertimeSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

prayertimeSchema.set("toJSON", {
  virtuals: true,
});

exports.Prayertime = mongoose.model("Prayertime", prayertimeSchema);
