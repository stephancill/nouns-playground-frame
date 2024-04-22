import { Button } from "frames.js/next";
import { frames } from "./frames";
import { getRandomNounSeed } from "@nouns/assets";
import { nounImageUrl } from "../utils";

const frameHandler = frames(async (ctx) => {
  const seed = getRandomNounSeed();

  const nounUrl = nounImageUrl(seed);

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
    buttons: [
      <Button action="post" target={"/builder"}>
        Customize
      </Button>,
    ],
  };
});

export const GET = frameHandler;
export const POST = frameHandler;
