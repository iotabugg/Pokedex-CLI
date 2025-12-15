import chalk from "chalk"

export function registerRandomCommand(program) {
    program
        .command("random")
        .description("Get a random pokemon")
        .action(() => {
            console.log(
                chalk.magenta("Fetching random pokemon")
            );
        });
}