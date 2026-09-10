"use client";

import Link from "next/link";
import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowLeft01Icon,
  CheckmarkCircle02Icon,
  InformationCircleIcon,
  LockKeyholeIcon,
  SmartPhone01Icon,
} from "@hugeicons/core-free-icons";
import { Card, CardContent } from "@/components/ui/card";
import {
  Button,
  Input,
  Label,
  Text,
  TextField,
  Tooltip,
  TooltipTrigger,
} from "react-aria-components";
import {
  chargeCheckoutOrder,
  exchangeCheckoutCode,
  getCheckoutItems,
  getCheckoutOrder,
  type ChargeAttempt,
  type CheckoutOrder,
  type CheckoutOrderItem,
  type CheckoutToken,
} from "@/lib/checkout-api";

type CheckoutPageProps = {
  code?: string;
  preview?: boolean;
};

type CheckoutState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | {
      status: "ready";
      token: CheckoutToken;
      order: CheckoutOrder;
      items: CheckoutOrderItem[];
    }
  | {
      status: "pending";
      token: CheckoutToken;
      order: CheckoutOrder;
      items: CheckoutOrderItem[];
      attempt: ChargeAttempt;
    }
  | {
      status: "paid";
      order: CheckoutOrder;
      items: CheckoutOrderItem[];
    };

function formatAmount(amount: number, currency: string) {
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: currency || "KES",
    maximumFractionDigits: currency === "KES" ? 0 : 2,
  }).format(amount);
}

function formatPhone(phone: string) {
  return phone.replace(/(\d{3})(\d{3})(\d{3})/, "$1 $2 $3");
}

const previewToken: CheckoutToken = {
  access_token: "preview-token",
  expires_at: "2099-01-01T00:00:00Z",
  order_id: "ORD-PREVIEW",
  token_type: "Bearer",
};

const previewOrder: CheckoutOrder = {
  id: "ORD-PREVIEW",
  currency: "KES",
  discount: 0,
  status: "pending",
  subtotal: 350,
  tax: 0,
  total: 350,
};

const previewItems: CheckoutOrderItem[] = [
  {
    id: "ITEM-PREVIEW",
    plan_id: 1,
    quantity: 1,
    unit_price: 350,
    discount: 0,
    tax: 0,
  },
];

