#! /usr/bin/env node
import inquirer from "inquirer";
import { differenceInSeconds } from "date-fns";
import chalk from "chalk";
console.log(chalk.bold.rgb(204, 204, 204)(`\n \t\t <<<======================================================>>>`));
console.log(chalk.bold.rgb(204, 204, 204)(`<<<===============>>>  ${chalk.bold.hex("#9999FF")(`Welcome To 'CodeWithEman' Countdown Timer  <<<================>>>`)}`));
console.log(chalk.bold.rgb(204, 204, 204)(`\t\t <<<======================================================\n`));
async function main() {
    const res = await inquirer.prompt({
        name: "userInput",
        type: "number",
        message: chalk.blue("Please enter the amount of seconds (60 or less)"),
        validate: (input) => {
            if (isNaN(input)) {
                return chalk.red("Please enter a valid number");
            }
            else if (input > 60) {
                return chalk.red("Seconds must be 60 or less");
            }
            else {
                return true;
            }
        }
    });
    let input = res.userInput;
    console.log(chalk.yellow("------------------------------"));
    function startTime(val) {
        const intTime = new Date().setSeconds(new Date().getSeconds() + val);
        const intervalTime = new Date(intTime);
        setInterval(() => {
            const currentTime = new Date();
            const TimeDiff = differenceInSeconds(intervalTime, currentTime);
            if (TimeDiff <= 0) {
                console.log(chalk.red("Time has expired"));
                process.exit();
            }
            const min = Math.floor((TimeDiff % 3600) / 60);
            const sec = Math.floor(TimeDiff % 60);
            console.log(chalk.green(`${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`));
        }, 1000);
    }
    startTime(input);
}
main();
