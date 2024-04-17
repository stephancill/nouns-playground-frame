import { fetchMetadata } from "frames.js/next";
import { Metadata } from "next";
import { APP_URL } from "./const";

export async function generateMetadata(): Promise<Metadata> {
  const frame = await fetchMetadata(new URL("/frames", APP_URL));
  return {
    other: {
      ...frame,
    },
  };
}

export default function Home() {
  return <div>Nouns Frame</div>;
}
