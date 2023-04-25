import { FEEDS, getFeed } from "@/lib/rss";

interface FeedProps {
  feed: {
    title: string;
    slug: string;
    url: string;
  };
  items: {
    title: string;
    link: string;
  }[];
}

export default function Feed({ feed, items }: FeedProps) {
  return (
    <div>
      <h1 className="font-bold">{feed.title}</h1>
      {items.map((item) => (
        <a
          key={item.link}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <p>{item.title}</p>
        </a>
      ))}
    </div>
  );
}

export async function getStaticPaths() {
  return {
    paths: FEEDS.map((feed) => ({ params: { slug: feed.slug } })),
    fallback: false, // Because the values are hard coded we can set fallback to false as there is no way to add additional feeds without rebuilding our app.
  };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const feed = FEEDS.find((feed) => feed.slug === params.slug);

  if (!feed) {
    throw new Error(`Feed not found for slug: ${params.slug}`);
  }

  const detailedFeed = await getFeed(feed.url);

  return {
    props: {
      feed,
      items: detailedFeed.items,
    },
    revalidate: 1, // to enable Next.js' Incremental Static Regeneration
  };
}
