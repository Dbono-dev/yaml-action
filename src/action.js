const core = require('@actions/core');
const fs = require('fs');
const path = require('path');
// const yaml = require('yaml');

async function run() {
    console.log("Hello World");
    const version = core.getInput('version');

    const filePath = path.join(process.env.GITHUB_WORKSPACE, 'pubspec.yaml');
    const file = fs.readFileSync(filePath, 'utf8');

    console.log(file);

    // const pubspec = yaml.parseDocument(file, {schema: "core"});

    // pubspec.set('version', version);

    // const finalDoc = yaml.stringify(pubspec);

    // fs.writeFileSync(filePath, finalDoc);

    console.log("Hello World");
}

run();