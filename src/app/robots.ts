import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/research", "/disciplines", "/apply", "/privacy"],
        disallow: [
          "/dashboard",
          "/profile",
          "/submissions",
          "/review",
          "/admin",
          "/api/",
        ],
      },
    ],
  };
}
