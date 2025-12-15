import chalk from "chalk"

export function registerSearchCommand(program) {
    program
        .command("search <query>")
        .description("Search pokemon by name")
        .action((query) => {
            console.log(
                chalk.green("Searching Pokemon... "),
                chalk.yellow(query)
            );
        });
}