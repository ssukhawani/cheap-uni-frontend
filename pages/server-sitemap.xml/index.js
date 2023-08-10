import { getServerSideSitemapLegacy } from 'next-sitemap'
import {
  getBlogListForSitemap,
  getPageList,
  getTagsList,
} from "../../services";


export const getServerSideProps = async (ctx) => {
  const response = await getBlogListForSitemap(0, 250);
  const pages = await getPageList();
  const tags = await getTagsList().then((res) => res.data);

  const fieldsBlogs = response?.map((blog) => ({
    loc: `${process.env.SITE_URL}post/${blog.slug}`,
    lastmod: new Date().toISOString(),
    changefreq: "daily",
  }));

  const fieldPages = pages?.map((page) => ({
    loc: `${process.env.SITE_URL}${page.slug}`,
    lastmod: new Date().toISOString(),
  }));

  const fieldTags = tags?.map((tag) => ({
    loc: `${process.env.SITE_URL}tag/${tag.slug}`,
    lastmod: new Date().toISOString(),
    changefreq: "daily",
  }));

  return getServerSideSitemapLegacy(ctx, [
    ...fieldsBlogs,
    ...fieldPages,
    ...fieldTags,
  ]);
};

// Default export to prevent next.js errors
export default function Sitemap() {}
