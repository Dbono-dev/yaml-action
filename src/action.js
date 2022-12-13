const core = require('@actions/core');
const fs = require('fs');
const path = require('path');
const yaml = require('yaml');

async function run() {
    console.log("Hello World");
    // const version = core.getInput('version');
    const version = "2.0.0";
    console.log(version);

    // const filePath = path.join(process.env.GITHUB_WORKSPACE, "/pubspec.yaml");
    // console.log(filePath);

    const filePath = "pubspec.yaml";
    const file = fs.readFileSync(filePath, 'utf8');
    console.log(file);

    console.log(file);

    const pubspec = yaml.parseDocument(file, { schema: "core" });

    pubspec.set('version', version);

    const finalDoc = yaml.stringify(pubspec);

    console.log(finalDoc);

    fs.writeFileSync(filePath, finalDoc);
}

run();