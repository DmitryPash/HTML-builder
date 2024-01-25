const fs = require('fs').promises;
const path = require('path');

async function printFileInfo() {
  const folderPath = '03-files-in-folder/secret-folder';

  try {
    const files = await fs.readdir(folderPath);

    console.log(`Информация о файлах в папке "${path.basename(folderPath)}":`);

    for (const file of files) {
      const filePath = path.join(folderPath, file);
      const stats = await fs.stat(filePath);

      if (stats.isFile()) {
        const { size } = stats, [name, ext] = file.split('.');
        console.log(`${name}-${ext}-${(size / 1024).toFixed(3)}kb`);
      } else {
        console.error(`Error: ${file} is a directory. Skipping.`);
      }
    }
  } catch (err) {
    console.error('Произошла ошибка:', err);
  }
}

printFileInfo();