export function CheckoutPage({ code, preview = false }: CheckoutPageProps) {
  const [checkout, setCheckout] = useState<CheckoutState>(() => {
    if (preview) {
      return {
        status: "ready",
        token: previewToken,
        order: previewOrder,
        items: previewItems,
      };
    }

    return code
      ? { status: "loading" }
      : {
          status: "error",
          message: "This checkout link is missing its secure handoff code.",
        };
  });
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isCharging, setIsCharging] = useState(false);

  useEffect(() => {
    if (preview || !code) return;

    const checkoutCode = code;
    let cancelled = false;

    async function loadCheckout() {
      try {
        const token = await exchangeCheckoutCode(checkoutCode);
        const [order, items] = await Promise.all([
          getCheckoutOrder(token.order_id, token),
          getCheckoutItems(token.order_id, token),
        ]);

        if (cancelled) return;

        setCheckout(
          order.status === "paid"
            ? { status: "paid", order, items }
            : { status: "ready", token, order, items },
        );
      } catch {
        if (cancelled) return;
        setCheckout({
          status: "error",
          message: "This checkout link is invalid or has expired.",
        });
      }
    }

    void loadCheckout();
    return () => {
      cancelled = true;
    };
  }, [code, preview]);

  useEffect(() => {
    if (preview || checkout.status !== "pending") return;

    const interval = window.setInterval(async () => {
      try {
        const order = await getCheckoutOrder(checkout.order.id, checkout.token);
        if (order.status === "paid") {
          setCheckout({ status: "paid", order, items: checkout.items });
        }
      } catch {
        // Keep the pending state visible while the payment provider resolves.
      }
    }, 4000);

    return () => window.clearInterval(interval);
  }, [checkout, preview]);

  const order = checkout.status === "error" || checkout.status === "loading" ? null : checkout.order;
  const items = checkout.status === "error" || checkout.status === "loading" ? [] : checkout.items;
  const itemLabel =
    items.length === 1 && items[0].plan_id
      ? "Academia access"
      : items.length > 1
        ? `${items.length} Academia items`
        : "Academia access";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (checkout.status !== "ready" || !phoneNumber.trim()) return;

    if (preview) {
      setCheckout({
        ...checkout,
        status: "pending",
        attempt: {
          id: "ATTEMPT-PREVIEW",
          amount: checkout.order.total,
          order_id: checkout.order.id,
          payer_phone_number: phoneNumber.trim(),
          requested_at: new Date().toISOString(),
          status: "pending",
        },
      });
      return;
    }

    setIsCharging(true);
    try {
      const attempt = await chargeCheckoutOrder(
        checkout.order.id,
        phoneNumber.trim(),
        checkout.token,
      );
      setCheckout({ ...checkout, status: "pending", attempt });
    } catch {
      setCheckout({
        status: "error",
        message: "We could not start the M-Pesa request. Please try again.",
      });
    } finally {
      setIsCharging(false);
    }
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-card/90 backdrop-blur-xl">
        <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-5">
          <Link href="/" className="flex items-center gap-2" aria-label="Academia home">
            <span className="flex size-6 items-center justify-center rounded-md bg-primary text-[10px] font-semibold text-primary-foreground">
              A
            </span>
            <span className="text-sm font-semibold tracking-tight">Academia</span>
          </Link>
          <span className="text-xs text-muted-foreground">{preview ? "Preview" : "Checkout"}</span>
        </div>
      </header>

      <div className="mx-auto w-full max-w-5xl px-5 pb-14 pt-8 sm:pt-12">
        {checkout.status === "loading" ? <LoadingState /> : null}
        {checkout.status === "error" ? <ErrorState message={checkout.message} /> : null}

        {order ? (
          <Card className="grid min-h-[560px] grid-cols-1 overflow-hidden rounded-2xl border border-border bg-card py-0 shadow-sm ring-0 md:grid-cols-2">
            <CardContent className="p-0">
              <section className="flex h-full flex-col bg-muted px-6 py-8 sm:px-12 sm:py-10" aria-labelledby="summary-title">
                <Link
                  href="/"
                  className="mb-8 inline-flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                  aria-label="Return to Academia"
                >
                  <HugeiconsIcon icon={ArrowLeft01Icon} size={16} aria-hidden="true" />
                </Link>

                <h1 id="summary-title" className="text-lg font-semibold tracking-tight">
                  Billing summary
                </h1>
                <p className="mt-5 text-sm text-muted-foreground">{itemLabel}</p>
                <p className="mt-1 text-3xl font-medium tracking-tight">
                  {formatAmount(order.total, order.currency)}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">One-time payment</p>

                <div className="mt-7 space-y-3 border-t border-border pt-4 text-sm">
                  <SummaryRow label="Subtotal" value={formatAmount(order.subtotal, order.currency)} />
                  {order.discount > 0 ? (
                    <SummaryRow
                      label="Discount"
                      value={`−${formatAmount(order.discount, order.currency)}`}
                    />
                  ) : null}
                  {order.tax > 0 ? (
                    <SummaryRow label="Tax" value={formatAmount(order.tax, order.currency)} />
                  ) : null}
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-border pt-4 text-sm font-medium">
                  <span>Total due today</span>
                  <span>{formatAmount(order.total, order.currency)}</span>
                </div>

                <p className="mt-auto pt-8 font-mono text-[11px] text-muted-foreground">
                  Order {order.id}
                </p>
              </section>
            </CardContent>

            <CardContent className="p-0">
              <section className="flex h-full flex-col justify-center px-6 py-8 sm:px-12 sm:py-10" aria-labelledby="payment-title">
                <h2 id="payment-title" className="text-lg font-semibold tracking-tight">
                  Payment details
                </h2>

                <div className="mt-7">
                  <div className="flex items-center gap-1.5">
                    <p className="text-sm font-medium">Payment method</p>
                    <TooltipTrigger>
                      <Button
                        aria-label="M-Pesa availability"
                        className="flex size-5 items-center justify-center rounded-full text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50"
                      >
                        <HugeiconsIcon icon={InformationCircleIcon} size={15} aria-hidden="true" />
                      </Button>
                      <Tooltip
                        placement="top"
                        className="max-w-60 rounded-md bg-popover px-3 py-2 text-xs leading-5 text-popover-foreground shadow-lg"
                      >
                        M-Pesa STK Push is currently available only in Kenya.
                      </Tooltip>
                    </TooltipTrigger>
                  </div>
                  <div className="mt-3 flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3">
                    <Image
                      src="/M-PESA_LOGO.png"
                      alt="M-Pesa"
                      width={960}
                      height={512}
                      className="h-8 w-16 shrink-0 object-contain"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium">M-Pesa</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">STK Push</p>
                    </div>
                    <span className="text-xs text-muted-foreground">Selected</span>
                  </div>
                </div>

                <div className="mt-7">
                  {checkout.status === "paid" ? (
                    <PaidState />
                  ) : checkout.status === "pending" ? (
                    <PendingState phoneNumber={checkout.attempt.payer_phone_number} />
                  ) : (
                    <form className="space-y-5" onSubmit={handleSubmit}>
                      <TextField
                        className="space-y-2"
                        name="phone-number"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        isRequired
                        value={phoneNumber}
                        onChange={setPhoneNumber}
                      >
                        <Label className="text-sm font-medium">M-Pesa phone number</Label>
                        <div className="flex h-12 items-center rounded-lg border border-input bg-background px-3 transition-colors focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/20">
                          <span className="border-r border-border pr-3 text-sm text-muted-foreground">+254</span>
                          <Input
                            placeholder="712 345 678"
                            className="h-full min-w-0 flex-1 bg-transparent px-3 text-sm outline-none placeholder:text-muted-foreground/70"
                          />
                        </div>
                        <Text slot="description" className="block text-xs leading-5 text-muted-foreground">
                          We will send a payment prompt to this number.
                        </Text>
                      </TextField>

                      <Button
                        type="submit"
                        isPending={isCharging}
                        isDisabled={order.total <= 0}
                        className="h-12 w-full rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground outline-none transition-colors hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 disabled:opacity-50"
                      >
                        {isCharging ? "Sending prompt..." : `Pay ${formatAmount(order.total, order.currency)}`}
                      </Button>
                    </form>
                  )}
                </div>

                <div className="mt-7 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <HugeiconsIcon icon={LockKeyholeIcon} size={13} aria-hidden="true" />
                  <span>Secure one-time checkout</span>
                </div>
              </section>
            </CardContent>
          </Card>
        ) : null}

      </div>
    </main>
  );
}

