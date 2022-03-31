const mongoose = require("mongoose");

const jamaeaSchema = mongoose.Schema({
  fajr: {
    type: String,
  },
  fajrAdhan: {
    type: String,
  },
  fajrJamaea: {
    type: String,
  },

  zuhr: {
    type: String,
  },
  zuhrAdhan: {
    type: String,
  },
  zuhrJamaea: {
    type: String,
  },

  easr: {
    type: String,
  },
  easrAdhan: {
    type: String,
  },
  easrJamaea: {
    type: String,
  },

  maghrib: {
    type: String,
  },
  maghribAdhan: {
    type: String,
  },
  maghribJamaea: {
    type: String,
  },

  easha: {
    type: String,
  },
  eashaAdhan: {
    type: String,
  },
  eashaJamaea: {
    type: String,
  },

  jumea: {
    type: String,
  },
  jumeaAdhan: {
    type: String,
  },
  jumeaJamaea: {
    type: String,
  },

  date: {
    type: Date,
    default: Date.now(),
  },
});

jamaeaSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

jamaeaSchema.set("toJSON", {
  virtuals: true,
});

exports.Jamaea = mongoose.model("Jamaea", jamaeaSchema);
