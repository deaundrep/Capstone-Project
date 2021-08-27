const { Router } = require("express");
const { check } = require("express-validator");
const {
    getEvent,
    createEvent,
    actualEvent,
    eliEvent,
    getEvents,
} = require("../controllers/events");
const { isDate } = require("../helpers/isData");
const { validField } = require("../middlewares/validate-fields");
const { validJWT } = require("../middlewares/valid-jwt");

const router = Router();

router.use(validJWT);

router.get("/", getEvents);

router.post(
    "/",
    [
        check("title", "Title").not().isEmpty(),
        check("start", "start").custom(isDate),
        validField,
    ],
    createEvent
);

router.put(
    "/:id",
    [
        check("title", "title").not().isEmpty(),
        check("start", "start").custom(isDate),
        validField,
    ],
    actualEvent
);

router.delete("/:id", eliEvent);

module.exports = router;