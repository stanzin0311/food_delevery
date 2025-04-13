import { connectionStr } from "@/app/lib/db";
import { foodSchema } from "@/app/lib/foodModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request, context) {
    const { id } = context.params;
    console.log(id);
    let success = false;

    // Connect to MongoDB
    await mongoose.connect(connectionStr, { useNewUrlParser: true, useUnifiedTopology: true });

    // Perform the query
    const result = await foodSchema.find({resto_id:id});

    // Set success to true if result is found
    if (result) {
        success = true;
    }

    // Disconnect from MongoDB
   
    return NextResponse.json({ result, success });
}
export async function DELETE(request,content){
    const id = content.params.id;
    let success = false;
    await mongoose.connect(connectionStr,{useNewUrlParser:true});
    const result = await foodSchema.deleteOne({_id:id})
    if(result.deletedCount>0){
        success=true
    }

    return NextResponse.json({result,success})
}