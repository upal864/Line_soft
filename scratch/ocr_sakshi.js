const Tesseract = require('tesseract.js');
const fs = require('fs');
const path = require('path');

const samplesDir = path.join(__dirname, '../samples');

async function extractOCR() {
    const sakFiles = fs.readdirSync(samplesDir).filter(f => f.startsWith('SAK') && f.endsWith('.png'));
    sakFiles.sort();
    
    for (let file of sakFiles) {
        console.log(`Processing ${file}...`);
        const filePath = path.join(samplesDir, file);
        try {
            // Using tel+eng to support both English and Telugu text which might be mixed in ads
            const { data: { text } } = await Tesseract.recognize(filePath, 'tel+eng', {
                logger: m => {} // suppress logging
            });
            console.log(`--- ${file} ---`);
            console.log(text.trim());
            console.log(`----------------`);
        } catch (error) {
            console.error(`Error processing ${file}:`, error);
        }
    }
}

extractOCR();
