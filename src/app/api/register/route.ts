import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();
    console.log("Register attempt:", { name, email });
    
    if (!name || !email || !password) {
      return NextResponse.json({ error: "All fields required" }, { status: 400 });
    }

    console.log("Checking for existing user...");
    const existing = await prisma.user.findUnique({ where: { email } });
    
    if (existing) {
      return NextResponse.json({ error: "Email already registered" }, { status: 400 });
    }

    console.log("Hashing password...");
    const hashed = await bcrypt.hash(password, 12);

    console.log("Creating user...");
    const user = await prisma.user.create({
      data: { name, email, password: hashed },
    });

    console.log("User created:", user.id);
    return NextResponse.json({ success: true, userId: user.id });

  } catch (error) {
    console.error("REGISTER ERROR:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}