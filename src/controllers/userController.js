import User from "../models/user.js";

export const postRegisterMember =  async(req,res) => {
    try {
        const {username, password, email, name, mobile, address2 } = req.body;
        const address =address2;
        const user = await  User.create({
            username,
            password,
            name,
            email,
            mobile,
            address,
            createdAt: Date.now(),
        });
        res.json({ok: "true", user})
    } catch (error) {
        console.log(error);
    }
}