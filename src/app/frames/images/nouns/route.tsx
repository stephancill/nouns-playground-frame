import { NextRequest } from "next/server";
import { nounImageUrl, renderNounSvg } from "../../../utils";
import { ImageResponse } from "@vercel/og";
import { APP_URL } from "../../../const";

export function GET(req: NextRequest) {
  const seed = JSON.parse(req.nextUrl.searchParams.get("seed")!);
  const options = JSON.parse(req.nextUrl.searchParams.get("options")!);
  const format = req.nextUrl.searchParams.get("format");

  const svgText = renderNounSvg(seed, options);

  if (format === "png") {
    return new ImageResponse(
      (
        <img
          src={nounImageUrl(seed, options)}
          style={{ width: "500px", height: "500px" }}
        ></img>
      ),
      {
        height: 500,
        width: 500,
      }
    );
  }

  return new Response(svgText, {
    headers: {
      "Content-Type": "image/svg+xml",
    },
  });
}
