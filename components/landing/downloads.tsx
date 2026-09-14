import Link from "next/link";
import { siteLinks } from "@/lib/site-links";

export function Downloads() {
  return (
    <section
      id="downloads"
      aria-labelledby="downloads-heading"
      className="mx-auto w-full max-w-5xl px-6 py-20 text-center"
    >
      <p className="text-sm font-medium text-muted-foreground">Academia for campus students</p>
      <h2
        id="downloads-heading"
        className="mt-2 text-3xl font-semibold tracking-tight text-foreground"
      >
        Get Academia on your phone
      </h2>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
        Download Academia from the App Store or Google Play.
      </p>
      <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
        <Link
          href={siteLinks.appStore}
          className="inline-flex min-h-11 items-center justify-center rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          Download on the App Store
        </Link>
        <Link
          href={siteLinks.playStore}
          className="inline-flex min-h-11 items-center justify-center rounded-lg border border-border bg-background px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          Get it on Google Play
        </Link>
      </div>
    </section>
  );
}
