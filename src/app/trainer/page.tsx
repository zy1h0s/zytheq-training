"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/layout/header";
import { StatsCard } from "@/components/ui/stats-card";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import {
  Users,
  FolderOpen,
  BookOpen,
  PlayCircle,
  ClipboardList,
} from "lucide-react";
import { formatDuration, getRelativeTime } from "@/lib/utils";

interface CandidateProgress {
  id: string;
  username: string;
  full_name: string;
  is_active: boolean;
  total_courses_assigned: number;
  lectures_completed: number;
  total_time_spent: number;
  last_active: string | null;
}

interface DashboardData {
  total_candidates: number;
  total_indexes: number;
  total_courses: number;
  total_lectures: number;
  total_assignments: number;
  avg_completion_rate: number;
  candidates: CandidateProgress[];
}

export default function TrainerDashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await fetch("/api/dashboard/trainer");
      const json = await res.json();
      if (json.success) {
        setData(json.metrics);
      }
    } catch (error) {
      console.error("Failed to fetch dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 bg-rule/50 rounded skeleton mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-32 bg-rule/50 rounded-none skeleton" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-10">
        <h1 className="font-serif font-light text-[46px] leading-[1] tracking-[-0.03em] text-ink mb-2">
          Trainer Dashboard
        </h1>
        <p className="font-serif italic text-ink-soft text-[18px]">
          Overview of candidates and content
        </p>
      </div>

      <div className="space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <StatsCard
            title="Candidates"
            value={(data?.total_candidates || 0).toString()}
            icon={Users}
          />
          <StatsCard
            title="Indexes"
            value={(data?.total_indexes || 0).toString()}
            icon={FolderOpen}
          />
          <StatsCard
            title="Courses"
            value={(data?.total_courses || 0).toString()}
            icon={BookOpen}
          />
          <StatsCard
            title="Lectures"
            value={(data?.total_lectures || 0).toString()}
            icon={PlayCircle}
          />
          <StatsCard
            title="Assignments"
            value={(data?.total_assignments || 0).toString()}
            icon={ClipboardList}
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Candidate Progress</CardTitle>
            <CardDescription>Track your candidates' learning progress</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Candidate</TableHead>
                  <TableHead>Courses</TableHead>
                  <TableHead>Lectures Completed</TableHead>
                  <TableHead>Time Spent</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.candidates?.map((candidate) => (
                  <TableRow key={candidate.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar name={candidate.full_name} size="sm" />
                        <div>
                          <p className="font-medium text-ink">{candidate.full_name}</p>
                          <p className="text-xs text-ink-mute">@{candidate.username}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{candidate.total_courses_assigned}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span>{candidate.lectures_completed}</span>
                      </div>
                    </TableCell>
                    <TableCell>{formatDuration(candidate.total_time_spent)}</TableCell>
                    <TableCell className="text-ink-mute">
                      {candidate.last_active ? getRelativeTime(candidate.last_active) : "Never"}
                    </TableCell>
                    <TableCell>
                      <Badge variant={candidate.is_active ? "default" : "secondary"}>
                        {candidate.is_active ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
                {(!data?.candidates || data.candidates.length === 0) && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-ink-mute py-8">
                      No candidates yet. Create candidates to get started.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
