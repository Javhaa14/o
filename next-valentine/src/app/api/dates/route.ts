import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db('valentine-app');
    const collection = db.collection('dates');
    
    // Get all dates, sorted by timestamp (newest first)
    const dates = await collection.find({}).sort({ timestamp: -1 }).toArray();
    
    return NextResponse.json({ 
      success: true, 
      dates: dates,
      count: dates.length
    });
    
  } catch (error) {
    console.error('Error reading dates from MongoDB:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Өгөгдөл уншихад алдаа гарлаа!' 
      },
      { status: 500 }
    );
  }
} 