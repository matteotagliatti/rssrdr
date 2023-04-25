import { FEEDS } from "@/lib/rss";
import Layout from "@/components/Layout";
import Link from "next/link";

export default function Home() {
  return (
    <Layout>
      <h1>Home</h1>
      <div className="flex gap-10">
        {FEEDS.map((feed) => (
          <Link key={feed.slug} href={`/feeds/${feed.slug}`}>
            {feed.title}
          </Link>
        ))}
      </div>
    </Layout>
  );
}
