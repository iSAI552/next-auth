import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user.models";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/utils/mailer";

connect()

export async function POST(request:NextRequest) {
    try {
        const reqBody = await request.json()
        console.log(reqBody)
        const {username, email, password} = reqBody

        const user = await User.findOne({email})

        if(user) {
            return NextResponse.json({error: "User already exists"}, {status: 400})
        }

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        })

        const savedUser = await newUser.save()
        console.log(savedUser)

        //Now sending the verification email

        await sendEmail({email, emailType: "VERIFY", userId: savedUser._id})

        return NextResponse.json({message: "User registerd successfully", success: true, savedUser}, {status: 400})


    } catch (error:any) {
        return NextResponse.json({error: error.message},{status:500})
    }
}