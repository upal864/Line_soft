const fs = require('fs');
const appJs = fs.readFileSync('frontend/app.js', 'utf8');

// We will extract the exact class text
const classStart = appJs.indexOf('class MaharashtraTimesCalculator');
const classEnd = appJs.indexOf('// DOM Elements', classStart);
const classCode = appJs.substring(classStart, classEnd);

// Evaluate it
eval(classCode);

const engine = new MaharashtraTimesCalculator();
const text = 'SHAYONA CORPORATION, a Government Contracting Firm, invites applications for: 1) CIVIL ENGINEER (Female) – 4-5 years of experience in estimation, project quantity surveying and billing roles 2) CIVIL ENGINEER (Male) – 4-5 years exp. primarily for site supervision and execution work. Location: Thane | Job Type: Permanent. Email: dhanashree.shayona@gmail.com / 8976221639 / 9324956699';
const layout = engine.calculateLayout(text, ['SHAYONA']);

console.log('Lines:', layout.linesCount);
for (let i=0; i<layout.layout.length; i++) {
    console.log('Line ' + (i+1) + ':', layout.layout[i].map(x => x.text).join(x => x.hasPrecedingSpace ? ' ' : ''));
}
