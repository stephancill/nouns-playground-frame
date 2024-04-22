import { ImageData, getNounData } from "@nouns/assets";
import { NounSeed } from "@nouns/assets/dist/types";
import { EncodedImage, buildSVG } from "@nouns/sdk";
import { decodeImage } from "@nouns/sdk/dist/image/svg-builder";
import { APP_URL } from "./const";

export function renderNounDataUrl(
  seed: NounSeed,
  options: {
    background?: string;
  } = {}
) {
  const svgBinary = renderNounSvg(seed, options);
  const svgBase64 = btoa(svgBinary);

  return `data:image/svg+xml;base64,${svgBase64}`;
}

export function renderNounSvg(
  seed: NounSeed,
  options: { background?: string }
) {
  const { parts, background } = getNounData(seed);

  const { palette } = ImageData;
  return buildSVG(
    parts.filter(Boolean),
    palette,
    options.background === "none" ? undefined : options.background || background
  );
}

export function nounImageUrl(
  seed: NounSeed,
  options: { background?: string } = {}
) {
  const searchParams = new URLSearchParams({
    seed: JSON.stringify(seed),
    options: JSON.stringify(options),
  });
  return `${APP_URL}/frames/images/nouns?${searchParams.toString()}`;
}

export function renderPreviewPartDataUrl(part: EncodedImage) {
  const { palette } = ImageData;

  const svgRects: string[] = [];
  const { bounds, rects } = decodeImage(part.data);
  let currentX = bounds.left;
  let currentY = bounds.top;
  rects.forEach((draw) => {
    let drawLength = draw[0];
    const colorIndex = draw[1];
    const hexColor = palette[colorIndex];
    let length = getRectLength(currentX, drawLength, bounds.right);
    while (length > 0) {
      // Do not push rect if transparent
      if (colorIndex !== 0) {
        svgRects.push(
          `<rect width="${length * 10}" height="10" x="${currentX * 10}" y="${
            currentY * 10
          }" fill="#${hexColor}" />`
        );
      }
      currentX += length;
      if (currentX === bounds.right) {
        currentX = bounds.left;
        currentY++;
      }
      drawLength -= length;
      length = getRectLength(currentX, drawLength, bounds.right);
    }
  });

  const svgBinary = `<svg width="320" height="320" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges"><rect width="100%" height="100%" fill="none" />${svgRects.join(
    ""
  )}</svg>`;
  const svgBase64 = btoa(svgBinary);

  return `data:image/svg+xml;base64,${svgBase64}`;
}

function getRectLength(
  currentX: number,
  drawLength: number,
  rightBound: number
) {
  const remainingPixelsInLine = rightBound - currentX;
  return drawLength <= remainingPixelsInLine
    ? drawLength
    : remainingPixelsInLine;
}
