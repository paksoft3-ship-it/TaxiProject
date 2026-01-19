import Script from 'next/script';

// Organization structured data
export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://primetaxi.is/#organization',
    name: 'PrimeTaxi & Tours',
    alternateName: 'PrimeTaxi',
    description:
      'Premium taxi and tour services in Iceland. Airport transfers, city taxis, private tours, and custom adventures with professional drivers.',
    url: 'https://primetaxi.is',
    logo: 'https://primetaxi.is/logo.png',
    image: 'https://primetaxi.is/og-image.jpg',
    telephone: '+354-555-1234',
    email: 'info@primetaxi.is',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Reykjavik',
      addressCountry: 'IS',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 64.1466,
      longitude: -21.9426,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '00:00',
      closes: '23:59',
    },
    priceRange: '$$',
    sameAs: [
      'https://facebook.com/primetaxi',
      'https://instagram.com/primetaxi',
      'https://tripadvisor.com/primetaxi',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '2000',
    },
  };

  return (
    <Script
      id="organization-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Tour/Service structured data
interface TourSchemaProps {
  name: string;
  description: string;
  image: string;
  price: number;
  currency: string;
  duration: string;
  url: string;
}

export function TourSchema({
  name,
  description,
  image,
  price,
  currency,
  duration,
  url,
}: TourSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name,
    description,
    image,
    url,
    provider: {
      '@type': 'LocalBusiness',
      name: 'PrimeTaxi & Tours',
      '@id': 'https://primetaxi.is/#organization',
    },
    offers: {
      '@type': 'Offer',
      price,
      priceCurrency: currency,
      availability: 'https://schema.org/InStock',
    },
    touristType: 'Adventure tourist',
    itinerary: {
      '@type': 'ItemList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Pickup from your accommodation',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: name,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Return to your accommodation',
        },
      ],
    },
  };

  return (
    <Script
      id={`tour-schema-${name.toLowerCase().replace(/\s+/g, '-')}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// FAQ structured data
interface FAQItem {
  question: string;
  answer: string;
}

export function FAQSchema({ faqs }: { faqs: FAQItem[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <Script
      id="faq-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Breadcrumb structured data
interface BreadcrumbItem {
  name: string;
  url: string;
}

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <Script
      id="breadcrumb-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Service structured data
interface ServiceSchemaProps {
  name: string;
  description: string;
  price: number;
  currency: string;
  areaServed: string[];
}

export function ServiceSchema({
  name,
  description,
  price,
  currency,
  areaServed,
}: ServiceSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    provider: {
      '@type': 'LocalBusiness',
      name: 'PrimeTaxi & Tours',
      '@id': 'https://primetaxi.is/#organization',
    },
    areaServed: areaServed.map((area) => ({
      '@type': 'City',
      name: area,
    })),
    offers: {
      '@type': 'Offer',
      price,
      priceCurrency: currency,
    },
  };

  return (
    <Script
      id={`service-schema-${name.toLowerCase().replace(/\s+/g, '-')}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Blog post structured data
interface BlogPostSchemaProps {
  title: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified: string;
  author: string;
  url: string;
}

export function BlogPostSchema({
  title,
  description,
  image,
  datePublished,
  dateModified,
  author,
  url,
}: BlogPostSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    image,
    datePublished,
    dateModified,
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'PrimeTaxi & Tours',
      logo: {
        '@type': 'ImageObject',
        url: 'https://primetaxi.is/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };

  return (
    <Script
      id={`blog-schema-${title.toLowerCase().replace(/\s+/g, '-')}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
