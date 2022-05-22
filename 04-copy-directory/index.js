const fs = require('fs');
const path = require('path');

const originPath = path.join(__dirname, 'files');
const destPath = path.join(__dirname, 'files-copy');

async function copyDirectory() {
  await removeDirectory();
  await makeDirectory();
  await copyDirectoryFiles();
}

copyDirectory();

async function makeDirectory() {
  await fs.promises.mkdir(destPath, { recursive: true }, (err) => {
    if (err) {
      throw err;
    }
  });
}

async function removeDirectory() {
  await fs.promises.rm(destPath, { recursive: true, force: true });
}

async function copyDirectoryFiles() {
  const storedFiles = await fs.promises.readdir(path.join(originPath), {
    withFileTypes: true,
  });

  for (const file of storedFiles) {
    let originFiles = path.join(originPath, file.name);
    let copyFiles = path.join(destPath, file.name);
    if (file.isFile) {
      await fs.promises.copyFile(originFiles, copyFiles);
    }
  }
  console.log(`Files have been copied to ${destPath}`);
}
