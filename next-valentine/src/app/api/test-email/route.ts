import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const { EMAIL_USER, EMAIL_PASS } = process.env;

    // Check required environment variables
    if (!EMAIL_USER || !EMAIL_PASS) {
      return NextResponse.json(
        {
          success: false,
          message: "Имэйл тохиргоо дутуу байна.",
          details: {
            hasUser: !!EMAIL_USER,
            hasPass: !!EMAIL_PASS,
          },
        },
        { status: 500 }
      );
    }

    // Setup nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // Use TLS
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    // Verify transporter connection
    try {
      await transporter.verify();
      console.log("✅ Email transporter verified");
    } catch (verifyError: unknown) {
      const error = verifyError as Error & { code?: string; errno?: number };
      console.error("❌ Transporter verification failed:", error.message);
      return NextResponse.json(
        {
          success: false,
          message: "Gmail холболт амжилтгүй.",
          error: error.message,
          details: {
            user: EMAIL_USER,
            passLength: EMAIL_PASS.length,
          },
        },
        { status: 500 }
      );
    }

    // Send test email
    const mailOptions = {
      from: EMAIL_USER,
      to: "javhaa1410@gmail.com",
      subject: "🧪 Имэйл тест - Valentine App",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #fce4ec, #f3e5f5); border-radius: 15px;">
          <h1 style="color: #e91e63; text-align: center; margin-bottom: 30px;">🧪 Имэйл тест амжилттай!</h1>
          <div style="background: white; padding: 20px; border-radius: 10px; margin-bottom: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <h2 style="color: #9c27b0; margin-bottom: 15px;">✅ Тохиргоо зөв байна</h2>
            <div style="margin-bottom: 15px;">
              <strong style="color: #e91e63;">📧 Имэйл:</strong> ${EMAIL_USER}
            </div>
            <div style="margin-bottom: 15px;">
              <strong style="color: #e91e63;">🕐 Илгээсэн цаг:</strong> ${new Date().toLocaleString(
                "mn-MN"
              )}
            </div>
            <div style="margin-bottom: 15px;">
              <strong style="color: #e91e63;">🔧 Сервер:</strong> smtp.gmail.com:587
            </div>
          </div>
          <div style="text-align: center; margin-top: 20px; color: #9c27b0; font-weight: bold;">
            💖 Valentine App-ийн имэйл тохиргоо амжилттай! 💖
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: "Тест имэйл амжилттай илгээгдлээ!",
      details: {
        user: EMAIL_USER,
        passLength: EMAIL_PASS.length,
      },
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error("❌ Test email error:", err.message);
    return NextResponse.json(
      {
        success: false,
        message: "Тест имэйл илгээхэд алдаа гарлаа!",
        error: err.message,
      },
      { status: 500 }
    );
  }
}
