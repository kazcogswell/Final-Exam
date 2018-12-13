/**
 *   @author Cogswell, Kaz
 *   @version 0.0.1
 *   @summary Final Exam
 *   @todo Ask about average function
 */

"use strict";
const PROMPT = require('readline-sync');
const IO = require('fs');

let menuChoice, roll, rollCount, sum;
let diceRolls = [];


function main(){
    loadData();
    setMenuChoice();
}

main();

function loadData() {
    let diceFile = IO.readFileSync(`data/data.csv`, 'utf8');
    diceRolls = diceFile.toString().split(/\r?\n/);
    console.log(diceRolls[0], ' is the first value', diceRolls[1])
}

function setMenuChoice() {
    menuChoice = -1;
    while (menuChoice !== 1 && menuChoice !== 2 && menuChoice !==3) {
        menuChoice = Number(PROMPT.question(
            `\tPlease make a selection:
            \t\t1) Roll new die
            \t\t2) Average all die
            \t\t3) Exit
            \t\tCHOOSE: `
        ));
    }
    if (menuChoice === 1) {
        rollDice();
    } else if (menuChoice === 2) {
        averageDice();
    } else if (menuChoice === 3) {
        exit();
    }
}

function rollDice(){
    process.stdout.write('\x1B[2J\x1B[0f');
    console.log('Rolling one die...');
    roll = Math.floor((Math.random() * 6) + 1);
    console.log('You rolled a ', roll, '.');
    diceRolls.push(roll);
    console.log(diceRolls);
    setMenuChoice();
}

function averageDice() {
    process.stdout.write('\x1B[2J\x1B[0f');
    sum = 0;
    rollCount = Number(diceRolls.length);
    for (let i = 0; i < diceRolls.length; i++) {
        sum += Number(diceRolls[i]);
    }
    console.log(rollCount);
    console.log(sum);
    console.log('Your average is', sum / rollCount , '.');
    setMenuChoice();
}

function exit() {
    for (let i = 0; i < diceRolls.length; i++) {
        if (i < diceRolls.length - 1) {
            IO.appendFileSync(`data/dataX.csv`, `${diceRolls[i]}\n`);
        } else {
            IO.appendFileSync(`data/dataX.csv`, `${diceRolls[i]}`);
        }
    }
    IO.unlinkSync(`data/data.csv`);
    IO.renameSync(`data/dataX.csv`, `data/data.csv`);
}