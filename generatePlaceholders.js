import fs from "fs";
import path from "path";
import sharp from "sharp";

const inputDir = path.resolve("./public/assets/carousel");
const outputFile = path.resolve("./placeholders.json");

async function generatePlaceholders() {
    const files = fs.readdirSync(inputDir);
    const placeholders = {};

    for (const file of files) {
        const filePath = path.join(inputDir, file);

        const image = sharp(filePath);
        const metadata = await image.metadata();

        // Miniatura de 10px de ancho
        const buffer = await image.resize(10).toBuffer();
        const base64 = `data:image/${metadata.format};base64,${buffer.toString("base64")}`;

        placeholders[file] = {
            width: metadata.width,
            height: metadata.height,
            base64,
        };
    }

    fs.writeFileSync(outputFile, JSON.stringify(placeholders, null, 2));
    console.log("✅ Placeholders generados en:", outputFile);
}

generatePlaceholders();

