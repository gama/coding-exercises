#!/usr/bin/env node

var fetch = require('node-fetch')

function promptOnce(message, defaultName) {
    process.stdout.write(`${message} (default: ${defaultName}): `)
    return new Promise(function (resolve, reject) {
        process.stdin.on('data', function (data) {
            this.pause()
            resolve(data || defaultName)
        })
    })
}

async function loadJson(url) {
    let response = await fetch(url)
    let respJson = await response.json()
    if (!response.ok)
        throw respJson.message
    return respJson
}

async function demoGithubUser() {
    try {
        let name = await promptOnce("Username", "iliakan")
        let json = await loadJson(`https://api.github.com/users/${name}`)
        console.log(`Full name: ${json.name}.`)
    } catch (err) {
        console.error(`Error fetching user: ${err}`)
    }
}

demoGithubUser().catch(console.error)
