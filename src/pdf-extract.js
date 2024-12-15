const pdfjsLib = require('pdfjs-dist');

class PDFExtractor {
    async extractFromFile(pdfPath) {
        const data = new Uint8Array(await require('fs').promises.readFile(pdfPath));
        const doc = await pdfjsLib.getDocument(data).promise;
        const numPages = doc.numPages;
        let markdown = '';

        for (let i = 1; i <= numPages; i++) {
            const page = await doc.getPage(i);
            const content = await page.getTextContent();
            const text = content.items.map(item => item.str).join(' ');
            markdown += `## Page ${i}\n\n${text}\n\n`;
        }

        return markdown;
    }
}

module.exports = new PDFExtractor();
