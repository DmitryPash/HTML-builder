const fs = require('fs').promises;
async function readFileContent() {
  try {
    const fileContent = await fs.readFile('01-read-file/text.txt', 'utf-8');
    console.log('Содержимое файла "text.txt":\n', fileContent);
  } catch (err) {
    console.error('Произошла ошибка при чтении файла:', err);
  }
}

readFileContent();