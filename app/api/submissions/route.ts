import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Submission from '@/models/Submission';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const search = searchParams.get('search') || '';
    const interest = searchParams.get('interest') || '';

    // Build query
    const query: any = {};
    
    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { rollNumber: { $regex: search, $options: 'i' } },
        { currentLocation: { $regex: search, $options: 'i' } },
      ];
    }

    if (interest) {
      query.interest = interest;
    }

    // Get total count
    const total = await Submission.countDocuments(query);

    // Get submissions with pagination
    const submissions = await Submission.find(query)
      .sort({ submittedAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    // Get statistics
    const stats = await Submission.aggregate([
      {
        $group: {
          _id: '$interest',
          count: { $sum: 1 },
        },
      },
    ]);

    const statistics = {
      total,
      definitely: stats.find(s => s._id === 'definitely')?.count || 0,
      maybe: stats.find(s => s._id === 'maybe')?.count || 0,
      unsure: stats.find(s => s._id === 'unsure')?.count || 0,
      wantUpdates: await Submission.countDocuments({ wantUpdates: true }),
    };

    return NextResponse.json({
      success: true,
      data: submissions,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
      statistics,
    });

  } catch (error) {
    console.error('Get submissions error:', error);
    return NextResponse.json(
      { success: false, error: 'Server error' },
      { status: 500 }
    );
  }
}
