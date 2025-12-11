import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { createEntrySchema } from '@/lib/validations';

// GET - Fetch user's entries (optionally filtered by project)
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const projectId = searchParams.get('projectId');

    const entries = await prisma.entry.findMany({
      where: {
        userId: session.user.id,
        ...(projectId && { projectId }),
      },
      include: {
        project: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    // Get like counts for each entry
    const entriesWithLikes = await Promise.all(
      entries.map(async (entry) => {
        const likeCount = await prisma.like.count({
          where: { entryId: entry.id },
        });
        return {
          ...entry,
          likeCount,
        };
      })
    );

    return NextResponse.json({ entries: entriesWithLikes });
  } catch (error) {
    console.error('Error fetching entries:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Create new entry
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const validatedData = createEntrySchema.parse(body);

    // If projectId is provided, verify user owns the project
    if (validatedData.projectId) {
      const project = await prisma.project.findUnique({
        where: { id: validatedData.projectId },
      });

      if (!project || project.userId !== session.user.id) {
        return NextResponse.json(
          { error: 'Invalid project' },
          { status: 400 }
        );
      }
    }

    const entry = await prisma.entry.create({
      data: {
        title: validatedData.title,
        content: validatedData.content,
        type: validatedData.type,
        language: validatedData.language,
        isPublic: validatedData.isPublic,
        projectId: validatedData.projectId,
        userId: session.user.id,
      },
      include: {
        project: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json(
      { entry },
      { status: 201 }
    );
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Error creating entry:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
