export default function ReviewSchema() {
  // Based on testimonials data
  const reviews = [
    {
      author: "Sarah M.",
      location: "Studio Apt",
      text: "Moved my entire studio in under 2 hours. Super fast and careful!",
      rating: 5,
    },
    {
      author: "James K.",
      location: "Chelsea",
      text: "Evening hours are perfect. Didn't have to take time off work.",
      rating: 5,
    },
    {
      author: "Lisa T.",
      location: "Upper West",
      text: "Best movers in Manhattan. Handled my antiques with care.",
      rating: 5,
    },
    {
      author: "Emma L.",
      location: "SoHo",
      text: "Finally, movers who actually show up on time!",
      rating: 5,
    },
  ];

  const averageRating =
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  const schema = {
    "@context": "https://schema.org",
    "@type": "MovingCompany",
    name: "Walk-up Pros",
    url: "https://walkuppros.com",
    telephone: "(347) 617-2607",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: averageRating.toFixed(1),
      bestRating: "5",
      worstRating: "1",
      ratingCount: reviews.length.toString(),
      reviewCount: reviews.length.toString(),
    },
    review: reviews.map((review) => ({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: review.author,
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: review.rating.toString(),
        bestRating: "5",
        worstRating: "1",
      },
      reviewBody: review.text,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
