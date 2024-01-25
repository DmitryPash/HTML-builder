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

const fs = require('fs').promises;
const path = require('path');

async function copyDir(source, destination) {
  try {
    await fs.mkdir(destination, { recursive: true });

    const files = await fs.readdir(source);

    for (const file of files) {
      const [sourcePath, destinationPath] = [path.join(source, file), path.join(destination, file)];

      await fs.writeFile(destinationPath, await fs.readFile(sourcePath));

      console.log(`Файл ${file} успешно скопирован.`);
    }

    console.log('Копирование завершено.');
  } catch (err) {
    console.error('Произошла ошибка при копировании:', err);
  }
}

const sourceDir = '04-copy-directory/files';
const destinationDir = '04-copy-directory/files-copy';

copyDir(sourceDir, destinationDir);