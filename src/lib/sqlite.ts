export interface WishRecord {
  id: number;
  sender_name: string;
  relationship: string;
  message: string;
  hearts: number;
  created_at: string;
}

export interface GiftRecord {
  id: number;
  sender_name: string;
  bank: 'ABA' | 'ACLEDA';
  amount?: number;
  currency: 'USD' | 'KHR';
  wish_message: string;
  created_at: string;
}

export interface AdminDatabaseExport {
  gifts: GiftRecord[];
  wishes: WishRecord[];
}

export class ApiError extends Error {
  constructor(message: string, readonly status: number) {
    super(message);
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(path, {
    ...init,
    credentials: 'same-origin',
    headers: {
      ...(init?.body ? { 'Content-Type': 'application/json' } : {}),
      ...init?.headers,
    },
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null) as { error?: string } | null;
    throw new ApiError(body?.error || `Request failed (${response.status})`, response.status);
  }

  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}

export async function getWishes(): Promise<WishRecord[]> {
  return request('/api/wishes');
}

export async function addWish(params: {
  sender_name: string;
  relationship: string;
  message: string;
}): Promise<boolean> {
  await request('/api/wishes', { method: 'POST', body: JSON.stringify(params) });
  return true;
}

export async function incrementWishHearts(id: number): Promise<number> {
  const result = await request<{ hearts: number }>(`/api/wishes/${id}/heart`, { method: 'POST' });
  return result.hearts;
}

export async function addGift(params: {
  sender_name: string;
  bank: 'ABA' | 'ACLEDA';
  amount?: number;
  currency: 'USD' | 'KHR';
  wish_message?: string;
}): Promise<boolean> {
  await request('/api/gifts', { method: 'POST', body: JSON.stringify(params) });
  return true;
}

export async function loginAdmin(pin: string): Promise<void> {
  await request('/api/admin/login', { method: 'POST', body: JSON.stringify({ pin }) });
}

export async function logoutAdmin(): Promise<void> {
  await request('/api/admin/logout', { method: 'POST' });
}

export async function getAdminDatabase(): Promise<AdminDatabaseExport> {
  return request('/api/admin/data');
}

export async function exportAdminDatabase(): Promise<AdminDatabaseExport> {
  return request('/api/admin/export');
}

export async function importLegacyDatabase(data: AdminDatabaseExport): Promise<void> {
  await request('/api/admin/import', { method: 'POST', body: JSON.stringify(data) });
}

export async function deleteAdminRecord(type: 'gifts' | 'wishes', id: number): Promise<void> {
  await request(`/api/admin/${type}/${id}`, { method: 'DELETE' });
}

export async function deleteAllAdminData(): Promise<{ gifts: number; wishes: number }> {
  const result = await request<{ deleted: { gifts: number; wishes: number } }>('/api/admin/data', {
    method: 'DELETE',
  });
  return result.deleted;
}
