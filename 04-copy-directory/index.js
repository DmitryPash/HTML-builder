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