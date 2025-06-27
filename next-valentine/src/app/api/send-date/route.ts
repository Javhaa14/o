import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import clientPromise from "@/lib/mongodb";

// Define type for incoming request data
interface DateRequestData {
  activities: string[];
  time: string;
  dateConfirmed?: boolean;
}

// Save date details to MongoDB
async function saveDateDetails(
  data: DateRequestData & { date: string; day: string }
) {
  try {
    const client = await clientPromise;
    const db = client.db("valentine-app");
    const collection = db.collection("dates");

    const newDate = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      ...data,
    };

    const result = await collection.insertOne(newDate);
    console.log("Data saved to MongoDB:", result.insertedId);

    return newDate;
  } catch (error) {
    console.error("Error saving date details to MongoDB:", error);
    throw error;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as DateRequestData;
    const { activities, time, dateConfirmed } = body;

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("Email configuration missing");
      return NextResponse.json(
        {
          success: false,
          message: "Имэйл тохиргоо дутуу байна. Админтай холбогдоно уу.",
        },
        { status: 500 }
      );
    }

    // Validate inputs
    if (!activities || !Array.isArray(activities) || activities.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Үйл ажиллагаа сонгоно уу!",
        },
        { status: 400 }
      );
    }

    if (!time) {
      return NextResponse.json(
        {
          success: false,
          message: "Цаг сонгоно уу!",
        },
        { status: 400 }
      );
    }

    const savedDate = await saveDateDetails({
      activities,
      time,
      dateConfirmed,
      date: "2025.06.27",
      day: "Бямба гариг",
    });

    let transporter;
    try {
      transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
        tls: {
          rejectUnauthorized: false,
          ciphers: "SSLv3",
        },
      });
    } catch (configError) {
      console.error("Transporter config error:", configError);
      transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
    }

    let emailSuccess = false;
    try {
      console.log("Attempting to verify email transporter...");
      await transporter.verify();
      console.log("Email transporter verified successfully");
      emailSuccess = true;
    } catch (verifyError: unknown) {
      const error = verifyError as Error & { code?: string; errno?: number };
      console.error("Email transporter verification failed:", error);
      console.error("Error details:", {
        message: error.message,
        code: error.code,
        errno: error.errno,
      });
      console.log("Continuing without email functionality...");
    }

    if (emailSuccess) {
      try {
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: "javhaa1410@gmail.com",
          subject: "💕 Шинэ болзооны мэдээлэл! 💕",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #fce4ec, #f3e5f5); border-radius: 15px;">
              <h1 style="color: #e91e63; text-align: center; margin-bottom: 30px;">💕 Шинэ болзооны мэдээлэл! 💕</h1>
              <div style="background: white; padding: 20px; border-radius: 10px; margin-bottom: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                <h2 style="color: #9c27b0; margin-bottom: 15px;">📅 Болзооны дэлгэрэнгүй мэдээлэл</h2>
                <div style="margin-bottom: 15px;">
                  <strong style="color: #e91e63;">🗓️ Огноо:</strong> 2025.06.27 Бямба гариг
                </div>
                <div style="margin-bottom: 15px;">
                  <strong style="color: #e91e63;">🕐 Цаг:</strong> ${time}
                </div>
                <div style="margin-bottom: 15px;">
                  <strong style="color: #e91e63;">✅ Огноо баталгаажсан:</strong> ${
                    dateConfirmed ? "Тийм" : "Үгүй"
                  }
                </div>
                <div style="margin-bottom: 15px;">
                  <strong style="color: #e91e63;">🎯 Үйл ажиллагаанууд:</strong>
                  <ul style="margin: 10px 0; padding-left: 20px;">
                    ${activities
                      .map(
                        (activity) =>
                          `<li style="margin: 5px 0;">${activity}</li>`
                      )
                      .join("")}
                  </ul>
                </div>
                <div style="margin-bottom: 15px;">
                  <strong style="color: #e91e63;">🆔 Бүртгэлийн дугаар:</strong> ${
                    savedDate.id
                  }
                </div>
              </div>
            </div>
          `,
        };

        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
      } catch (emailError: unknown) {
        console.error("Email sending failed:", emailError);
        emailSuccess = false;
      }
    }

    return NextResponse.json({
      success: true,
      message: emailSuccess
        ? "Имэйл амжилттай илгээгдлээ!"
        : "Өгөгдөл хадгалагдлаа! Имэйл илгээх боломжгүй байна.",
      dateId: savedDate.id,
      emailSent: emailSuccess,
      adminUrl: `/admin`,
    });
  } catch (error) {
    console.error("Unhandled error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Имэйл илгээхэд алдаа гарлаа! Дахин оролдоно уу.",
      },
      { status: 500 }
    );
  }
}
