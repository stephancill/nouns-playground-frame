import { createImagesWorker } from "frames.js/middleware/images-worker/next";
import { IMAGES_SECRET } from "../../const";
import path from "path";
import { readFileSync } from "fs";

const londrinaSolidFont = readFileSync(
  path.join(path.resolve(process.cwd(), "public"), "LondrinaSolid-Regular.ttf")
);

const imagesWorker = createImagesWorker({
  secret: IMAGES_SECRET,
  imageOptions: {
    fonts: [
      {
        name: "Londrina Solid",
        data: londrinaSolidFont,
        weight: 400,
      },
    ],
    width: 600,
    height: 600,
  },
});

export const GET = imagesWorker();
