import { getServerSideSitemapLegacy } from "next-sitemap";
import { getBlogListForSitemap } from "../../services";

export const getServerSideProps = async (ctx) => {
  const response = await getBlogListForSitemap(501, 1000);

  const fieldsBlogs = response.map((blog) => ({
    loc: `${process.env.SITE_URL}post/${blog.slug}`,
    lastmod: new Date().toISOString(),
    changefreq: "daily",
  }));

  return getServerSideSitemapLegacy(ctx, [...fieldsBlogs]);
};

// Default export to prevent next.js errors
export default function Sitemap() {}
