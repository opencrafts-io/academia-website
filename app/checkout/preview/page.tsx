import type { Metadata } from "next";
import { CheckoutPage } from "@/components/checkout/checkout-page";

export const metadata: Metadata = {
  title: "Checkout preview | Academia",
  description: "Preview the Academia M-Pesa checkout experience.",
};

export default function CheckoutPreviewRoute() {
  return <CheckoutPage preview />;
}
