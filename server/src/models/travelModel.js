const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;
const travelSchema = new mongoose.Schema({
  tripName: {
    type: String,
    require: true,
    trim: true,
  },

  userId: {
    type: ObjectId,
    ref: "User",
  },

  startDate: {
    type: String,
    require: true,
  },

  endDate: {
    type: String,
    require: true,
  },
  accommodations: {
    type: String,
  },
  places: [
    {
      placeName: { type: String },
      date: { type: String },
      activity: [
        {
          type: String,
        },
      ],
    },
  ],
});

module.exports = mongoose.model("Travel", travelSchema);
