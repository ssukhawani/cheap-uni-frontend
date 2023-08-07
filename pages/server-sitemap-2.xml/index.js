import { getServerSideSitemap } from "next-sitemap";
import { getBlogListForSitemap } from "../../services";

export const getServerSideProps = async (ctx) => {
  const response = await getBlogListForSitemap(251, 500);

  const fieldsBlogs = response.map((blog) => ({
    loc: `${process.env.SITE_URL}post/${blog.slug}`,
    lastmod: new Date().toISOString(),
    changefreq: "daily",
  }));

  return getServerSideSitemap(ctx, [...fieldsBlogs]);
};

export default function Site() {}
