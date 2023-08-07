// 몽구스: 몽고디비와 express 중간자 역할
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    name: String,
    mobile: String,
    email: String,
    address: String,
    createdAt: Date,
});

// 데이터베이스에 'password'를 저장하기 전에
// bcrypt를 이용하여 암호화한 수 저장 
userSchema.pre("save", async function(){
    if(this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 5);
    }
})

const User = mongoose.model("User", userSchema)
export default User;
