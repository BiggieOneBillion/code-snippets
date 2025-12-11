import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// POST - Like an entry
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    const { id } = await params;

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Check if entry exists
    const entry = await prisma.entry.findUnique({
      where: { id },
    });

    if (!entry) {
      return NextResponse.json(
        { error: 'Entry not found' },
        { status: 404 }
      );
    }

    // Check if user has already liked this entry
    const existingLike = await prisma.like.findUnique({
      where: {
        userId_entryId: {
          userId: session.user.id,
          entryId: id,
        },
      },
    });

    if (existingLike) {
      return NextResponse.json(
        { error: 'Already liked' },
        { status: 400 }
      );
    }

    // Create like
    const like = await prisma.like.create({
      data: {
        userId: session.user.id,
        entryId: id,
      },
    });

    // Get updated like count
    const likeCount = await prisma.like.count({
      where: { entryId: id },
    });

    return NextResponse.json(
      { like, likeCount },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error liking entry:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE - Unlike an entry
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    const { id } = await params;

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Find and delete the like
    const like = await prisma.like.findUnique({
      where: {
        userId_entryId: {
          userId: session.user.id,
          entryId: id,
        },
      },
    });

    if (!like) {
      return NextResponse.json(
        { error: 'Like not found' },
        { status: 404 }
      );
    }

    await prisma.like.delete({
      where: { id: like.id },
    });

    // Get updated like count
    const likeCount = await prisma.like.count({
      where: { entryId: id },
    });

    return NextResponse.json(
      { message: 'Like removed', likeCount },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error unliking entry:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
