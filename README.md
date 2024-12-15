# PDF-To-Markdown Converter

Javascript tool to parse PDF files and convert them into Markdown format. Online version at http://pdf2md.morethan.io!

## Features

- Web Interface: Convert PDF files to Markdown through a user-friendly web interface
- Batch Processing: Convert multiple PDF files using command-line interface
- Detailed Logging: Track conversion progress and errors
- Cross-platform Support: Works on Windows, macOS, and Linux

## Installation

```bash
# Clone the repository
git clone https://github.com/jzillmann/pdf-to-markdown.git

# Install dependencies
cd pdf-to-markdown
npm install

# Install globally for CLI access
npm install -g .
```

## Usage

### Web Interface
1. Start the local server:
   ```bash
   npm run start
   ```
2. Open your browser and visit the local server URL
3. Upload your PDF file and convert it to Markdown

### Command Line Interface (CLI)
Convert multiple PDF files in a directory:

```bash
pdf-to-md-batch <input-directory> <output-directory>
```

Example:
```bash
pdf-to-md-batch ~/Documents/PDFs ~/Documents/Markdown
```

The CLI tool will:
- Process all PDF files in the input directory
- Create corresponding markdown files in the output directory
- Generate a detailed log file (`batch-process.log`)
- Display progress and summary information

#### CLI Options
- `<input-directory>`: Directory containing PDF files to convert
- `<output-directory>`: Directory where markdown files will be saved (created if it doesn't exist)

#### Output
- Each PDF file will be converted to a `.md` file with the same name
- A `batch-process.log` file will be created in the current directory
- Console output will show:
  - Number of files processed
  - Success/failure statistics
  - Path to detailed log file

## Major Changes

- **2024/12** - Added batch processing functionality with CLI support
  - New command-line interface for processing multiple files
  - Detailed logging and error reporting
  - Progress tracking and summary statistics
- **2020/2021** Currently separating the parsing logic from the frontend in order to make it separately available. 
  - [Branch modularize](https://github.com/jzillmann/pdf-to-markdown/tree/modularize) 
  - Find the current version at https://jzillmann.github.io/pdf-to-markdown-staging/
  - [Help me](https://github.com/jzillmann/pdf-to-markdown/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22+milestone%3Av2) 
- **Apr 2017** - 0.1: Initial Release

## Contribute

Use the [issue tracker](https://github.com/jzillmann/pdf-to-markdown/issues) and/or open [pull requests](https://github.com/jzillmann/pdf-to-markdown/pulls)!

#### Useful Build Commands

- ```npm install``` Download all necessary npm packages
- ```npm run lint``` Lint the javascript files
- ```npm run test``` Run tests
- ```npm run check``` Lint & Test
- ```npm run build``` Build the dev version
- ```npm run start``` Run the app on a server (useful for loading of worker.js and cmaps)
- ```npm run watch``` Continuously build the project
- ```open build/index.html``` Open the build project in your default browser
- ```npm run release``` Build production version
- ```npm run deploy``` Build production version & move it to the github pages folder

#### Release
- Increase version in package.json
- ```npm run deploy```
- commit & push
- tag with
  - _git tag -a $releaseVersion -m "$releaseVersion release"_
  - _git push --tags_

## Credits

[pdf.js](https://mozilla.github.io/pdf.js/) - Mozilla's PDF parsing & rendering platform which is used as a raw parser
