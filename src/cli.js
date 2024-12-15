#!/usr/bin/env node

const path = require('path');
const fs = require('fs').promises;
const BatchProcessor = require('./batch-processor');

async function checkDirectory(dir, create = false) {
    try {
        await fs.access(dir);
        const stats = await fs.stat(dir);
        if (!stats.isDirectory()) {
            throw new Error(`${dir} exists but is not a directory`);
        }
    } catch (error) {
        if (error.code === 'ENOENT' && create) {
            await fs.mkdir(dir, { recursive: true });
            console.log(`Created directory: ${dir}`);
        } else {
            throw error;
        }
    }
}

async function main() {
    const args = process.argv.slice(2);
    const inputDir = args[0];
    const outputDir = args[1];

    if (!inputDir || !outputDir) {
        console.error('Usage: pdf-to-md-batch <input-directory> <output-directory>');
        console.error('\nExample:');
        console.error('  pdf-to-md-batch ~/Documents/PDFs ~/Documents/Markdown');
        process.exit(1);
    }

    const resolvedInputDir = path.resolve(inputDir);
    const resolvedOutputDir = path.resolve(outputDir);

    try {
        // 验证输入目录存在
        await checkDirectory(resolvedInputDir);
        console.log(`Input directory verified: ${resolvedInputDir}`);

        // 确保输出目录存在，如果不存在则创建
        await checkDirectory(resolvedOutputDir, true);
        console.log(`Output directory ready: ${resolvedOutputDir}`);

        const processor = new BatchProcessor({
            inputDir: resolvedInputDir,
            outputDir: resolvedOutputDir,
            logFile: path.join(process.cwd(), 'batch-process.log')
        });

        console.log('\nStarting batch processing...');
        const summary = await processor.processDirectory();
        
        console.log('\nBatch processing completed:');
        console.log('─'.repeat(30));
        console.log(`Total files found: ${summary.total}`);
        console.log(`Successfully processed: ${summary.succeeded}`);
        console.log(`Failed: ${summary.failed}`);
        console.log('─'.repeat(30));
        console.log(`Detailed log available in: batch-process.log`);

        if (summary.failed > 0) {
            process.exit(1);
        }
    } catch (error) {
        console.error('\nError during batch processing:');
        console.error('─'.repeat(30));
        console.error(error.message);
        console.error('─'.repeat(30));
        process.exit(1);
    }
}

main();
