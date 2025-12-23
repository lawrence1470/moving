export default function ServiceSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Moving Service",
    name: "Walk-up Pros Evening Moving Service",
    description:
      "Professional evening moving service in Manhattan specializing in walk-up apartments. Available 5PM-1AM weekdays and 6AM-1AM weekends.",
    provider: {
      "@type": "MovingCompany",
      name: "Walk-up Pros",
      telephone: "(347) 617-2607",
      url: "https://walkuppros.com",
    },
    areaServed: {
      "@type": "City",
      name: "Manhattan",
      containedInPlace: {
        "@type": "State",
        name: "New York",
      },
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Moving Services",
      itemListElement: [
        {
          "@type": "OfferCatalog",
          name: "Residential Moving",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Studio Apartment Move",
                description: "Professional moving for studio apartments with 2 movers",
              },
              priceSpecification: {
                "@type": "PriceSpecification",
                price: "248",
                priceCurrency: "USD",
                unitText: "starting price for 2 hours",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "1 Bedroom Apartment Move",
                description: "Professional moving for 1 bedroom apartments",
              },
              priceSpecification: {
                "@type": "PriceSpecification",
                price: "350",
                priceCurrency: "USD",
                unitText: "starting price",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Walk-up Apartment Specialist",
                description: "Experienced movers for buildings without elevators",
              },
            },
          ],
        },
      ],
    },
    availableChannel: {
      "@type": "ServiceChannel",
      serviceType: "Text Message",
      servicePhone: {
        "@type": "ContactPoint",
        telephone: "+1-347-617-2607",
        contactType: "customer service",
        availableLanguage: "English",
      },
    },
    termsOfService: "https://walkuppros.com/terms",
    hoursAvailable: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "17:00",
        closes: "01:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday", "Sunday"],
        opens: "06:00",
        closes: "01:00",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
