import type { Metadata } from "next";
import { CheckoutPage } from "@/components/checkout/checkout-page";

export const metadata: Metadata = {
  title: "Checkout | Academia",
  description: "Complete your Academia payment securely with M-Pesa.",
};

type CheckoutRouteProps = {
  searchParams: Promise<{ code?: string }>;
};

export default async function CheckoutRoute({ searchParams }: CheckoutRouteProps) {
  const { code } = await searchParams;
  return <CheckoutPage code={code} />;
}
