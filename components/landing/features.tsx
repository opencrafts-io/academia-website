interface Feature {
  title: string;
  description: string;
  items: readonly string[];
  rotation: "none" | "left" | "right";
}

const featureSections: readonly Feature[] = [
  {
    title: "Easy school life and we guarantee it.",
    description:
      "We believe that music should be more than just background noise—it should be an experience. Our commitment to Hi-Fi streaming delivers sound with unparalleled clarity, ensuring you hear music as it was meant to be heard.",
    items: [
      "Lossless Streaming",
      "Adaptive Bitrate",
      "Spatial Audio",
      "Custom EQ Settings",
      "High-Rez Audio Support",
      "No Audio Ads",
    ],
    rotation: "none",
  },
  {
    title: "UI Algorithm That Knows You",
    description:
      "Our intelligent user interface algorithm doesn’t just adapt light and dark mode—it learns your unique tastes and evolves with you. Academia's AI-driven recommendations are designed to feel like they know you personally, introducing you to new moods and colors.",
    items: [
      "Behavioral Learning",
      "Mood-Based Themes",
      "Smart Curation",
      "Contextual themes",
    ],
    rotation: "left",
  },
  {
    title: "Fair Pay to Artists",
    description:
      "At Rhythmiq, we believe that great music deserves fair compensation. We’ve built our platform on the principle of fair pay to ensure that artists are rewarded justly for their work, fostering a sustainable and thriving music ecosystem.",
    items: [
      "Transparent Revenue Sharing",
      "Direct Artist Support",
      "Artist-Centric Payment",
      "Higher Payout Rates",
      "Independent Artist Promotion",
      "Real-Time Analytics",
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
        mb-24
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
      <div className="px-10 pt-20 pb-0">
        <h3 className="text-xl font-bold text-foreground">{feature.title}</h3>

        <p className="mt-2 max-w-3xl text-base leading-relaxed text-muted-foreground">
          {feature.description}
        </p>
      </div>

      <ul className="grid grid-cols-2 gap-x-16 gap-y-3 px-12 text-sm">
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
          The Smart, Fair, and best way to tackle school life
        </h2>
      </div>

      <div className="mx-auto mt-16 max-w-182.5">
        {featureSections.map((feature) => (
          <FeatureCard key={feature.title} feature={feature} />
        ))}
      </div>
    </section>
  );
}
