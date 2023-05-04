const travelModel = require("../models/travelModel");
const axios = require("axios");
const createTravel = async (req, res) => {
  try {
    const data = req.body;
    // console.log(data);
    const userId = req.tokenDetails.userId;
    console.log(data);
    const {
      tripName,
      startDate,
      endDate,
      placeName,
      date,
      activityTask,
      accommodations,
    } = data;

    const createData = {
      tripName,
      userId,
      startDate,
      endDate,
      accommodations,
      places: [{ placeName: placeName, activity: activityTask, date: date }],
    };

    const trip = await travelModel.findOneAndUpdate(
      { tripName: tripName },
      { $push: { places: createData.places } },
      { new: true }
    );

    if (trip) {
      return res.status(200).send({ data: trip });
    }

    const createTravel = await travelModel.create(createData);

    return res.status(200).send({ data: createTravel });
  } catch (error) {
    console.log("error in craeteTravel", error.message);
    return res.status(500).json({ message: error.message });
  }
};

const editTravel = async (req, res) => {
  try {
    let travelId = req.params.travelId;
    let data = req.body;
    let {
      tripName,
      startDate,
      endDate,
      placeName,
      placeId,
      activity,
      accommodations,
    } = data;

    if (placeName) {
      const update = await travelModel.findOneAndUpdate(
        { "places._id": placeId },
        {
          $set: { "places.$.placeName": placeName },
          $push: { "places.$.activity": activity },
        },
        { new: true }
      );

      return res.status(200).json({ data: update });
    }
    const update = await travelModel.findOneAndUpdate({ _id: travelId }, data, {
      new: true,
    });

    return res.status(200).json({ data: update });
  } catch (error) {
    console.log("edit travel", error.message);
    return res.status(500).json({ message: error.message });
  }
};

const deleteTravel = async (req, res) => {
  try {
    let data = req.body;
    let { tripName, startDate, endDate, placeName, placeId, activity } = data;
    let travelId = req.params.travelId;

    if (activity) {
      const update = await travelModel.findOneAndUpdate(
        { "places._id": placeId },
        {
          $pull: { "places.$.activity": activity },
        },
        { new: true }
      );
      return res.status(200).json({ message: "deleted" });
    }

    if (placeId) {
      const update = await travelModel.findOneAndUpdate(
        { "places._id": placeId },
        {
          $pull: { places: { _id: placeId } },
        },
        { new: true }
      );

      return res.status(200).json({ message: "deleted" });
    }

    await travelModel.deleteOne({ _id: travelId }, { new: true });

    return res.status(200).json({ message: "deleted" });
  } catch (error) {
    console.log("error in deleteTravel", error.message);
    return res.status(500).json({ message: error.message });
  }
};

const getTravelDetails = async (req, res) => {
  try {
    // const axios = require('axios');

    let userId = req.tokenDetails.userId;

    const travelData = await travelModel.find({ userId: userId });
    if (travelData.length === 0) {
      return res.status(404).json({ message: "Not Found" });
    }
    return res.status(200).json({ data: travelData });
  } catch (error) {
    console.log("error in getTravel", error.message);
    return res.status(500).send({ message: error.message });
  }
};

const getTravelDetailsById = async (req, res) => {
  try {
    // const axios = require('axios');

    let travelId = req.params.travelId;

    const travelData = await travelModel.findOne({ _id: travelId });

    return res.status(200).json({ data: travelData });
  } catch (error) {
    console.log("error in getTravelById", error.message);
    return res.status(500).send({ message: error.message });
  }
};

module.exports = {
  createTravel,
  editTravel,
  deleteTravel,
  getTravelDetails,
  getTravelDetailsById,
};
