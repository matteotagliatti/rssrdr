import Parser from "rss-parser";

export const FEEDS = [
  {
    slug: "nextjs-blog",
    title: "Next.js Blog",
    url: "https://nextjs.org/feed.xml",
  },
  {
    slug: "vercel-blog",
    title: "Vercel Blog",
    url: "https://vercel.com/atom",
  },
];

export async function getFeed(feedUrl: string) {
  let parser = new Parser();
  let feed = await parser.parseURL(feedUrl);
  return feed;
}
