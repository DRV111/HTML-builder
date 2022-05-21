const fs = require('fs');
const path = require('path');

async function filesInFolder() {
  await findFiles();
}

filesInFolder();

async function findFiles() {
  const storedFiles = await fs.promises.readdir(
    path.join(__dirname, 'secret-folder'),
    {
      withFileTypes: true,
    }
  );
  for (const file of storedFiles) {
    const filePath = path.join(__dirname, 'secret-folder', file.name);
    fs.stat(filePath, (err, stats) => {
      if (err) {
        throw err;
      }
      if (file.isFile()) {
        console.log(
          `${path.parse(filePath).name} ${path.extname(file.name).slice(1)} ${
            stats.size
          }.bytes`
        );
      }
    });
  }
}
