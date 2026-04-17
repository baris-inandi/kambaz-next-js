"use client";

export type PazzaPostType = "QUESTION" | "NOTE";
export type PazzaAudience = "CLASS" | "INDIVIDUALS";

export interface PazzaFolder {
  _id: string;
  name: string;
}

export interface PazzaAnswer {
  _id: string;
  author: string;
  bodyHtml: string;
  createdAt: string;
  updatedAt: string;
}

export interface PazzaReply {
  _id: string;
  author: string;
  text: string;
  createdAt: string;
  updatedAt: string;
  replies: PazzaReply[];
}

export interface PazzaFollowup {
  _id: string;
  author: string;
  text: string;
  resolved: boolean;
  createdAt: string;
  updatedAt: string;
  replies: PazzaReply[];
}

export interface PazzaPost {
  _id: string;
  course: string;
  type: PazzaPostType;
  summary: string;
  detailsHtml: string;
  folderIds: string[];
  author: string;
  audience: PazzaAudience;
  visibleToUsers: string[];
  includeInstructors: boolean;
  viewedBy: string[];
  studentAnswers: PazzaAnswer[];
  instructorAnswers: PazzaAnswer[];
  followups: PazzaFollowup[];
  createdAt: string;
  updatedAt: string;
}

export interface PazzaStats {
  unreadCount: number;
  unansweredCount: number;
  totalPosts: number;
  instructorResponses: number;
  studentResponses: number;
  studentsEnrolled: number;
}

export interface PazzaPostInput {
  type: PazzaPostType;
  summary: string;
  detailsHtml: string;
  folderIds: string[];
  audience: PazzaAudience;
  visibleToUsers: string[];
  includeInstructors: boolean;
}
