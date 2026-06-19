import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://agroparknekrasovo.ru";
  const routes = [
    "/",
    "/park",
    "/attraktionen",
    "/buchung",
    "/kontakt",
    "/impressum",
    "/datenschutz",
    "/agb",
    "/login",
    "/dashboard",
    "/membership",
    "/vr-tour",
    "/iot",
    "/shop",
    "/workshops",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.8,
  }));
}
