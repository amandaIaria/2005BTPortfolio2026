
import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";

const inputDir = "public/img";
const outputDir = "public/watermarked";
const watermarkPath = "public/img/watermark.svg";

const supportedExtensions = [
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".avif",
];

const watermark = await fs.readFile(watermarkPath);

async function getImages(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, {
    withFileTypes: true,
  });

  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        return getImages(fullPath);
      }

      if (
        entry.isFile() &&
        supportedExtensions.includes(
          path.extname(entry.name).toLowerCase()
        ) &&
        entry.name !== "watermark.png"
      ) {
        return [fullPath];
      }

      return [];
    })
  );

  return files.flat();
}

const images = await getImages(inputDir);

await fs.mkdir(outputDir, { recursive: true });

for (const image of images) {
  const relativePath = path.relative(inputDir, image);

  const outputPath = path.join(
    outputDir,
    relativePath
  );

  await fs.mkdir(path.dirname(outputPath), {
    recursive: true,
  });

  // Get original image dimensions
  const metadata = await sharp(image).metadata();

  const imageWidth = !metadata.width ? 800 : metadata.width;
  const imageHeight = !metadata.height ? 600 : metadata.height;

  // Calculate maximum watermark dimensions
  const watermarkWidth = Math.round(imageWidth * 0.25);
  const watermarkHeight = Math.round(imageHeight * 0.15);

  // Resize watermark while preserving aspect ratio
  const resizedWatermark = await sharp(watermark)
    .resize({
      width: watermarkWidth,
      height: watermarkHeight,
      fit: "inside",
      withoutEnlargement: true,
    })
    .png()
    .toBuffer();

  // Verify watermark dimensions
  const watermarkMetadata = await sharp(
    resizedWatermark
  ).metadata();

  if (
    watermarkMetadata.width > imageWidth ||
    watermarkMetadata.height > imageHeight
  ) {
    throw new Error(`Watermark too large for ${image}`);
  }

  // Composite watermark onto original image
  await sharp(image)
    .composite([
      {
        input: resizedWatermark,
        gravity: "center",
        blend: "over",
        
      },
    ])
    .png()
    .toFile(outputPath);

  console.log(`Watermarked: ${relativePath}`);
}

console.log(`\nProcessed ${images.length} images.`);
