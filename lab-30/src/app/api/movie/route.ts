import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
  try {
    const users = await prisma.users.findMany()
    return NextResponse.json(users)
  } catch(err) {
    return NextResponse.json({message:"Internal Server Error"},{status:500})
  }
}

export async function POST(req:NextRequest) {
  try {
    const body = await req.json()

    const user = await prisma.users.create({
      data : {
        UserName : body.UserName,
        Password: body.Password
      }
    })
    return NextResponse.json(user)
  } catch(err) {
    return NextResponse.json({message:"Internal Server Error"},{status:500})
  }
}