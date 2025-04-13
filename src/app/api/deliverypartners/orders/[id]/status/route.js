// Import necessary modules
import { connectionStr } from "@/app/lib/db";
import { orderSchema } from "@/app/lib/orderMode";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function PUT(request, content) {
    const { orderId } = content.params;
    const { status } = request.body;

    try {
        // Connect to MongoDB
        await mongoose.connect(connectionStr, { useNewUrlParser: true, useUnifiedTopology: true });

        // Update order status
        const updatedOrder = await orderSchema.findByIdAndUpdate(orderId, { status }, { new: true });

        if (!updatedOrder) {
            return NextResponse.json({ success: false, message: "Order not found" });
        }

        // Return JSON response with success status and updated order
        return NextResponse.json({ success: true, order: updatedOrder });
    } catch (error) {
        console.error("Error updating order status:", error.message);
        return NextResponse.json({ success: false, message: "Error updating order status" });
    } finally {
        // Disconnect from MongoDB
        await mongoose.disconnect();
    }
}
