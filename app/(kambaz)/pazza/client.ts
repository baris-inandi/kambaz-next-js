import { PazzaFolder, PazzaPost, PazzaPostInput, PazzaStats } from "./types";
import { axiosWithCredentials, HTTP_SERVER } from "../api";
const COURSES_API = `${HTTP_SERVER}/api/courses`;

const pazzaApi = (courseId: string) => `${COURSES_API}/${courseId}/pazza`;

export const findFoldersForCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.get<PazzaFolder[]>(
    `${pazzaApi(courseId)}/folders`,
  );
  return data;
};

export const createFolder = async (courseId: string, name: string) => {
  const { data } = await axiosWithCredentials.post<PazzaFolder>(
    `${pazzaApi(courseId)}/folders`,
    { name },
  );
  return data;
};

export const updateFolder = async (
  courseId: string,
  folderId: string,
  name: string,
) => {
  const { data } = await axiosWithCredentials.put<PazzaFolder>(
    `${pazzaApi(courseId)}/folders/${folderId}`,
    { name },
  );
  return data;
};

export const deleteFolders = async (courseId: string, folderIds: string[]) => {
  const { data } = await axiosWithCredentials.delete(
    `${pazzaApi(courseId)}/folders`,
    { data: { folderIds } },
  );
  return data;
};

export const findPostsForCourse = async (
  courseId: string,
  filters: { folder?: string; search?: string } = {},
) => {
  const params = new URLSearchParams();
  if (filters.folder) {
    params.set("folder", filters.folder);
  }
  if (filters.search?.trim()) {
    params.set("search", filters.search.trim());
  }

  const query = params.toString();
  const { data } = await axiosWithCredentials.get<PazzaPost[]>(
    `${pazzaApi(courseId)}/posts${query ? `?${query}` : ""}`,
  );
  return data;
};

export const findPostById = async (courseId: string, postId: string) => {
  const { data } = await axiosWithCredentials.get<PazzaPost>(
    `${pazzaApi(courseId)}/posts/${postId}`,
  );
  return data;
};

export const createPost = async (courseId: string, post: PazzaPostInput) => {
  const { data } = await axiosWithCredentials.post<PazzaPost>(
    `${pazzaApi(courseId)}/posts`,
    post,
  );
  return data;
};

export const updatePost = async (
  courseId: string,
  postId: string,
  post: PazzaPostInput,
) => {
  const { data } = await axiosWithCredentials.put<PazzaPost>(
    `${pazzaApi(courseId)}/posts/${postId}`,
    post,
  );
  return data;
};

export const deletePost = async (courseId: string, postId: string) => {
  const { data } = await axiosWithCredentials.delete(
    `${pazzaApi(courseId)}/posts/${postId}`,
  );
  return data;
};

export const createAnswer = async (
  courseId: string,
  postId: string,
  bodyHtml: string,
) => {
  const { data } = await axiosWithCredentials.post<PazzaPost>(
    `${pazzaApi(courseId)}/posts/${postId}/answers`,
    { bodyHtml },
  );
  return data;
};

export const updateAnswer = async (
  courseId: string,
  postId: string,
  answerId: string,
  bodyHtml: string,
) => {
  const { data } = await axiosWithCredentials.put<PazzaPost>(
    `${pazzaApi(courseId)}/posts/${postId}/answers/${answerId}`,
    { bodyHtml },
  );
  return data;
};

export const deleteAnswer = async (
  courseId: string,
  postId: string,
  answerId: string,
) => {
  const { data } = await axiosWithCredentials.delete<PazzaPost>(
    `${pazzaApi(courseId)}/posts/${postId}/answers/${answerId}`,
  );
  return data;
};

export const createFollowup = async (
  courseId: string,
  postId: string,
  text: string,
) => {
  const { data } = await axiosWithCredentials.post<PazzaPost>(
    `${pazzaApi(courseId)}/posts/${postId}/followups`,
    { text },
  );
  return data;
};

export const updateFollowup = async (
  courseId: string,
  postId: string,
  followupId: string,
  updates: { text?: string; resolved?: boolean },
) => {
  const { data } = await axiosWithCredentials.put<PazzaPost>(
    `${pazzaApi(courseId)}/posts/${postId}/followups/${followupId}`,
    updates,
  );
  return data;
};

export const deleteFollowup = async (
  courseId: string,
  postId: string,
  followupId: string,
) => {
  const { data } = await axiosWithCredentials.delete<PazzaPost>(
    `${pazzaApi(courseId)}/posts/${postId}/followups/${followupId}`,
  );
  return data;
};

export const createReply = async (
  courseId: string,
  postId: string,
  parentId: string,
  text: string,
) => {
  const { data } = await axiosWithCredentials.post<PazzaPost>(
    `${pazzaApi(courseId)}/posts/${postId}/followups/${parentId}/replies`,
    { text },
  );
  return data;
};

export const updateReply = async (
  courseId: string,
  postId: string,
  replyId: string,
  text: string,
) => {
  const { data } = await axiosWithCredentials.put<PazzaPost>(
    `${pazzaApi(courseId)}/posts/${postId}/replies/${replyId}`,
    { text },
  );
  return data;
};

export const deleteReply = async (
  courseId: string,
  postId: string,
  replyId: string,
) => {
  const { data } = await axiosWithCredentials.delete<PazzaPost>(
    `${pazzaApi(courseId)}/posts/${postId}/replies/${replyId}`,
  );
  return data;
};

export const findStatsForCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.get<PazzaStats>(
    `${pazzaApi(courseId)}/stats`,
  );
  return data;
};
