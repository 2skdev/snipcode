import { CreatePostRequest } from "@/types/request";
import { Prisma, User, Post } from "@prisma/client";

const request = async <T>(url: string, config: RequestInit): Promise<T> => {
  const res = await fetch(url, config);

  if (!res.ok) throw new Error(res.statusText);
  return res.json().catch(() => {});
};

const api = {
  get: async <T>(url: string, config?: RequestInit): Promise<T> => {
    return await request<T>(url, { ...config, method: "GET" });
  },

  post: async <T, U>(
    url: string,
    body: T,
    config?: RequestInit
  ): Promise<U> => {
    return await request<U>(url, {
      ...config,
      method: "POST",
      body: JSON.stringify(body),
    });
  },

  put: async <T, U>(url: string, body: T, config?: RequestInit): Promise<U> => {
    return await request<U>(url, {
      ...config,
      method: "PUT",
      body: JSON.stringify(body),
    });
  },

  delete: async <T>(url: string, config?: RequestInit): Promise<T> => {
    return await request<T>(url, { ...config, method: "DELETE" });
  },
};

export async function getMe() {
  return await api.get<User>("/api/v1/me");
}

export async function createMe(user: Prisma.UserCreateInput) {
  return await api.post<Prisma.UserCreateInput, User>("/api/v1/me", user);
}

export async function getPost(id: string) {
  return await api.get<Post>(`/api/v1/posts/${id}`);
}

export async function createPost(post: CreatePostRequest) {
  return await api.post<CreatePostRequest, Post>("/api/v1/posts", post);
}
