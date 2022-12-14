const core = require('@actions/core');
const fs = require('fs');
const path = require('path');
const yaml = require('yaml');

async function run() {
    const allChanges = core.getMultilineInput('changes');
    const commentOutDevDependencies = core.getInput('commentOutDevDependencies');

    const filePath = path.join(process.env.GITHUB_WORKSPACE, "/pubspec.yaml");

    var file = fs.readFileSync(filePath, 'utf8');

    if (commentOutDevDependencies == 'true') {
        const listOfPubspec = file.split('\n');

        for (var i = 0; i < listOfPubspec.length; i++) {
            if (listOfPubspec[i] == 'dependency_overrides:') {
                for (var a = i; a < listOfPubspec.length; a++) {
                    if (listOfPubspec[a] == 'dependencies:') {
                        break;
                    }
                    listOfPubspec[a] = '#' + listOfPubspec[a];
                }
            }
        }

        file = listOfPubspec.join('\n');
    }

    const pubspec = yaml.parseDocument(file, { schema: "core" });

    console.log(allChanges);

    for (const key in allChanges) {
        console.log(key);

        const path = key.split('.');
        pubspec.setIn(path, allChanges[key]);
        console.log(key + ' set to: ' + allChanges[key]);
    }

    const finalDoc = yaml.stringify(pubspec);

    fs.writeFileSync(filePath, finalDoc);
}

run();