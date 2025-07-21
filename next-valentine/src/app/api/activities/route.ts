import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

// Define interface for activity document
interface ActivityDocument {
  name: string;
  timestamp: string;
  id: number;
}

// Default activities to use when database is not available
const DEFAULT_ACTIVITIES = [
  "Кино үзэх",
  "Кофе уух",
  "Паркaар зугаалах",
  "Хоол идэх",
  "Тоглоомын төв орох",
  "Roller skate-ээр гулгах",
  "Боулинг тоглох",
  "Trampoline дээр үсрэх",
  "Ууланд гарах",
  "Ууж суух",
  "Зүгээр ярилцаж алхах",
];

// Get all activities from database
export async function GET() {
  try {
    // Check if MongoDB is configured
    if (!process.env.MONGODB_URI) {
      console.log("MongoDB not configured, using default activities");
      return NextResponse.json({
        success: true,
        activities: DEFAULT_ACTIVITIES,
        message: "Using default activities (MongoDB not configured)",
      });
    }

    const client = await clientPromise;
    const db = client.db("valentine-app");
    const collection = db.collection("activities");

    const activities = await collection.find({}).toArray();
    const activityList = activities
      .map((activity) => activity as unknown as ActivityDocument)
      .map((activity: ActivityDocument) => activity.name);

    // Combine default activities with database activities
    const combinedActivities = [...DEFAULT_ACTIVITIES];
    activityList.forEach((activity) => {
      if (!combinedActivities.includes(activity)) {
        combinedActivities.push(activity);
      }
    });

    return NextResponse.json({
      success: true,
      activities: combinedActivities,
    });
  } catch (error) {
    console.error("Error fetching activities:", error);
    // Fallback to default activities if database fails
    return NextResponse.json({
      success: true,
      activities: DEFAULT_ACTIVITIES,
      message: "Using default activities (database error)",
    });
  }
}

// Add new activity to database
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { activity } = body;

    if (!activity || typeof activity !== "string" || !activity.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Активын нэр оруулна уу!",
        },
        { status: 400 }
      );
    }

    // Check if MongoDB is configured
    if (!process.env.MONGODB_URI) {
      return NextResponse.json(
        {
          success: false,
          message: "MongoDB тохиргоо дутуу байна. Админтай холбогдоно уу.",
        },
        { status: 500 }
      );
    }

    const client = await clientPromise;
    const db = client.db("valentine-app");
    const collection = db.collection("activities");

    // Check if activity already exists
    const existingActivity = await collection.findOne({
      name: { $regex: new RegExp(`^${activity.trim()}$`, "i") },
    });

    if (existingActivity) {
      return NextResponse.json(
        {
          success: false,
          message: "Энэ актив аль хэдийн байна!",
        },
        { status: 400 }
      );
    }

    // Add new activity
    const newActivity = {
      name: activity.trim(),
      timestamp: new Date().toISOString(),
      id: Date.now(),
    };

    const result = await collection.insertOne(newActivity);
    console.log("New activity saved to MongoDB:", result.insertedId);

    return NextResponse.json({
      success: true,
      message: "Актив амжилттай нэмэгдлээ!",
      activity: newActivity,
    });
  } catch (error) {
    console.error("Error adding activity:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Актив нэмэхэд алдаа гарлаа!",
      },
      { status: 500 }
    );
  }
}
