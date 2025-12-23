export default function FAQSchema() {
  const faqs = [
    {
      question: "What hours do you operate?",
      answer: "We operate during evening hours: Monday-Friday 5PM-1AM, and weekends 6AM-1AM. This allows you to move after work without taking time off.",
    },
    {
      question: "Do you specialize in walk-up apartments?",
      answer: "Yes! Walk-up apartments are our specialty. Our team is experienced in navigating narrow staircases and tight corners common in Manhattan buildings.",
    },
    {
      question: "How much does a move cost?",
      answer: "A typical studio apartment move starts at $248 for 2 hours with 2 professional movers, a truck, and all equipment included. We provide transparent pricing with no hidden fees.",
    },
    {
      question: "What areas do you serve?",
      answer: "We serve Manhattan exclusively. This focused service area allows us to provide faster response times and better knowledge of building requirements in the borough.",
    },
    {
      question: "How do I book a move?",
      answer: "Simply text us at (347) 617-2607. We typically respond within 5 minutes with a quote. No complicated booking systems or waiting on hold.",
    },
    {
      question: "Are there any hidden fees?",
      answer: "No hidden fees, ever. The quote we give you is what you pay. We include the truck, equipment, padding, and professional movers in our pricing.",
    },
    {
      question: "Can I book a same-day or last-minute move?",
      answer: "Yes! We handle last-minute moves regularly. Text us and if we have crew availability, we can often accommodate same-day or next-day moves.",
    },
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
