"use client";

import { Card } from "@heroui/react";

const stats = [
  {
    id: "students",
    stat: "2k+",
    title: "Students are already on the platform",
    cta: "Your colleagues are using Academia. Join the vibrant community",
  },
  {
    id: "monthly",
    stat: "300+",
    title: "Monthly Active Users",
    cta: "Users & student community growing each and every month",
  },
  {
    id: "faster",
    stat: "50%",
    title: "Faster Loads",
    cta: "Experience school services way faster than the official school portal flow",
  },
  {
    id: "satisfaction",
    stat: "99%",
    title: "Satisfaction Rate",
    cta: "Students say our platform is just seamless and intuitive",
  },
] as const;

export function Stats() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 py-16">
      <h2 className="mb-12 text-center text-6xl sm:text-3xl font-semibold text-gray-800">
        Academia is for you by students like you.
      </h2>

      <div className="mx-auto grid w-fit grid-cols-1 justify-items-center gap-2 sm:grid-cols-2">
        {stats.map(({ id, stat, title, cta }) => (
          <Card key={id} variant="tertiary" className="w-80">
            <Card.Header>
              <p className="text-4xl sm:text-5xl font-bold text-gray-400">
                {stat}
              </p>
            </Card.Header>
            <Card.Description>
              <p className="text-lg font-semibold text-gray-900">{title}</p>
            </Card.Description>
            <Card.Footer>
              <p className="text-sm text-gray-500">{cta}</p>
            </Card.Footer>
          </Card>
        ))}
      </div>
    </section>
  );
}
