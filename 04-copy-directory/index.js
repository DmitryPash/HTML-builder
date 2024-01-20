const fs = require('fs');
const path = require('path');

const sourceFolder = '04-copy-directory/files';
const destinationFolder = '04-copy-directory/files-copy';

const copyDir = async (source, destination) => {
  try {
    if (!fs.existsSync(destination)) {
      fs.mkdirSync(destination);
    }

    const files = await fs.promises.readdir(source);

    for (const file of files) {
      const sourceFilePath = path.join(source, file);
      const destinationFilePath = path.join(destination, file);

      const stats = await fs.promises.lstat(sourceFilePath);

      if (stats.isFile()) {
        await fs.promises.copyFile(sourceFilePath, destinationFilePath);
      } else if (stats.isDirectory()) {
        await copyDir(sourceFilePath, destinationFilePath);
      }
    }

    console.log('Directory copied successfully!');
  } catch (err) {
    console.error('Error copying directory:', err);
  }
};

copyDir(sourceFolder, destinationFolder);
