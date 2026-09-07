import Image from "next/image";
import { Link } from "@heroui/react";

const footerLinks = {
  Company: [
    { label: "Support Us", href: "/support" },
    { label: "Affiliates", href: "/affiliates" },
  ],
  Downloads: [
    { label: "For iPhone", href: "/downloads/ios" },
    { label: "For Android", href: "/downloads/android" },
    { label: "For Mac (Soon)", href: "#" },
    { label: "For Windows (Soon)", href: "#" },
  ],
  Socials: [
    { label: "Github", href: "https://github.com/opencrafts-io" },
    { label: "LinkedIn", href: "#" },
    { label: "Instagram", href: "#" },
    { label: "Twitter/X", href: "#" },
  ],
} as const;

export function Footer() {
  return (
    <footer className="bg-content2">
      <div className="mx-auto max-w-5xl px-6 py-12">
        {/* Brand + navigation */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-4">
          {/* Brand */}
          <div>
            <Image
              src="/logo.png"
              alt="Academia"
              width={100}
              height={32}
              className="h-auto w-auto"
              priority={false}
            />
          </div>

          {/* Link groups */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <p className="text-sm font-medium">{title}</p>

              <nav
                aria-label={`${title} links`}
                className="mt-4 flex flex-col items-start gap-2"
              >
                {links.map(({ label, href }) => (
                  <Link
                    key={label}
                    href={href}
                    // size="sm"
                    // color="foreground"
                    // underline="hover"
                  >
                    {label}
                  </Link>
                ))}
              </nav>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col gap-4 font-medium text-default-500 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; 2025 Academia. All rights reserved.</p>

          <p>
            Made with <span aria-label="love">❤️‍🔥</span> by Open Crafts
            Interactive.
          </p>
        </div>
      </div>
    </footer>
  );
}
