import * as YAML from "yaml"
import fs from 'fs'
import * as core from '@actions/core'
import path from 'path'

const yaml_file = core.getInput('file')

const filePath = path.join(process.cwd(), yaml_file)

const file = fs.readFileSync(filePath, 'utf8')
const pubspecDoc = YAML.parseDocument(file, {schema: "core"})

pubspecDoc.set('version', 'test')

const finalDoc = YAML.stringify(pubspecDoc)

fs.writeFileSync(filePath, finalDoc)