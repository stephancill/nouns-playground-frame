import { imagesWorkerMiddleware } from "frames.js/middleware/images-worker";
import { createFrames } from "frames.js/next";
import { APP_URL, IMAGES_SECRET } from "../const";
import { NounSeed } from "@nouns/assets/dist/types";

type State = {
  seed?: {
    background: number;
    body: number;
    accessory: number;
    head: number;
    glasses: number;
  };
};

export const frames = createFrames<State>({
  basePath: "/frames",
  baseUrl: APP_URL,
  middleware: [
    imagesWorkerMiddleware({
      imagesRoute: "/images",
      secret: IMAGES_SECRET,
    }),
  ],
});
