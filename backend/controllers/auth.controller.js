import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const login = async (req, res) => {
    try {
        const { username, pass } = req.body;
        const user = await User.findOne({ username });
        const isPassCorrect = await bcrypt.compare(pass, user?.pass || "");

        if (!user || !isPassCorrect) {
            return res.status(400).json({ error: "Ten dang nhap hoac mat khau sai" });
        }

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            picturePro: user.picturePro,
        });
        
    } catch (error) {
        console.log("Loi dang nhap", error.message);
        res.status(500).json({ error: "Loi" });
    }
};

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Dang xuat thanh cong" });
    } catch (error) {
        console.log("Loi dang xuat", error.message);
        res.status(500).json({ error: "Loi" });
    }
};

export const signup = async (req, res) => {
    try {
        const { fullName, username, pass, confirmPass, Gender } = req.body;

        if (pass !== confirmPass) {
            return res.status(400).json({ error: "Mat khau khong trung khop" });
        }
        const user = await User.findOne({ username });

        if (user) {
            return res.status(400).json({ error: "Ten dang nhap da ton tai" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(pass, salt);

        const picMan = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const picWoman = `https://avatar.iran.liara.run/public/boy?username=${username}`;

        const newUser = new User({
            fullName,
            username,
            pass: hashedPass,
            Gender,
            picturePro: Gender === "nam" ? picMan : picWoman,
        });

        if (newUser) {
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                picturePro: newUser.picturePro
            });
        } else {
            res.status(400).json({ error: "Tai khoan khong hop le" });
        }

    } catch (error) {
        console.log("Loi dang ky", error.massage);
        res.status(500).json({ Error: "Loi" });
    }
};