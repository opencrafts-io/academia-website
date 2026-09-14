import Image from "next/image";
import Link from "next/link";
import { siteLinks } from "@/lib/site-links";

const footerLinks = {
  Company: [
    { label: "Open Crafts", href: siteLinks.company },
  ],
  Downloads: [
    { label: "For iPhone", href: siteLinks.appStore },
    { label: "For Android", href: siteLinks.playStore },
  ],
  Socials: [
    { label: "GitHub", href: siteLinks.github },
    { label: "Instagram", href: siteLinks.instagram },
    { label: "TikTok", href: siteLinks.tiktok },
  ],
} as const;

export function Footer() {
  return (
    <footer className="bg-secondary">
      <div className="mx-auto max-w-5xl px-6 py-12">
        {/* Brand + navigation */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-4">
          {/* Brand */}
          <Link href="/" className="inline-flex items-center gap-3" aria-label="Academia home">
            <Image
              src="/academia.png"
              alt=""
              width={938}
              height={1064}
              className="h-11 w-11 object-contain"
              priority={false}
            />
            <span className="text-lg font-semibold text-foreground">Academia</span>
          </Link>

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
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                  >
                    {label}
                  </Link>
                ))}
              </nav>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col gap-4 font-medium text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
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
