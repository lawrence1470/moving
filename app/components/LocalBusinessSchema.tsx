export default function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "MovingCompany",
    name: "Walk-up Pros",
    description:
      "Evening moving service in Manhattan specializing in walk-up apartments. We move apartments from 6PM to 1AM daily.",
    telephone: "(347) 617-2607",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Manhattan",
      addressRegion: "NY",
      postalCode: "10001",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "40.7831",
      longitude: "-73.9712",
    },
    url: "https://walkuppros.com",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "18:00",
        closes: "01:00",
      },
    ],
    areaServed: {
      "@type": "City",
      name: "Manhattan",
      "@id": "https://www.wikidata.org/wiki/Q11299",
    },
    serviceType: [
      "Evening Moving Service",
      "Walk-up Apartment Moving",
      "Residential Moving",
      "Apartment Moving",
    ],
    slogan: "Move on your schedule, not ours.",
    knowsAbout: [
      "Walk-up apartment moving",
      "Evening moves",
      "Manhattan moving",
      "NYC moving services",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Moving Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Evening Moving Service",
            description:
              "Professional moving service available 6PM-1AM daily in Manhattan",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Walk-up Apartment Moving",
            description:
              "Specialized moving service for walk-up apartments with experienced stair navigation",
          },
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
