import { request } from './http';

interface AuthResponse {
  data: { access_token: string; refresh_token: string; expires: number };
}
export const authApi = {
  login: (email: string, password: string) =>
    request<AuthResponse>('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  acceptInvite: (token: string, password: string) =>
    request<unknown>('/users/invite/accept', { method: 'POST', body: JSON.stringify({ token, password }) }),
};
