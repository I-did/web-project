import { request } from './http';
export interface Order {
  invoice_id: string;
  amount: number;
}
function unwrap<T>(value: T | { data: T }): T {
  return value && typeof value === 'object' && 'data' in value ? value.data : (value as T);
}
export const ordersApi = {
  create: async (full_name: string, email: string): Promise<Order> =>
    unwrap(
      await request<Order | { data: Order }>('/custom/orders/create', {
        method: 'POST',
        body: JSON.stringify({ full_name, email }),
      })
    ),
  verify: async (invoiceId: string) =>
    unwrap(
      await request<{ status: string } | { data: { status: string } }>(
        `/custom/orders/${encodeURIComponent(invoiceId)}/verify`,
        { method: 'POST' }
      )
    ),
};
