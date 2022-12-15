# Flutter YAML Version Update

Update values in Flutter's pubspec.yaml file.

## Input Arguments

| **Argument**    | **Description** | **Default** | **Example**|
| --------------- | --------------- | ----------- | ---------- |
| changes      | changes made to the pubspec.yaml file, needs to be in the format of an javascript object with the name being the path to the yaml field seperated by periods and the value being the new value| *required* |{"version": "1.0.0", "wft_lib_tool_translations.git.ref": "1.0.0"}
| commentOutDevDependencies   | whether or not to comment out the dev dependencies part of the pubspec.yaml needs to be commented out| *required* | 'true'|

## Use Cases
**Changing Version Number and Creating PR using Release Branch**
```
name: Update Version

on:
  workflow_dispatch:
    inputs:
        version_number:
          description: 'New Version Number'     
          required: true          
            
jobs:
  build:
    name: Analyze Project
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v2
        with:
          token: ${{ secrets.GITHUB_TOKEN }}

      - name: Flutter YAML Version
        uses: Dbono-dev/yaml-action@v1.0.3
        with:
          changes: |
            {
              "version": "${{ github.event.inputs.version_number }}"
            }
          commentOutDevDependencies: 'true'
      - name: Add Version Number Update to Release Branch
        uses: EndBug/add-and-commit@v9
        with:
          message: 'Update Package Version'
          new_branch: 'release/candidate/${{ github.event.inputs.version_number }}'
      - name: Create Pull Request
        run: gh pr create -B main -H release/candidate/${{ github.event.inputs.version_number }} --title '[RELEASE] v${{ github.event.inputs.version_number }}' --body 'Created by Github action' --label 'Production Release'
        env:
            GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

**Changing Version Numbers for Multiple Packages and Creating PR using Release Branch**
```
name: Update Version

on:
  workflow_dispatch:
    inputs:
        version_number:
          description: 'New Version Number'     
          required: true          
            
jobs:
  build:
    name: Analyze Project
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v2
        with:
          token: ${{ secrets.GITHUB_TOKEN }}

      - name: Flutter YAML Version
        uses: Dbono-dev/yaml-action@v1.0.3
        with:
          changes: |
            {
              "version": "${{ github.event.inputs.version_number }}",
              "wft_lib_tool_translations.git.ref": "${{ github.event.inputs.version_number }}"
            }
          commentOutDevDependencies: 'true'
      - name: Add Version Number Update to Release Branch
        uses: EndBug/add-and-commit@v9
        with:
          message: 'Update Package Version'
          new_branch: 'release/candidate/${{ github.event.inputs.version_number }}'
      - name: Create Pull Request
        run: gh pr create -B main -H release/candidate/${{ github.event.inputs.version_number }} --title '[RELEASE] v${{ github.event.inputs.version_number }}' --body 'Created by Github action' --label 'Production Release'
        env:
            GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## Known Issues
- If you put a path that is not defined in the pubspec.yaml file than it will create it at the end of the file
