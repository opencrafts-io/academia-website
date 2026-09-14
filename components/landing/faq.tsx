"use client";

import {
  Button,
  Disclosure,
  DisclosureGroup,
  DisclosurePanel,
  Heading,
} from "react-aria-components";

const faqs = [
  {
    key: "devices",
    question: "Is Academia available for Apple devices?",
    answer:
      "Yes. Academia is available for iPhone, with additional platforms planned.",
  },
  {
    key: "free",
    question: "Is Academia free to use?",
    answer:
      "Yes. Academia is free and open source. You don't need to pay to use the platform.",
  },
  {
    key: "offline",
    question: "Does Academia work offline?",
    answer:
      "Academia supports offline access for parts of the application. Some features require an internet connection to retrieve or synchronize data.",
  },
  {
    key: "daystar",
    question: "Is Academia affiliated with Daystar University?",
    answer:
      "Academia is an independent, open-source project and is not officially affiliated with Daystar University.",
  },
] as const;

export function FAQ() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="mx-auto w-full max-w-3xl px-6 py-20"
    >
      <h2 id="faq-heading" className="mb-12 text-center text-3xl font-semibold text-foreground sm:text-4xl">
        Common Questions
      </h2>

      <DisclosureGroup
        allowsMultipleExpanded={false}
        className="divide-y divide-border rounded-xl border border-border bg-card px-5"
      >
        {faqs.map(({ key, question, answer }) => (
          <Disclosure key={key} id={key} className="group">
            <Heading level={3} className="m-0">
              <Button
                slot="trigger"
                className="flex w-full items-center justify-between gap-4 py-5 text-left text-base font-medium text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
              >
                <span>{question}</span>
                <span
                  aria-hidden="true"
                  className="text-xl leading-none text-muted-foreground transition-transform group-data-[expanded]:rotate-45"
                >
                  +
                </span>
              </Button>
            </Heading>
            <DisclosurePanel
              role="region"
              className="pb-5 pr-8 text-sm leading-6 text-muted-foreground"
            >
              {answer}
            </DisclosurePanel>
          </Disclosure>
        ))}
      </DisclosureGroup>
    </section>
  );
}
