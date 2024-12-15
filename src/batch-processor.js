const fs = require('fs').promises;
const path = require('path');
const pdfExtract = require('./pdf-extract');

class BatchProcessor {
    constructor(options = {}) {
        this.options = {
            inputDir: '',
            outputDir: '',
            logFile: 'batch-process.log',
            ...options
        };
        this.processedFiles = 0;
        this.totalFiles = 0;
        this.errors = [];
    }

    async logOperation(message) {
        const timestamp = new Date().toISOString();
        const logMessage = `[${timestamp}] ${message}\n`;
        await fs.appendFile(this.options.logFile, logMessage);
    }

    async processSingleFile(inputFile) {
        try {
            const outputPath = path.join(
                this.options.outputDir,
                path.basename(inputFile, '.pdf') + '.md'
            );

            await this.logOperation(`Processing: ${inputFile}`);
            const markdown = await pdfExtract.extractFromFile(inputFile);
            await fs.writeFile(outputPath, markdown);
            this.processedFiles++;
            await this.logOperation(`Success: ${inputFile} -> ${outputPath}`);
            
            return { success: true, file: inputFile };
        } catch (error) {
            this.errors.push({ file: inputFile, error: error.message });
            await this.logOperation(`Error processing ${inputFile}: ${error.message}`);
            return { success: false, file: inputFile, error: error.message };
        }
    }

    async processDirectory() {
        try {
            const files = await fs.readdir(this.options.inputDir);
            this.totalFiles = files.filter(file => file.toLowerCase().endsWith('.pdf')).length;
            
            await this.logOperation(`Starting batch process. Found ${this.totalFiles} PDF files.`);

            const pdfFiles = files.filter(file => file.toLowerCase().endsWith('.pdf'));
            const results = await Promise.all(
                pdfFiles.map(file => 
                    this.processSingleFile(path.join(this.options.inputDir, file))
                )
            );

            const summary = {
                total: this.totalFiles,
                processed: this.processedFiles,
                succeeded: results.filter(r => r.success).length,
                failed: this.errors.length
            };

            await this.logOperation(`Batch process completed. Summary: ${JSON.stringify(summary)}`);
            return summary;
        } catch (error) {
            await this.logOperation(`Fatal error: ${error.message}`);
            throw error;
        }
    }
}

module.exports = BatchProcessor;
