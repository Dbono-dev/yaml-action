const core = require('@actions/core');
const fs = require('fs');
const path = require('path');
const yaml = require('yaml');

async function run() {
    const version = core.getInput('version');

    const filePath = path.join(process.env.GITHUB_WORKSPACE, "/pubspec.yaml");

    const file = fs.readFileSync(filePath, 'utf8');

    const pubspec = yaml.parseDocument(file, { schema: "core" });

    pubspec.set('version', version);

    const finalDoc = yaml.stringify(pubspec);

    fs.writeFileSync(filePath, finalDoc);

    console.log('Version Number Updated to: ' + version);
}

run();