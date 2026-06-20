const samples = [
    { name: 'SAK1', actual: 4, text: 'ఆటోమొబైల్ షాప్ నందు పని చేయుటకు 10th చదివిన బాయ్స్ & గర్ల్స్ కావలెను మంచి జీతం.సంప్ర|| Old Autonagar, VJA. 97012 00500', bold: ['ఆటోమొబైల్', 'షాప్', 'నందు', 'పని'] },
    { name: 'SAK2', actual: 5, text: 'I, Mangipudi srilatha R/o H.No.67-1-36 /3, NSN School back Side, Darsipeta, Pata mata, Vijayawada,N.T.R District,AP,520010 .have changed my name as " MANGIPUDI SREELATHA " For Future Purpose.', bold: ['I,', 'Mangipudi', 'srilatha', 'R/o', 'H.No.67-1-36'] },
    { name: 'SAK3', actual: 4, text: 'డ్వాక్రా మహిళలకు, నిరుద్యోగులకు ఇంట్లో ఉంటూ పెట్టుబడి మీరే పెట్టుకొని పెన్సిల్స్, కొవ్వొత్తులు తయారు చేసి మాకు ఇవ్వండి వీక్లీ పేమెంట్, 9640729906', bold: ['డ్వాక్రా', 'మహిళలకు,', 'నిరుద్యోగులకు'] },
    { name: 'SAK4', actual: 4, text: 'త్రివేణి హోంకేర్ హైదరాబాద్‌లో వృద్ధులను / పేషెంట్లను చూసుటకు వర్కర్స్/ నర్సులు కావలెను. ఫ్రీ వసతి భోజనం జీ: 18K - 20K. Ph: 9640400073, 9160900024.', bold: ['త్రివేణి', 'హోంకేర్', 'హైదరాబాద్‌లో', 'వృద్ధులను'] },
    { name: 'SAK5', actual: 4, text: 'Wanted Lady Teachers to Teach L.K.G - 10th All Subjects. PRO,Security Guards.Chitti Nagar , One town,VJA. 98853 77263', bold: ['Wanted', 'Lady', 'Teachers', 'to'] }
];

let uniqueChars = new Set();
for (let s of samples) {
    for (let c of s.text) {
        if(c !== '\n') uniqueChars.add(c);
    }
}
let charsArray = Array.from(uniqueChars);

// Initialize with standard proportional widths
let bestWidths = {};
for (let c of charsArray) {
    if (['ా', 'ి', 'ీ', 'ు', 'ూ', 'ృ', 'ె', 'ే', 'ై', 'ొ', 'ో', 'ౌ', '్', 'ం', 'ః'].includes(c)) bestWidths[c] = 0; 
    else if ([' ', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '(', ')', '-', ',', '.', ':', 'i', 'l', 'I', '\'', '+'].includes(c)) bestWidths[c] = 25;
    else if (['W', 'M', 'm', 'w'].includes(c)) bestWidths[c] = 80;
    else bestWidths[c] = 55;
}
bestWidths[' '] = 25;

function wrapText(text, maxW, widths, boldWords) {
    const paragraphs = text.split('\n');
    let lines = 0;
    let spaceW = widths[' '] || 25;
    
    for (let p of paragraphs) {
        if (p.trim() === '') continue;
        const words = p.trim().split(/\s+/);
        let currentW = 0;
        for (let i = 0; i < words.length; i++) {
            let word = words[i];
            let cleanWord = word.replace(/[.,()":|-]/g, '');
            let isBold = boldWords.includes(cleanWord) || boldWords.includes(word);
            
            let wWidth = 0;
            for (let j = 0; j < word.length; j++) {
                let cw = widths[word[j]] !== undefined ? widths[word[j]] : 55;
                if(isBold) cw = Math.floor(cw * 1.2);
                wWidth += cw;
            }
            if (currentW === 0) {
                currentW += wWidth;
                lines++;
            } else if (currentW + spaceW + wWidth <= maxW) {
                currentW += spaceW + wWidth;
            } else {
                lines++;
                currentW = wWidth;
            }
        }
    }
    return lines;
}

let targets = samples.map(s => s.actual);
function fitness(widths, max_w) {
    let diff = 0;
    let matches = 0;
    for(let i=0; i<5; i++) {
        let lines = wrapText(samples[i].text, max_w, widths, samples[i].bold);
        diff += Math.abs(lines - targets[i]);
        if(lines === targets[i]) matches++;
    }
    return {diff, matches};
}

let bestMaxW = 1200;
let bestDiff = 999;
let bestMatches = 0;

for(let iter=0; iter<800000; iter++) {
    let tempWidths = {...bestWidths};
    let c = charsArray[Math.floor(Math.random()*charsArray.length)];
    tempWidths[c] += (Math.floor(Math.random() * 21) - 10);
    if(tempWidths[c] < 0) tempWidths[c] = 0;
    
    let max_w = bestMaxW + (Math.floor(Math.random() * 61) - 30);
    if(max_w < 800) max_w = 800;
    if(max_w > 1800) max_w = 1800;
    
    let fit = fitness(tempWidths, max_w);
    if(fit.matches === 5) {
        console.log('PERFECT MATCH FOR ALL SAKSHI at max_w ' + max_w);
        console.log(JSON.stringify(tempWidths));
        process.exit(0);
    }
    if(fit.diff < bestDiff || (fit.diff === bestDiff && fit.matches > bestMatches)) {
        bestDiff = fit.diff;
        bestMatches = fit.matches;
        bestWidths = tempWidths;
        bestMaxW = max_w;
    } else if (fit.diff === bestDiff && Math.random() < 0.05) {
        bestWidths = tempWidths;
        bestMaxW = max_w;
    }
}
console.log('Best match count: ' + bestMatches + ', Best diff: ' + bestDiff);
console.log('max_w: ' + bestMaxW);
console.log(JSON.stringify(bestWidths));
