const fs = require('fs');
const appJs = fs.readFileSync('./frontend/app.js', 'utf8');

// We need to extract the MaharashtraTimesCalculator class
const startIdx = appJs.indexOf('class MaharashtraTimesCalculator');
const endIdx = appJs.indexOf('}', appJs.indexOf('calculateBilledLines(adText) {') + 'calculateBilledLines(adText) {'.length);
const nextClassIdx = appJs.indexOf('class', startIdx + 10);
const classCode = appJs.substring(startIdx, nextClassIdx > -1 ? nextClassIdx : appJs.length);

eval(classCode);

const calc = new MaharashtraTimesCalculator();
const text = "FEMALE Medical Typist / Transcriptionist with speed 40wpm for MRI CT Scan Centre , Contact 8850927330";
const boldWords = ["FEMALE"];

const result = calc.calculateLayout(text, boldWords);
console.log('Lines count:', result.linesCount);
result.layout.forEach((line, i) => {
    const lineText = line.map(t => t.text).join(' ');
    const w = line.reduce((acc, t) => acc + calc.getWordPixelWidth(t.text, t.isBold) + (t.hasPrecedingSpace ? calc.getCharWidth(' ') : 0), 0);
    console.log(`Line ${i+1}: ${lineText} (${w}px)`);
});
