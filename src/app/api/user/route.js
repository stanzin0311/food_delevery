import { connectionStr } from "@/app/lib/db";
import { userSchema } from "@/app/lib/userModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request) {

        const payload = await request.json();
        let success = false;


            await mongoose.connect(connectionStr, { useNewUrlParser: true, useUnifiedTopology: true });
        

        const User = mongoose.model("User", userSchema);
        const user = new User(payload);
        const result = await user.save();

        if (result) {
            success = true;
        }

        return NextResponse.json({ result, success });

    
}
