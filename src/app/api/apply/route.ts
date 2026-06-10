import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      applicantType,
      childName,
      childGrade,
      studentGrade,
      contactName,
      email,
      phone,
      password,
      comboId,
      language,
      hearAboutUs,
      message,
      agreedToExam,
    } = body;

    if (!email || !password || !contactName || !comboId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "Email already registered" }, { status: 409 });
    }

    const combo = await prisma.uNTCombo.findUnique({ where: { id: comboId } });
    if (!combo) {
      return NextResponse.json({ error: "Invalid combo" }, { status: 400 });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name: contactName,
        email,
        phone,
        passwordHash,
        role: "APPLICANT",
        application: {
          create: {
            applicantType,
            childName: applicantType === "parent" ? childName : null,
            childGrade: applicantType === "parent" ? childGrade : null,
            studentGrade: applicantType === "student" ? studentGrade : null,
            comboId,
            language,
            hearAboutUs,
            message,
            agreedToExam: Boolean(agreedToExam),
            status: "PENDING",
          },
        },
      },
    });

    return NextResponse.json({ success: true, userId: user.id });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
