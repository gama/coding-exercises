function prompt() {
    console.log('Type something and press ENTER')
    return new Promise(function (resolve, reject) {
        process.stdin.on('data', function (data) {
            process.stdin.pause()
            resolve(data.toString())
        })
    })
}

function wait(delayInMs) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => resolve('Hello'), delayInMs)
    })
}

// wait(2000).then(console.log).catch(console.error)

prompt().then(console.log).catch(console.error)
