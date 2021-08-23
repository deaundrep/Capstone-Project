const { response } = require("express");
const Event = require("../models/Event");

const getEvents = async (req, res = response) => {
    const events = await Event.find().populate("user", "name");

    res.json({
        ok: true,
        events,
    });
};
const createEvent = async (req, res = response) => {
    const event = new Event(req.body);
    try {
        event.user = req.uid;
        const eventSaved = await event.save();
        res.json({
            ok: true,
            event: eventSaved,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: " admin",
        });
    }
};
const actualEvent = async (req, res = response) => {
    const eventId = req.params.id;
    const uid = req.uid;
    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: "no ID",
            });
        }
        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: "No time edit event",
            });
        }
        const newEvent = {
            ...req.body,
            user: uid,
        };
        const eventAcutal = await Event.findByIdAndUpdate(
            eventId,
            newEvent,
            { new: true }
        );
        res.json({
            ok: true,
            event: eventAcutal,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador",
        });
    }
};
const eliEvent = async (req, res = response) => {
    const eventId = req.params.id;
    const uid = req.uid;

    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: "no ID",
            });
        }
        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: "No event",
            });
        }

        await Event.findByIdAndDelete(eventId);

        res.json({ ok: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "admin !",
        });
    }
};

module.exports = {
    getEvents,
    createEvent,
    actualEvent,
    eliEvent,
};