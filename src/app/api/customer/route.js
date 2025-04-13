import { connectionStr } from "@/app/lib/db";
import { restaurantSchema } from "@/app/lib/restaurantsModel";
import mongoose, { Mongoose } from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request) {
  const queryParams = request.nextUrl.searchParams;
  const location = queryParams.get('restaurant');
  console.log(location);
  let filter={}
  if(queryParams.get('restaurant')){
    let restname=queryParams.get('restaurant')
    filter= {restname:{$regex:new RegExp(restname,'i')}}
  }else if(queryParams.get('location')){
    let city = queryParams.get('location')
   filter= {city:{$regex:new RegExp(city,'i')}}
  }
  await mongoose.connect(connectionStr,{useNewUrlParser:true});
  let result = await restaurantSchema.find(filter);
  return NextResponse.json({result, success: true });
}
