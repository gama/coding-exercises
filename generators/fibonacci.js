#!/usr/bin/env node

function * fibonacci(seed1 = 0, seed2 = 1) {
    while (true) {
        yield seed2;
        [seed1, seed2] = [seed2, seed1 + seed2]
    }
}

exports.fibonacci = fibonacci

// ----- main -----
if (require.main !== module)
    return

if (process.argv.length != 3) {
    process.stderr.write(`Usage: ${process.argv[1]} NUMBER_OF_VALUES\n`)
    return 1
}

let fib = fibonacci()
process.stdout.write("Fibonacci numbers:")
for (let i = 0; i < Number.parseInt(process.argv[2]); i++)
    process.stdout.write(" " + fib.next().value)
process.stdout.write("\n");
