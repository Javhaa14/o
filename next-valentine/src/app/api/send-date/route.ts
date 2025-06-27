import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import clientPromise from "@/lib/mongodb";

// Function to save date details to MongoDB
async function saveDateDetails(data: any) {
  try {
    const client = await clientPromise;
    const db = client.db("valentine-app");
    const collection = db.collection("dates");

    // Add new date with timestamp
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
    const body = await request.json();
    const { activities, time, dateConfirmed } = body;

    // Check if environment variables are set
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

    // Validate required fields
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

    // Save to database (MongoDB)
    const savedDate = await saveDateDetails({
      activities,
      time,
      dateConfirmed,
      date: "2025.06.27",
      day: "Бямба гариг",
    });

    // Create transporter with fallback options
    let transporter;
    try {
      // Try explicit configuration first
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
      // Fallback to service configuration
      transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
    }

    // Verify transporter configuration
    let emailSuccess = false;
    try {
      console.log("Attempting to verify email transporter...");
      console.log("Email user:", process.env.EMAIL_USER);
      console.log("Email pass length:", process.env.EMAIL_PASS?.length || 0);
      await transporter.verify();
      console.log("Email transporter verified successfully");
      emailSuccess = true;
    } catch (verifyError: any) {
      console.error("Email transporter verification failed:", verifyError);
      console.error("Error details:", {
        message: verifyError.message,
        code: verifyError.code,
        errno: verifyError.errno,
      });

      // Continue without email - data is already saved
      console.log("Continuing without email functionality...");
    }

    // Try to send email only if verification succeeded
    if (emailSuccess) {
      try {
        // Email content
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
                        (activity: string) =>
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

        // Send email
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
      } catch (emailError: any) {
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
    console.error("Email sending error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Имэйл илгээхэд алдаа гарлаа! Дахин оролдоно уу.",
      },
      { status: 500 }
    );
  }
}
