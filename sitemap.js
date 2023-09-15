const siteUrl = process.env.SITE_URL || "https://www.cheapuniverse.org/";

module.exports = {
  siteUrl,
  sitemapSize: 7000,
  generateRobotsTxt: true,
  exclude: ['/sitemap.xml','/server-sitemap.xml','/server-sitemap-2.xml','/server-sitemap-3.xml'],
  robotsTxtOptions: {
    additionalSitemaps: [
      `${siteUrl}sitemap.xml`,
      `${siteUrl}server-sitemap.xml`,
      `${siteUrl}server-sitemap-2.xml`,
      `${siteUrl}server-sitemap-3.xml`,
    ],
  },
};
