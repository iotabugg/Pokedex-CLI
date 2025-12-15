import chalk from "chalk"

export function registerGetCommand(program) {
    program
        .command("get <identifier>")
        .description("Get pokemon by name or ID")
        .action((identifier) => {
            console.log(
                chalk.green("Fetching Pokemon... "),
                chalk.yellow(identifier)
            );
        });
}