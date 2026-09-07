"use client";

import { Button } from "@heroui/react";
import Link from "next/link";
import { useState } from "react";

const menuItems = [
  { label: "Features", href: "#PLACEHOLDER_FEATURES" },
  { label: "Downloads", href: "#PLACEHOLDER_DOWNLOADS" },
  { label: "Billing", href: "#faq" },
  { label: "FAQ", href: "#faq" },
  { label: "Company", href: "https://opencrafts.io/" },
] as const;

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-white/30 backdrop-blur-sm">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center px-4 sm:px-6">
          {/* Logo */}
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2"
            aria-label="Academia home"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500">
              <span className="text-sm font-bold text-white">A</span>
            </div>

            <span className="text-2xl font-extrabold text-gray-900">
              Academia
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav
            aria-label="Main navigation"
            className="ml-auto hidden items-center gap-7 sm:flex"
          >
            {menuItems.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
              >
                {label}
              </Link>
            ))}

            <Button size="sm" className="ml-2 px-5">
              Download App
            </Button>
          </nav>

          {/* Mobile menu button */}
          <button
            type="button"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
            className="ml-auto flex h-10 w-10 items-center justify-center rounded-lg text-gray-700 transition-colors hover:bg-gray-100 sm:hidden"
          >
            <span className="sr-only">
              {isMenuOpen ? "Close menu" : "Open menu"}
            </span>

            <div className="flex w-5 flex-col gap-1.5">
              <span
                className={`h-0.5 w-full bg-current transition-transform ${
                  isMenuOpen ? "translate-y-2 rotate-45" : ""
                }`}
              />
              <span
                className={`h-0.5 w-full bg-current transition-opacity ${
                  isMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`h-0.5 w-full bg-current transition-transform ${
                  isMenuOpen ? "-translate-y-2 -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="border-b border-gray-200 bg-white px-4 py-5 shadow-sm sm:hidden">
          <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
            {menuItems.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setIsMenuOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                {label}
              </Link>
            ))}

            <Button
              className="mt-3 w-full"
              onPress={() => setIsMenuOpen(false)}
            >
              Download App
            </Button>
          </nav>
        </div>
      )}

      {/* Blur/fade below header */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-full h-8 bg-gradient-to-b from-white/60 to-transparent blur-md"
      />
    </header>
  );
}
