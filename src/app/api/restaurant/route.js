import { connectionStr } from "@/app/lib/db"
import { restaurantSchema } from "@/app/lib/restaurantsModel"
import mongoose from "mongoose"
import { NextResponse } from "next/server"

export async function GET(){
    await mongoose.connect(connectionStr,{useNewUrlParser:true})
    const data = await restaurantSchema.find()
    console.log(data);


    return NextResponse.json({
        result:true
    })
}
//countional api setting for POST for login and signup
export async function POST(request){
    console.log(request);
    let payload = await request.json();
    let result=undefined;
    let success=false;
    await mongoose.connect(connectionStr,{useNewUrlParser:true})
    if(payload.login){
        // use log  in
        result = await restaurantSchema.findOne({
            email:payload.email,
            password:payload.password
        })
        if(result){success=true}
    }else{
        //use for signup
        let restaurant = new restaurantSchema(payload)
        result =await restaurant.save();
        if(result){success=true}
    }
   
   
    console.log(payload);
    return NextResponse.json({result,success})
}