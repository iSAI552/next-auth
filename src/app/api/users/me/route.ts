import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user.models";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/utils/getDataFromToken";

connect()

export async function POST(request:NextRequest) {
    const userId = await getDataFromToken(request)
    const user = User.findById(userId).select("-password")
    return NextResponse.json({
        message: "User found",
        data: user
    })
}