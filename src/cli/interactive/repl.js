import readline from "node:readline"
import { program } from "../../index.js"
import chalk from "chalk"

export function startRepl() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "pokedex> "
    })
    const session = {
        lastPokemon: null
    }
    
    console.log("Welcome to Pokedex Interactive Mode")
    console.log("Type 'help' to see available commands.")
    rl.prompt();
    
    rl.on("line", async (line) => {
        const input = line.trim();
        if(!input) {
            rl.prompt()
            return
        }
        if(input === "exit" || input === "quit") {
            rl.close();
            return
        }
        try {
            await program.parseAsync(
                input.split(" "),
                {from: "user"}
            )
        } catch(error) {
            console.log(error)
            console.error(chalk.red("Command failed."))
        }
        rl.prompt()
    })
    rl.on("close", () => {
        console.log(chalk.redBright.bold("Until next time, GoodBye!"))
        process.exit(0)
    })
}

