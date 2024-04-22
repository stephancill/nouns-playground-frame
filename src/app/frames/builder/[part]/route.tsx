import { ImageData, getRandomNounSeed } from "@nouns/assets";
import { NounSeed } from "@nouns/assets/dist/types";
import { Button } from "frames.js/next";
import { NextRequest } from "next/server";
import { nounImageUrl } from "../../../utils";
import { frames } from "../../frames";

const partsMap: Record<
  string,
  {
    filename: string;
    data: string;
  }[]
> = {
  body: ImageData.images.bodies,
  accessory: ImageData.images.accessories,
  head: ImageData.images.heads,
  glasses: ImageData.images.glasses,
};

export const POST = async (
  req: NextRequest,
  { params: { part } }: { params: { part: keyof NounSeed } }
) => {
  return await frames(async (ctx) => {
    const pathname = `/builder/${part}`;

    let currentSeed = { ...ctx.state.seed! };

    if (ctx.searchParams.randomize) {
      const randomSeed = getRandomNounSeed();
      currentSeed = { ...currentSeed, [part]: randomSeed[part] };
    }

    if (ctx.searchParams.next) {
      currentSeed = {
        ...currentSeed,
        [part]: (currentSeed[part] + 1) % partsMap[part].length,
      };
    }

    if (ctx.searchParams.prev) {
      currentSeed = {
        ...currentSeed,
        [part]: (currentSeed[part] - 1) % partsMap[part].length,
      };
    }

    const nextSeed = {
      ...currentSeed,
      [part]: (currentSeed[part] + 1) % partsMap[part].length,
    };

    const prevSeed = {
      ...currentSeed,
      [part]: (currentSeed[part] - 1) % partsMap[part].length,
    };

    const nextSeedImgData = nounImageUrl(nextSeed, { background: "none" });

    const prevSeedImgData = nounImageUrl(prevSeed, {
      background: "none",
    });

    const dataUrl = nounImageUrl(currentSeed);

    return {
      image: (
        <div tw="relative w-full h-full flex">
          <img src={dataUrl} tw="h-full w-full" />
          <div tw="absolute left-0 bottom-2 flex flex-col">
            <img src={prevSeedImgData} tw="w-28 h-28" />
            <div tw="text-[15px] justify-center text-center w-full">Prev</div>
          </div>
          <div tw="absolute right-0 bottom-2 flex flex-col">
            <img src={nextSeedImgData} tw="w-28 h-28" />
            <div tw="text-[15px] justify-center text-center w-full">Next</div>
          </div>
          <div tw="absolute w-full justify-center mt-2 text-[48px] flex">
            {part[0].toUpperCase()}
            {part.slice(1)}
          </div>
        </div>
      ),
      imageOptions: {
        aspectRatio: "1:1",
      },
      buttons: [
        <Button action="post" target={"/builder"}>
          ← Back
        </Button>,
        <Button
          action="post"
          target={{ pathname, query: { randomize: "true" } }}
        >
          🎲 Random
        </Button>,
        <Button action="post" target={{ pathname, query: { prev: "true" } }}>
          Prev
        </Button>,
        <Button action="post" target={{ pathname, query: { next: "true" } }}>
          Next
        </Button>,
      ],
      state: {
        seed: currentSeed,
      },
    };
  })(req);
};
