const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const ICON_SIZES = [192, 512];
const SPLASH_SIZES = [
  { width: 640, height: 1136 },
  { width: 750, height: 1334 },
  { width: 1242, height: 2208 },
  { width: 1125, height: 2436 }
];

async function generateIcons() {
  // Create icons directory if it doesn't exist
  const iconsDir = path.join(__dirname, '../public/icons');
  try {
    await fs.mkdir(iconsDir, { recursive: true });
  } catch (err) {
    if (err.code !== 'EEXIST') throw err;
  }

  // Base icon - creating a simple green square with "KS" text
  const baseSize = 512;
  const canvas = sharp({
    create: {
      width: baseSize,
      height: baseSize,
      channels: 4,
      background: { r: 22, g: 101, b: 52, alpha: 1 } // #166534
    }
  });

  // Generate icons
  for (const size of ICON_SIZES) {
    await canvas
      .resize(size, size)
      .toFile(path.join(iconsDir, `icon-${size}x${size}.png`));
    console.log(`Generated ${size}x${size} icon`);
  }

  // Generate splash screens
  for (const { width, height } of SPLASH_SIZES) {
    await sharp({
      create: {
        width,
        height,
        channels: 4,
        background: { r: 240, g: 253, b: 244, alpha: 1 } // #f0fdf4
      }
    })
      .composite([
        {
          input: await canvas.resize(width * 0.3, width * 0.3).toBuffer(),
          gravity: 'center'
        }
      ])
      .toFile(path.join(iconsDir, `splash-${width}x${height}.png`));
    console.log(`Generated ${width}x${height} splash screen`);
  }
}

generateIcons().catch(console.error); 