const { response } = require("express");
const  Events = require("../models/Events");


const getEvents = async (req, res = response) => {

  const events = await Events.find().populate('user', 'name');



  res.json({
    ok: true,
    events,
  });
}

const createEvents = async (req, res = response) => {

    const uid = req.uid;

    const event = new Events({ 
      ...req.body, 
      user: uid });

    try {
       const savedEvent = await event.save(); 
       res.json({
           ok: true,
           event: savedEvent,
       });

      } catch (error) {
        return res.status(500).json({
            ok: false,
            message: "User ID not found in request",
        });
    }

    res.json({
        ok: true,
        message: "createEvents",
    });
}

const updateEvents = async (req, res = response) => {
    const eventId = req.params.id;
    const uid = req.uid;

    // Validate if the event exists

    try {

      const event = await Events.findById(eventId);
      if (!event) {
        return res.status(404).json({
            ok: false,
            message: "Event not found",
        });
      }

      // Check if the user is the owner of the event
      if (event.user.toString() !== uid) {
        return res.status(401).json({
            ok: false,
            message: "User not authorized to update this event",
        });
      }

      // Update the event
      const updatedEvent = {
        ...req.body,
        user: uid,
      };

      const eventUpdated = await Events.findByIdAndUpdate(eventId, updatedEvent, { new: true });

      res.json({
          ok: true,
          event: eventUpdated,
      });
      
    } catch (error) {
      console.log(error);
      return res.status(500).json({
          ok: false,
          message: "Error updating event",
      });
      
    }
}

const deleteEvents = async (req, res = response) => {
    const eventId = req.params.id;
    const uid = req.uid;

    // Validate if the event exists
    try {

      const event = await Events.findById(eventId);
      if (!event) {
        return res.status(404).json({
            ok: false,
            message: "Event not found",
        });
      }

      // Check if the user is the owner of the event
      if (event.user.toString() !== uid) {
        return res.status(401).json({
            ok: false,
            message: "User not authorized to delete this event",
        });
      }

      const eventDeleted = await Events.findByIdAndDelete(eventId, { new: true });

      res.json({
          ok: true,
          event: eventDeleted,
      });
      
    } catch (error) {
      console.log(error);
      return res.status(500).json({
          ok: false,
          message: "Error deleting event",
      });
      
    }
}

module.exports = {
  getEvents,
  createEvents,
  updateEvents,
  deleteEvents,
};
