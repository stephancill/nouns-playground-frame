import { getRandomNounSeed } from "@nouns/assets";
import { Button } from "frames.js/next";
import { nounImageUrl } from "../../utils";
import { frames } from "../frames";

export const POST = frames(async (ctx) => {
  const seed = ctx.searchParams.randomize
    ? getRandomNounSeed()
    : ctx.state?.seed || getRandomNounSeed();

  const nounUrl = nounImageUrl(seed);

  const saveUrl = `${nounUrl}&format=png`;

  const homeButtonPages: {
    action?: "post" | "link";
    label: string;
    target: { pathname: string; query?: Record<string, string> } | string;
  }[][] = [
    [
      {
        label: "🎲 Random",
        target: { pathname: "/builder", query: { randomize: "true" } },
      },
      {
        label: "Body",
        target: { pathname: "/builder/body" },
      },
      {
        label: "Head",
        target: { pathname: "/builder/head" },
      },

      {
        label: "More →",
        target: { pathname: "/builder", query: { nextPage: "true" } },
      },
    ],
    [
      {
        label: "← Back",
        target: { pathname: "/builder" },
      },
      {
        label: "Accessory",
        target: { pathname: "/builder/accessory" },
      },
      {
        label: "Glasses",
        target: { pathname: "/builder/glasses" },
      },
      {
        label: "Save (👀)",
        action: "link",
        target: saveUrl,
      },
    ],
  ];

  return {
    image: (
      <div tw="flex relative">
        <img src={nounUrl} />
        <div tw="absolute w-full justify-center mt-2 text-[48px]">
          Nouns Playground
        </div>
      </div>
    ),
    imageOptions: {
      aspectRatio: "1:1",
    },
    buttons: homeButtonPages[ctx.searchParams.nextPage ? 1 : 0].map((b) => (
      <Button action={b.action ?? "post"} target={b.target}>
        {b.label}
      </Button>
    )) as any, // Keep type checking happy
    state: {
      seed: JSON.parse(JSON.stringify(seed)),
    },
  };
});
