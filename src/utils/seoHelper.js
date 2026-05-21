/**
 * SEO Helper - Manages meta tags and SEO optimization across pages
 */

export const updatePageMeta = (title, description, keywords, url = "") => {
  // Update document title
  if (title) {
    document.title = title;
  }

  // Update or create meta description
  let metaDescription = document.querySelector('meta[name="description"]');
  if (!metaDescription) {
    metaDescription = document.createElement("meta");
    metaDescription.setAttribute("name", "description");
    document.head.appendChild(metaDescription);
  }
  if (description) {
    metaDescription.setAttribute("content", description);
  }

  // Update or create meta keywords
  let metaKeywords = document.querySelector('meta[name="keywords"]');
  if (!metaKeywords) {
    metaKeywords = document.createElement("meta");
    metaKeywords.setAttribute("name", "keywords");
    document.head.appendChild(metaKeywords);
  }
  if (keywords) {
    metaKeywords.setAttribute("content", keywords);
  }

  // Update Open Graph tags for social media
  updateOGTag("og:title", title);
  updateOGTag("og:description", description);
  updateOGTag("og:url", url);

  // Update canonical URL
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical && url) {
    canonical = document.createElement("link");
    canonical.setAttribute("rel", "canonical");
    document.head.appendChild(canonical);
  }
  if (canonical && url) {
    canonical.setAttribute("href", url);
  }
};

const updateOGTag = (property, content) => {
  let tag = document.querySelector(`meta[property="${property}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("property", property);
    document.head.appendChild(tag);
  }
  if (content) {
    tag.setAttribute("content", content);
  }
};

/**
 * Common SEO metadata for different pages
 */
export const seoConfig = {
  home: {
    title: "MTM Veterinary Medicals & Pet Shop | Premium Pet Care Solutions",
    description:
      "Discover premium veterinary medicines, pet food, and accessories at MTM Veterinary & PetShop. Quality products for your pet's health, happiness, and wellbeing.",
    keywords:
      "pet shop, veterinary medicines, pet food, pet care, online pet store, pet supplies, animal healthcare",
  },
  shop: {
    title: "Online Pet Shop | Quality Pet Food & Supplies | MTM Veterinary",
    description:
      "Shop premium pet products including food, supplements, grooming supplies, and accessories. Wide selection for dogs, cats, birds, and small animals.",
    keywords:
      "pet store online, pet food, pet supplies, pet accessories, grooming products, pet treats",
  },
  doctors: {
    title: "Online Veterinarian Consultation | Expert Pet Care | MTM Vet",
    description:
      "Connect with certified veterinarians online. Expert pet consultations, instant advice, and professional care from the comfort of your home. 24/7 emergency support.",
    keywords:
      "online vet, veterinarian consultation, pet doctor, online pet care, emergency vet services",
  },
  doctorsList: {
    title: "Find Expert Veterinarians | Book Pet Consultations | MTM Vet",
    description:
      "Browse our network of certified and experienced veterinarians. Book appointments, get consultations, and ensure expert care for your pets.",
    keywords:
      "find vet, veterinarian directory, pet consultation, ask vet, veterinary care",
  },
  cart: {
    title: "Shopping Cart | Secure Checkout | MTM Pet Shop",
    description: "View your shopping cart and proceed to secure checkout.",
    keywords: "shopping cart, pet products, checkout",
  },
  contact: {
    title: "Contact Us | Customer Support | MTM Veterinary & Pet Shop",
    description:
      "Get in touch with our customer service team. We're here to help with your pet care questions and orders.",
    keywords: "contact us, customer support, pet help, veterinary advice",
  },
  careers: {
    title: "Careers at MTM | Join Our Pet Care Team",
    description:
      "Build your career with MTM Veterinary & PetShop. Explore exciting job opportunities in pet care and veterinary services.",
    keywords:
      "careers, jobs, employment, pet care jobs, veterinary positions, hiring",
  },
  blog: {
    title: "Pet Care Blog | Tips & Articles | MTM Veterinary",
    description:
      "Read expert pet care tips, health advice, and helpful articles about pet nutrition, grooming, training, and wellness.",
    keywords:
      "pet care tips, pet health, pet advice, pet training, pet nutrition, pet wellness",
  },
  productDetail: {
    title: "Pet Product Details | Quality Pet Supplies | MTM Pet Shop",
    description: "Explore detailed product information, pricing, and reviews.",
    keywords: "pet product, pet supplies details, pet care items",
  },
  thankYou: {
    title: "Thank You | Order Confirmed | MTM Pet Shop",
    description: "Your order has been confirmed. Thank you for your purchase!",
    keywords: "order confirmation, thank you, purchase successful",
  },
  help: {
    title: "Help & Support | FAQs | MTM Veterinary & Pet Shop",
    description:
      "Get answers to common questions about our products, services, shipping, and pet care advice.",
    keywords: "help, FAQ, customer support, pet care questions, shipping help",
  },
  blogs: {
    title: "Pet Care Blog | Tips & Articles | MTM Veterinary",
    description:
      "Read expert pet care tips, health advice, and helpful articles about pet nutrition, grooming, training, and wellness.",
    keywords:
      "pet care tips, pet health, pet advice, pet training, pet nutrition, pet wellness",
  },
};
