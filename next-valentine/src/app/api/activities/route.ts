import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

// Define interface for activity document
interface ActivityDocument {
  name: string;
  timestamp: string;
  id: number;
}

// Get all activities from database
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("valentine-app");
    const collection = db.collection("activities");

    const activities = (await collection
      .find({})
      .toArray()) as ActivityDocument[];
    const activityList = activities.map(
      (activity: ActivityDocument) => activity.name
    );

    return NextResponse.json({
      success: true,
      activities: activityList,
    });
  } catch (error) {
    console.error("Error fetching activities:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Активүүдийг авахад алдаа гарлаа!",
      },
      { status: 500 }
    );
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
