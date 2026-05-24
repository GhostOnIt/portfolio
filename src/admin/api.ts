export type ResourceKey = 'blog' | 'caseStudies' | 'projects' | 'skills';

const JSON_HEADERS = { 'Content-Type': 'application/json' };
const CREDS: RequestCredentials = 'same-origin';

async function handle(res: Response) {
  if (!res.ok) {
    let msg = res.statusText;
    try {
      const j = await res.json();
      if (j?.error) msg = j.error;
    } catch {
      /* non-JSON body */
    }
    const err = new Error(msg) as Error & { status?: number };
    err.status = res.status;
    throw err;
  }
  return res.json();
}

export const authApi = {
  async me(): Promise<{ authenticated: boolean; email?: string }> {
    const res = await fetch('/api/admin/auth', { credentials: CREDS });
    if (res.status === 401) return { authenticated: false };
    return handle(res);
  },
  login(email: string, password: string) {
    return fetch('/api/admin/auth', {
      method: 'POST',
      headers: JSON_HEADERS,
      credentials: CREDS,
      body: JSON.stringify({ email, password }),
    }).then(handle);
  },
  logout() {
    return fetch('/api/admin/auth', { method: 'DELETE', credentials: CREDS }).then(handle);
  },
};

export const contentApi = {
  list(resource: ResourceKey): Promise<any[]> {
    return fetch(`/api/admin/content?resource=${resource}`, { credentials: CREDS }).then(handle);
  },
  get(resource: ResourceKey, id: number): Promise<any> {
    return fetch(`/api/admin/content?resource=${resource}&id=${id}`, { credentials: CREDS }).then(handle);
  },
  create(resource: ResourceKey, data: Record<string, any>): Promise<any> {
    return fetch(`/api/admin/content?resource=${resource}`, {
      method: 'POST',
      headers: JSON_HEADERS,
      credentials: CREDS,
      body: JSON.stringify(data),
    }).then(handle);
  },
  update(resource: ResourceKey, id: number, data: Record<string, any>): Promise<any> {
    return fetch(`/api/admin/content?resource=${resource}&id=${id}`, {
      method: 'PUT',
      headers: JSON_HEADERS,
      credentials: CREDS,
      body: JSON.stringify(data),
    }).then(handle);
  },
  remove(resource: ResourceKey, id: number): Promise<{ deleted: number }> {
    return fetch(`/api/admin/content?resource=${resource}&id=${id}`, {
      method: 'DELETE',
      credentials: CREDS,
    }).then(handle);
  },
};
