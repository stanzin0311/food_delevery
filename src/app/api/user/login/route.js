import { connectionStr } from "@/app/lib/db";
import User from "@/app/lib/userModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const payload = await request.json();
        await mongoose.connect(connectionStr, { useNewUrlParser: true, useUnifiedTopology: true });

        // Find the user by email and password
        const user = await User.findOne({ email: payload.email, password: payload.password });

        if (user) {
            return NextResponse.json({ success: true, result: user });
        } else {
            return NextResponse.json({ success: false, error: "Invalid email or password" });
        }
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json({ success: false, error: "An error occurred during login" });
    } finally {
        // Ensure the database connection is closed after operation
        mongoose.connection.close();
    }
}
