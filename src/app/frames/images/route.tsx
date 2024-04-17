import { createImagesWorker } from "frames.js/middleware/images-worker/next";
import { IMAGES_SECRET } from "../../const";

const imagesWorker = createImagesWorker({
  secret: IMAGES_SECRET,
});

export const GET = imagesWorker();
