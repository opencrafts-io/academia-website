import { Accordion, AccordionItem } from "@heroui/react";

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
      aria-labelledby="faq-heading"
      className="mx-auto w-full max-w-3xl px-6 py-20"
    >
      <h2
        id="faq-heading"
        className="mb-12 text-center text-6xl sm:text-3xl font-semibold text-gray-800"
      >
        Common Questions
      </h2>

      <Accordion variant="surface" className="px-0">
        {faqs.map(({ key, question, answer }) => (
          <AccordionItem key={key}>
            <Accordion.Heading>
              <Accordion.Trigger>
                {question} <Accordion.Indicator />
              </Accordion.Trigger>
            </Accordion.Heading>
            <Accordion.Panel>
              <Accordion.Body>{answer}</Accordion.Body>
            </Accordion.Panel>

            {/* <p className="max-w-3xl text-sm text-default-500">{answer}</p> */}
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
