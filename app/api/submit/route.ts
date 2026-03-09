import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Submission from '@/models/Submission';

export async function POST(request: NextRequest) {
  try {
    // Connect to database
    await connectDB();

    // Parse request body
    const body = await request.json();
    const { fullName, rollNumber, phone, currentLocation, interest, suggestions, wantUpdates } = body;

    // Validate required fields
    if (!fullName || !phone || !interest) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing required fields',
          message: 'পূর্ণ নাম, মোবাইল নম্বর এবং আগ্রহের মাত্রা আবশ্যক'
        },
        { status: 400 }
      );
    }

    // Clean phone number (remove spaces, dashes, etc.)
    const cleanPhone = phone.replace(/\D/g, '');

    // Check if phone number already exists
    const existingSubmission = await Submission.findOne({ phone: cleanPhone });

    if (existingSubmission) {
      return NextResponse.json(
        {
          success: false,
          error: 'Duplicate phone number',
          message: 'এই মোবাইল নম্বর দিয়ে ইতিমধ্যে সম্মতি জানানো হয়েছে',
          existingData: {
            fullName: existingSubmission.fullName,
            submittedAt: existingSubmission.submittedAt,
          }
        },
        { status: 409 }
      );
    }

    // Create new submission
    const submission = await Submission.create({
      fullName: fullName.trim(),
      rollNumber: rollNumber?.trim() || '',
      phone: cleanPhone,
      currentLocation: currentLocation?.trim() || '',
      interest,
      suggestions: suggestions?.trim() || '',
      wantUpdates: wantUpdates !== false,
      submittedAt: new Date(),
    });

    return NextResponse.json(
      {
        success: true,
        message: 'সম্মতি সফলভাবে জমা হয়েছে',
        data: {
          id: submission._id,
          fullName: submission.fullName,
          phone: submission.phone,
          interest: submission.interest,
          submittedAt: submission.submittedAt,
        }
      },
      { status: 201 }
    );

  } catch (error: any) {
    console.error('Submission error:', error);

    // Handle mongoose validation errors
    if (error.name === 'ValidationError') {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation error',
          message: 'দয়া করে সব তথ্য সঠিকভাবে পূরণ করুন',
          details: error.message,
        },
        { status: 400 }
      );
    }

    // Handle duplicate key error (shouldn't happen due to pre-check, but just in case)
    if (error.code === 11000) {
      return NextResponse.json(
        {
          success: false,
          error: 'Duplicate entry',
          message: 'এই মোবাইল নম্বর দিয়ে ইতিমধ্যে সম্মতি জানানো হয়েছে',
        },
        { status: 409 }
      );
    }

    // Generic error
    return NextResponse.json(
      {
        success: false,
        error: 'Server error',
        message: 'দুঃখিত, একটি সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন',
      },
      { status: 500 }
    );
  }
}

// Optional: GET endpoint to check if phone exists
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const phone = searchParams.get('phone');

    if (!phone) {
      return NextResponse.json(
        { success: false, error: 'Phone number required' },
        { status: 400 }
      );
    }

    await connectDB();

    const cleanPhone = phone.replace(/\D/g, '');
    const exists = await Submission.findOne({ phone: cleanPhone });

    return NextResponse.json({
      success: true,
      exists: !!exists,
      data: exists ? {
        fullName: exists.fullName,
        submittedAt: exists.submittedAt,
      } : null,
    });

  } catch (error) {
    console.error('Check error:', error);
    return NextResponse.json(
      { success: false, error: 'Server error' },
      { status: 500 }
    );
  }
}
