interface Feature {
  title: string;
  description: string;
  items: readonly string[];
  rotation: "none" | "left" | "right";
}

const featureSections: readonly Feature[] = [
  {
    title: "Keep your semester together",
    description:
      "Your classes, tasks, study plans, and important dates deserve a better home than six group chats and a screenshot you can’t find.",
    items: [
      "Classes",
      "To-dos",
      "Study cards",
      "Reminders",
      "Your schedule",
      "Less chaos",
    ],
    rotation: "none",
  },
  {
    title: "Find your campus people",
    description:
      "Ask a question, share what you know, and see what’s happening around you. Your university is more than a timetable.",
    items: [
      "Student posts",
      "Communities",
      "Campus conversations",
      "Shared advice",
    ],
    rotation: "left",
  },
  {
    title: "Make studying feel possible",
    description:
      "Break the big stuff into smaller steps. Save what matters, revisit it with study cards, and get back on track when the semester gets loud.",
    items: [
      "Study cards",
      "Focus time",
      "Course resources",
      "Your own pace",
    ],
    rotation: "right",
  },
];

function FeatureCard({ feature }: { feature: Feature }) {
  const rotationClass = {
    none: "rotate-0",
    left: "-rotate-2",
    right: "rotate-[1.56deg]",
  }[feature.rotation];

  return (
    <article
      className={`
        sticky top-4
        mb-12
        flex flex-col
        min-h-100
        w-full
        rounded-[20px]
        border
        border-border
        bg-card
        text-card-foreground
        ${rotationClass}
      `}
    >
      <div className="px-8 pt-20 pb-0">
        <h3 className="text-xl font-semibold text-foreground">{feature.title}</h3>

        <p className="mt-2 max-w-3xl text-base leading-relaxed text-muted-foreground">
          {feature.description}
        </p>
      </div>

      <ul className="mt-8 mb-12 grid grid-cols-2 gap-x-6 gap-y-3 px-8 text-sm sm:gap-x-16 sm:px-20">
        {feature.items.map((item) => (
          <li key={item} className="font-semibold text-foreground">
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}

export default function Features() {
  return (
    <section id="features" className="w-full px-6 py-24" aria-labelledby="features-heading">
      <div className="mx-auto max-w-225 text-center">
        <h2
          id="features-heading"
          className="text-4xl font-semibold leading-tight"
        >
          With you for all your school seasons.
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
          Some weeks you’re ahead. Some weeks you’re surviving on vibes and a deadline reminder. Academia is built for both.
        </p>
      </div>

      <div className="mx-auto mt-16 max-w-182.5">
        {featureSections.map((feature) => (
          <FeatureCard key={feature.title} feature={feature} />
        ))}
      </div>
    </section>
  );
}
