const fs = require('fs').promises;
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

const filePath = '02-write-file/textTest.txt';

const exitProcess = () => {
  console.log('\nДо свидания!');
  readline.close();
  process.exit();
};

process.on('SIGINT', exitProcess);

(async () => {
  try {
    await fs.access(filePath);
    console.log('Добавление нового текста.');
  } catch (err) {
    console.log('Файл не существует. Создание нового файла.');
  }

  while (true) {
    const userInput = await new Promise(resolve =>
      readline.question('Введите текст (или введите "exit", чтобы выйти): ', resolve)
    );

    if (userInput.toLowerCase() === 'exit') exitProcess();

    await fs.appendFile(filePath, userInput + '\n', 'utf-8');
    console.log('Текст добавлен в файл "textTest.txt".');
  }
})();