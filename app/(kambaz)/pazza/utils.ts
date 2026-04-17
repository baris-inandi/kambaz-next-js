import { PazzaPost } from "./types";

const startOfDay = (value: Date) =>
  new Date(value.getFullYear(), value.getMonth(), value.getDate());

const daysBetween = (left: Date, right: Date) =>
  Math.floor(
    (startOfDay(left).getTime() - startOfDay(right).getTime()) / 86400000,
  );

const formatRange = (start: Date, end: Date) =>
  `${start.getMonth() + 1}/${start.getDate()} - ${end.getMonth() + 1}/${end.getDate()}`;

const startOfWeek = (value: Date) => {
  const date = new Date(value);
  const day = date.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  date.setDate(date.getDate() + diff);
  return startOfDay(date);
};

export const stripHtml = (value: string) =>
  value
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

export const formatPostTime = (value: string) =>
  new Date(value).toLocaleString([], {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

export const groupPostsByDate = (posts: PazzaPost[]) => {
  const today = new Date();
  const groups = new Map<string, PazzaPost[]>();

  posts.forEach((post) => {
    const created = new Date(post.createdAt);
    const age = daysBetween(today, created);
    let key = "";

    if (age === 0) {
      key = "Today";
    } else if (age === 1) {
      key = "Yesterday";
    } else if (age <= 7) {
      key = "Last Week";
    } else {
      const weekStart = startOfWeek(created);
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekEnd.getDate() + 6);
      key = formatRange(weekStart, weekEnd);
    }

    groups.set(key, [...(groups.get(key) ?? []), post]);
  });

  const priority = new Map([
    ["Today", 0],
    ["Yesterday", 1],
    ["Last Week", 2],
  ]);

  return Array.from(groups.entries()).sort(([left], [right]) => {
    const leftPriority = priority.get(left);
    const rightPriority = priority.get(right);
    if (leftPriority !== undefined || rightPriority !== undefined) {
      return (leftPriority ?? 99) - (rightPriority ?? 99);
    }
    return right.localeCompare(left);
  });
};
