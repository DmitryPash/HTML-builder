

const fs = require('fs');
const path = require('path');
const pathDir = path.join(__dirname, 'text.txt')
const readline = require('readline');
const promptText = 'Enter text (Ctrl+C or type "exit" to quit): ';


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  console.log(rl.output + '---output')
  console.log(rl.input + '---input')


  function getInput() {
    rl.question(promptText, (input) => {
      if (input.toLowerCase() === 'exit') {
        console.log('Farewell! Exiting...');
        rl.close();
      } else {
        fs.appendFileSync(pathDir, input + '\n', 'utf8');
        getInput();
      }
    });
  }

  console.log('Welcome to the text input program!');
getInput();

rl.on('SIGINT', () => {
  console.log('\nFarewell! Exiting...');
  rl.close();
});
