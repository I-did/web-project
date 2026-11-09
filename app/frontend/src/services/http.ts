const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8055';

export class ApiError extends Error {
  public status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

// RequestInit — тип TypeScript для параметров запроса fetch.
// eslint-disable-next-line no-undef
export async function request<T>(
  path: string,
  // eslint-disable-next-line no-undef
  options: RequestInit = {},
  token?: string
): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      Accept: 'application/json',
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  let payload: unknown;

  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  if (!response.ok) {
    const error = payload as {
      errors?: Array<{ message?: string }>;
    } | null;

    throw new ApiError(error?.errors?.[0]?.message || `Ошибка сервера (${response.status})`, response.status);
  }

  return payload as T;
}

export function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'Не удалось выполнить запрос. Попробуйте ещё раз.';
}
