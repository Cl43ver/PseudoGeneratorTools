const readline = require('readline');
const fs = require('fs');

const caca = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const redColor = '\x1b[31m';
const resetColor = '\x1b[0m';

function cleaver() {
    console.log(`${redColor}
              ***
               ***
                **                                  **
                **                                  **
                **                                   **    ***                   ***  ****
   ****         **          ***          ****         **    ***        ***        **** **** *
  * ***  *      **         * ***        * ***  *      **     ***      * ***        **   ****
 *   ****       **        *   ***      *   ****       **      **     *   ***       **
**              **       **    ***    **    **        **      **    **    ***      **
**              **       ********     **    **        **      **    ********       **
**              **       *******      **    **        **      **    *******        **
**              **       **           **    **        **      *     **             **
***     *       **       ****    *    **    **         *******      ****    *      ***
 *******        *** *     *******      ***** **         *****        *******        ***
  *****          ***       *****        ***   **                      *****
${resetColor}`);
}

function rdm() {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    return characters[Math.floor(Math.random() * characters.length)];
}

function gnrt(length, startingCharacter = null) {
    let pseudo = '';

    if (startingCharacter) {
        pseudo += startingCharacter;
        length--;
    }

    for (let i = 0; i < length; i++) {
        pseudo += rdm();
    }

    return pseudo;
}

function strt(length, startingCharacter = null) {
    const fileName = `pseudos_${length}_letters.txt`;

  
    const writeStream = fs.createWriteStream(fileName, { flags: 'a' });

    console.log(`Generating infinite pseudonyms of ${length} letters. They are being saved to the file ${fileName}. Press Ctcaca+C to stop.`);

    setInterval(() => {
        const pseudo = gnrt(length, startingCharacter);
        writeStream.write(pseudo + '\n');
        console.log(`Generated pseudo: ${pseudo}`);
    }, 100);
}

function menu() {
    console.log('');
    console.log("1 - Generate pseudonyms with 1 letter");
    console.log("2 - Generate pseudonyms with 2 letters");
    console.log("3 - Generate pseudonyms with 3 letters");
    console.log("4 - Generate pseudonyms with 4 letters");
    console.log("5 - Generate pseudonyms with 5 letters");
    console.log("6 - Quit");

    caca.question('Choose your option (1-6) -> ', (option) => {
        if (['1', '2', '3', '4', '5'].includes(option)) {
            caca.question('Do you want the pseudonym to start with a specific character? (yes/no): ', (answer) => {
                if (answer.toLowerCase() === 'yes') {
                    caca.question('Enter the starting character (letter or number): ', (character) => {
                        const length = parseInt(option);
                        strt(length, character);
                        caca.close();
                    });
                } else {
                    const length = parseInt(option);
                    strt(length);
                    caca.close();
                }
            });
        } else if (option === '6') {
            caca.close();
        } else {
            console.log('Invalid option. Please enter a number between 1 and 6.');
            menu();
        }
    });
}

cleaver();
menu();

