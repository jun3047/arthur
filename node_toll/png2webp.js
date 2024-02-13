import { cwebp } from 'webp-converter';
import fs from 'fs';
import path from 'path';

//pass input image(.jpeg,.pnp .....) path ,output image(give path where to save and image file name with .webp extension)
//pass option(read  documentation for options)

//cwebp(input,output,option)

const inputDirectory = '../public';
const outputDirectory = '../public/webp';

fs.readdir(inputDirectory, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }


  files.forEach(async file => {

    if (path.extname(file) !== '.png') return;
    if (!/^\d+\.\d+\.png$/.test(file)) return;

    const webpFile = path.join(outputDirectory, `${path.parse(file).name}.webp`);
    if (fs.existsSync(webpFile)) {
      console.log(`File ${webpFile} already exists, skipping conversion.`);
      return;
    }


    console.log('Processing file:', path.parse(file).name);

    const inputFile = path.join(inputDirectory, file);
    const outputFile = path.join(outputDirectory, `${path.parse(file).name}.webp`);

    try {
      await cwebp(inputFile, outputFile);
      console.log(`Successfully converted ${inputFile} to WebP format.`);
    } catch (error) {
      console.log(`Error converting ${inputFile} to WebP format:`, error);
    }

  });
});
