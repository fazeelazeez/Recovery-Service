import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.fazeelazeez.in/",
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: "https://www.fazeelazeez.in/about",
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.8,
    }
  ];
}