function LoadingState() {
  return (
    <div className="grid min-h-[560px] overflow-hidden rounded-2xl border border-border bg-card md:grid-cols-2" aria-label="Loading checkout">
      <div className="bg-muted p-8 sm:p-12">
        <div className="h-5 w-32 animate-pulse rounded bg-secondary" />
        <div className="mt-8 h-9 w-40 animate-pulse rounded bg-secondary" />
        <div className="mt-4 h-4 w-28 animate-pulse rounded bg-secondary" />
      </div>
      <div className="p-8 sm:p-12">
        <div className="h-5 w-36 animate-pulse rounded bg-secondary" />
        <div className="mt-8 h-14 animate-pulse rounded-lg bg-muted" />
        <div className="mt-7 h-12 animate-pulse rounded-lg bg-muted" />
        <div className="mt-4 h-12 animate-pulse rounded-lg bg-muted" />
      </div>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 text-muted-foreground">
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}

function ErrorState({ message }: { message: string }) {
  return (
    <Card className="rounded-2xl border-border bg-card shadow-none ring-0">
      <CardContent className="px-5 py-7 text-center">
        <p className="text-base font-semibold">Checkout unavailable</p>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">{message}</p>
        <p className="mt-4 text-sm leading-6 text-muted-foreground">
          Start checkout again from the Academia app to receive a fresh link.
        </p>
      </CardContent>
    </Card>
  );
}

function PendingState({ phoneNumber }: { phoneNumber: string }) {
  return (
    <div className="text-center" aria-live="polite">
      <div className="mx-auto flex size-11 items-center justify-center rounded-full bg-primary text-primary-foreground">
        <HugeiconsIcon icon={SmartPhone01Icon} size={20} aria-hidden="true" />
      </div>
      <p className="mt-4 text-base font-semibold">Check your phone</p>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        Approve the M-Pesa prompt sent to {formatPhone(phoneNumber)}.
      </p>
      <p className="mt-4 text-xs text-muted-foreground">Waiting for confirmation...</p>
    </div>
  );
}

function PaidState() {
  return (
    <div className="text-center" aria-live="polite">
      <div className="mx-auto flex size-11 items-center justify-center rounded-full bg-primary text-primary-foreground">
        <HugeiconsIcon icon={CheckmarkCircle02Icon} size={20} aria-hidden="true" />
      </div>
      <p className="mt-4 text-base font-semibold">Payment confirmed</p>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        Your Academia access is now active.
      </p>
    </div>
  );
}
