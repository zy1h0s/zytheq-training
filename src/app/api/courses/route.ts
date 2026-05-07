/*
 * Courses API Route
 * CRUD for courses under indexes
 */

import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';
import { getCurrentUser, logActivity } from '@/lib/auth';
import { getYouTubeThumbnailUrl } from '@/lib/utils';

// GET - List courses for current user
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = createServerClient();
    const { searchParams } = new URL(request.url);
    const indexId = searchParams.get('index_id');
    const search = searchParams.get('search');

    let query = supabase
      .from('courses')
      .select(`
        *,
        index:indexes!inner(id, name),
        sections(
          id,
          order_index,
          lectures(id, order_index, youtube_url)
        )
      `)
      .eq('created_by', user.id)
      .order('created_at', { ascending: false });

    if (indexId) {
      query = query.eq('index_id', indexId);
    }

    if (search) {
      query = query.ilike('title', `%${search}%`);
    }

    const { data, error } = await query;

    if (error) throw error;

    // Format with counts; derive a YouTube thumbnail from the first lecture
    // when the course has no explicit thumbnail_url so cards never show empty.
    const courses = data.map((course: Record<string, unknown>) => {
      const sections = course.sections as {
        id: string;
        order_index?: number;
        lectures: { id: string; order_index?: number; youtube_url?: string | null }[];
      }[];
      const sortedSections = [...sections].sort(
        (a, b) => (a.order_index ?? 0) - (b.order_index ?? 0)
      );
      const lectureCount = sections.reduce((acc, s) => acc + s.lectures.length, 0);
      const firstYouTubeUrl = sortedSections
        .flatMap((s) =>
          [...s.lectures].sort(
            (a, b) => (a.order_index ?? 0) - (b.order_index ?? 0)
          )
        )
        .find((l) => l.youtube_url)?.youtube_url;
      const derivedThumb = firstYouTubeUrl
        ? getYouTubeThumbnailUrl(firstYouTubeUrl)
        : null;
      return {
        ...course,
        thumbnail_url: course.thumbnail_url || derivedThumb,
        index_name: (course.index as { name: string })?.name,
        section_count: sections.length,
        lecture_count: lectureCount,
      };
    });

    return NextResponse.json({ success: true, courses });
  } catch (error) {
    console.error('Get courses error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch courses' },
      { status: 500 }
    );
  }
}

// POST - Create new course
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!['trainer', 'crm'].includes(user.role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const { index_id, title, description, thumbnail_url } = body;

    if (!index_id || !title?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Index and title are required' },
        { status: 400 }
      );
    }

    const supabase = createServerClient();

    // Verify index ownership
    const { data: index } = await supabase
      .from('indexes')
      .select('id, created_by')
      .eq('id', index_id)
      .single();

    if (!index || index.created_by !== user.id) {
      return NextResponse.json(
        { success: false, error: 'Index not found or not owned' },
        { status: 400 }
      );
    }

    const { data: newCourse, error } = await supabase
      .from('courses')
      .insert({
        index_id,
        title: title.trim(),
        description: description?.trim() || null,
        thumbnail_url: thumbnail_url?.trim() || null,
        created_by: user.id,
      })
      .select()
      .single();

    if (error) throw error;

    await logActivity(user.id, 'created_course', 'course', newCourse.id, {
      title: newCourse.title,
    });

    return NextResponse.json({ success: true, course: newCourse });
  } catch (error) {
    console.error('Create course error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create course' },
      { status: 500 }
    );
  }
}
