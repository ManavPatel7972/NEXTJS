import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const movie = await prisma.users.findUnique({
      where: {
        UserID: Number(id),
      }
    });
    return NextResponse.json(movie);
  } catch (err) {
    return NextResponse.json({message:"Internal Server Error"},{status:500})
  }
}

export async function PUT(req:NextRequest,{params}:{params:Promise<{id:string}>}) {
  try {
    const {id} = await params

    const body = await req.json()

    const movie = await prisma.users.update({
      where:{
        UserID:Number(id)
      },
      data:{
        UserName: body.UserName,
        Password: body.Password
      }
    })
    return NextResponse.json(movie)
  } catch(err) {
    return NextResponse.json({message:"Internal Server Error"},{status:500})
  }
}

export async function DELETE(req:NextRequest,{params}:{params:Promise<{id:string}>}) {
  try {
    const {id} = await params
    const movie = await prisma.users.delete({
      where: {
        UserID: Number(id)
      }
    })
    return NextResponse.json({deletedMovie: movie})
  } catch(err) {
    return NextResponse.json({message:"Internal Server Error"},{status:500})
  }
}