const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;

const outputTxt = fs.createWriteStream(path.join(__dirname, 'text.txt'));

stdout.write('Hello Student1! please enter your text!\n');
stdin.on('data', (data) => {
  if (data.toString().trim() === 'exit') {
    console.log('Good bye, Student1!');
    process.exit();
  } else {
    console.log('Thank you, Student1! Your text has been saved!');
    outputTxt.write(data);
  }
  process.on('SIGINT', () => {
    console.log('See you later, Student1!');
    process.exit();
  });
});
