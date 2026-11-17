import { describe, it, expect } from "vitest";
import sharp from "sharp";
import { applyWatermark } from "../watermark";


describe("applyWatermark", () => {
  it("returns a valid PNG image", async () => {
    const original = await sharp({
      create: {
        width: 800,
        height: 600,
        channels: 4,
        background: "#cccccc",
      },
    })
      .png()
      .toBuffer();

    const watermark = Buffer.from(`
      <svg width="200" height="60">
        <text x="10" y="40" fill="red" font-size="30">
          Test
        </text>
      </svg>
    `);

    const result = await applyWatermark(
      original,
      watermark
    );

    const metadata = await sharp(result).metadata();

    expect(metadata.format).toBe("png");
    expect(metadata.width).toBe(800);
    expect(metadata.height).toBe(600);
  });

  it("produces a different image from the original", async () => {
    const original = await sharp({
      create: {
        width: 800,
        height: 600,
        channels: 4,
        background: "#cccccc",
      },
    })
      .png()
      .toBuffer();

    const watermark = Buffer.from(`
      <svg width="200" height="60">
        <text x="10" y="40" fill="red" font-size="30">
          Test
        </text>
      </svg>
    `);

    const result = await applyWatermark(
      original,
      watermark
    );

    expect(result.equals(original)).toBe(false);
  });
});