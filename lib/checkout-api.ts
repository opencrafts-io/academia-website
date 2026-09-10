const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_URL ?? "https://qaverisafe.opencrafts.io";

type ApiError = {
  message?: string;
  error?: string;
};

export type CheckoutToken = {
  access_token: string;
  expires_at: string;
  order_id: string;
  token_type: string;
};

export type CheckoutOrder = {
  id: string;
  currency: string;
  discount: number;
  expires_at?: string;
  paid_at?: string;
  status: string;
  subtotal: number;
  tax: number;
  total: number;
};

export type CheckoutOrderItem = {
  id: string;
  plan_id?: number;
  quantity: number;
  unit_price: number;
  discount: number;
  tax: number;
};

export type ChargeAttempt = {
  id: string;
  amount: number;
  order_id: string;
  payer_phone_number: string;
  requested_at: string;
  status: string;
};

function endpoint(path: string) {
  return `${apiBaseUrl.replace(/\/$/, "")}${path}`;
}

async function request<T>(path: string, init?: RequestInit) {
  const response = await fetch(endpoint(path), {
    ...init,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });

  if (!response.ok) {
    let error: ApiError = {};
    try {
      error = (await response.json()) as ApiError;
    } catch {
      // Keep the HTTP status as the fallback when the API has no JSON body.
    }
    throw new Error(
      error.message ?? error.error ?? `Request failed with status ${response.status}`,
    );
  }

  if (response.status === 204) return undefined as T;
  return (await response.json()) as T;
}

export function exchangeCheckoutCode(code: string) {
  return request<CheckoutToken>("/checkout-sessions/exchange", {
    method: "POST",
    body: JSON.stringify({ code }),
  });
}

export function getCheckoutOrder(orderId: string, token: CheckoutToken) {
  return request<CheckoutOrder>(`/checkout/orders/${encodeURIComponent(orderId)}`, {
    headers: {
      Authorization: `${token.token_type || "Bearer"} ${token.access_token}`,
    },
  });
}

export function getCheckoutItems(orderId: string, token: CheckoutToken) {
  return request<CheckoutOrderItem[]>(
    `/checkout/orders/${encodeURIComponent(orderId)}/items`,
    {
      headers: {
        Authorization: `${token.token_type || "Bearer"} ${token.access_token}`,
      },
    },
  );
}

export function chargeCheckoutOrder(
  orderId: string,
  phoneNumber: string,
  token: CheckoutToken,
) {
  return request<ChargeAttempt>(
    `/checkout/orders/${encodeURIComponent(orderId)}/charge`,
    {
      method: "POST",
      headers: {
        Authorization: `${token.token_type || "Bearer"} ${token.access_token}`,
      },
      body: JSON.stringify({
        order_id: orderId,
        payer_phone_number: phoneNumber,
      }),
    },
  );
}
