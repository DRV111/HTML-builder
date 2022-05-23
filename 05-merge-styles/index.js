const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, 'styles');
const outputPath = path.join(__dirname, 'project-dist');

async function mergeStyles() {
  const storedFiles = await fs.promises.readdir(path.join(inputPath), {
    withFileTypes: true,
  });
  const writeStream = fs.createWriteStream(path.join(outputPath, 'bundle.css'));
  for (const file of storedFiles) {
    const ext = path.extname(file.name);
    if (file.isFile && ext === '.css') {
      fs.createReadStream(path.join(inputPath, file.name)).pipe(writeStream);
    }
  }
  console.log('Style files were merged!');
}

mergeStyles();
