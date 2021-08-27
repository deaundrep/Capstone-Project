const { response, json } = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { generateJWT } = require("../helpers/jwt");

const createUser = async (req, resp = response) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return resp.status(400).json({
                ok:false,
                msg: "check email ",
            })
        }

        user = new User(req.body);

        const salt = bcrypt.genSaltSync();

        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        const token = await generateJWT(user.id, user.name);

        resp.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        });
    } catch (error) {
        resp.status(500).json({
            ok: false,
            msg: "call admin",
        });
    }
};

const loginUser = async (req, resp = response) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (!user) {
            return resp.status(400).json({
                ok: false,
                msg: "no user no exist email",
            });
        }

        const validPassword = bcrypt.compareSync(password, user.password);

        if (!validPassword) {
            return resp.status(400).json({
                ok: false,
                msg: "Password incorrect",
            });
        }

        const token = await generateJWT(user.id, user.name);

        resp.json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        });
    } catch (error) {
        resp.status(500).json({
            ok: false,
            msg: "call admin",
        });
    }
};
const revalidToken = async(req, resp = response) => {

    const {uid, name} = req;

    const token = await generateJWT(uid, name);

    resp.json({
        ok: true,
        uid,
        name,
        token
    });
};

module.exports = { createUser, loginUser, revalidToken };