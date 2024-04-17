import { Button } from "frames.js/next";
import { frames } from "./frames";

const frameHandler = frames(async (ctx) => {
  return {
    image: <div>Hello</div>,
    imageOptions: {
      aspectRatio: "1:1",
    },
    buttons: [
      <Button action="post" target={"/builder"}>
        Start
      </Button>,
    ],
  };
});

export const GET = frameHandler;
export const POST = frameHandler;
