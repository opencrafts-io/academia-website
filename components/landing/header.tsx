"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "react-aria-components";

const menuItems = [
  { label: "Features", href: "#PLACEHOLDER_FEATURES" },
  { label: "Downloads", href: "#PLACEHOLDER_DOWNLOADS" },
  { label: "Checkout", href: "/checkout" },
  { label: "FAQ", href: "#faq" },
  { label: "Company", href: "https://opencrafts.io/" },
] as const;

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center px-4 sm:px-6">
          {/* Logo */}
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2"
            aria-label="Academia home"
          >
            <Image
              src="/academia.png"
              alt=""
              width={938}
              height={1064}
              className="h-9 w-9 object-contain"
              priority
            />

            <span className="text-2xl font-extrabold text-foreground">Academia</span>
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
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {label}
              </Link>
            ))}

            <Button className="ml-2 rounded-lg bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
              Download App
            </Button>
          </nav>

          {/* Mobile menu button */}
          <Button
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            onPress={() => setIsMenuOpen((open) => !open)}
            className="ml-auto flex h-10 w-10 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:hidden"
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
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="border-b border-border bg-background px-4 py-5 shadow-sm sm:hidden">
          <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
            {menuItems.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setIsMenuOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                {label}
              </Link>
            ))}

            <Button
              className="mt-3 w-full rounded-lg bg-primary px-4 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
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
        className="pointer-events-none absolute inset-x-0 top-full h-8 bg-gradient-to-b from-background/60 to-transparent blur-md"
      />
    </header>
  );
}
