const texts = [
    {
        name: "TEL1",
        text: "I Uppunuthala Srinivas Chary S/o Anjaneyulu Chary AGED ABOUT 47yrs H. No 9-2-372 Plot no 372 RVR Colony Road no -7 Almasguda, Badangpet RRDist TS:500058. Missed my original link Document No 1423/2003 Plot 746 servy no 438 & 440 Turkayamjal village. while traveling, See my plot Return to my home Date on 30-05-2026. If any body found please Call: 9393006543.",
        actual: 8,
        bold_words: ["I", "Uppunuthala", "Srinivas", "Chary"]
    },
    {
        name: "TEL2",
        text: "MY SON'S OLD NAME: B R SIDARTH CHAKRAVARTHY S/o SRINIVAS, 7 YEARS, R/o # 1-54/2, GANGWAR, NYALKAL, SANGAREDDY -TG-502249. I Changed his name as BHEEM RAO SIDHARTH S/o BHEEM RAO SRINIVAS.",
        actual: 5,
        bold_words: ["MY", "SON'S", "OLD", "NAME:", "B", "R", "SIDARTH", "CHAKRAVARTHY", "BHEEM", "RAO", "SIDHARTH"]
    },
    {
        name: "TEL3",
        text: "I, Amit Kumar Jai Narayan Chaubey S/o Jai Narayan Chaubey was Resident of Present Address A2/27 Mayuri Apartment Mayur Marg Opposite Hyderabad Public School Begumpet Hyderabad 500016 Has Changed my Old Name Amit Kumar Jai Narayan Chaubey to New Name Amit Kumar Chaubey for all purposes.",
        actual: 6,
        bold_words: ["I,", "Amit", "Kumar", "Jai", "Narayan", "Chaubey", "Amit", "Kumar", "Chaubey"]
    },
    {
        name: "TEL4",
        text: "I, Pantulolla Nasiruddin R/o. 2-119, Gajulapet Dhobipet Dist Shankarpally KV Rangareddy, TS. Changed My Name As Shaik Nasiruddin S/o. Khajamiyan.",
        actual: 4,
        bold_words: ["I,", "Pantulolla", "Nasiruddin", "Shaik", "Nasiruddin"]
    },
    {
        name: "TEL5",
        text: "Lakkabathini Sridhar Rajesham S/o Rajesham R/o. H.No. 4-146, Mallial, Jagtial. I have changed my Name to Lakkabathini Sridhar S/o Rajesham.",
        actual: 4,
        bold_words: ["Lakkabathini", "Sridhar", "Rajesham", "S/o", "Lakkabathini", "Sridhar", "S/o", "Rajesham."]
    }
];

let baseWidths = {
    'a': 55, 'b': 55, 'c': 55, 'd': 55, 'e': 55, 'f': 28, 'g': 55, 
    'h': 55, 'i': 22, 'j': 22, 'k': 55, 'm': 83, 'n': 55, 'o': 55, 
    'p': 50, 'q': 55, 'r': 33, 's': 55, 'u': 55, 'v': 55, 'w': 72, 
    'x': 55, 'y': 55, 'z': 55, 'l': 22, 't': 28, 
    
    'A': 72, 'B': 72, 'C': 72, 'D': 72, 'E': 72, 'F': 72, 'G': 72, 
    'H': 72, 'J': 72, 'K': 72, 'L': 72, 'M': 83, 'N': 72, 'O': 72, 
    'P': 72, 'Q': 72, 'R': 72, 'S': 72, 'T': 72, 'U': 72, 'V': 72, 
    'X': 72, 'Y': 72, 'Z': 72, 'I': 28, 'W': 94, 
    
    '0': 55, '1': 55, '2': 55, '3': 55, '4': 55, '5': 55, 
    '6': 55, '7': 55, '8': 55, '9': 55, 
    
    ' ': 28, '.': 28, ',': 28, '-': 33, '*': 39, '&': 66, 
    '(': 33, ')': 33, '=': 55, '+': 55, '/': 28, '|': 28, 
    '@': 100, ':': 28, '"': 33, "'": 28, '#': 55
};

function getWordWidth(word, widths, isBold) {
    let width = 0;
    for (let i = 0; i < word.length; i++) {
        let w = widths[word[i]] !== undefined ? widths[word[i]] : 55;
        if (isBold) {
            w = Math.floor(w * 1.2);
        }
        width += w;
    }
    return width;
}

function wrapText(text, maxW, widths, bold_words) {
    const words = text.split(' ');
    let lines = 0;
    let currentW = 0;
    let spaceW = widths[' '];
    
    for (let i = 0; i < words.length; i++) {
        let word = words[i];
        let cleanWord = word.replace(/[.,()":]/g, '');
        let isBold = bold_words && (bold_words.includes(cleanWord) || bold_words.includes(word));
        
        let wWidth = getWordWidth(word, widths, isBold);
        
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
    return lines;
}

function optimize() {
    let bestMatches = 0;
    let bestWidths = {...baseWidths};
    let bestMaxW = 1400;
    
    for (let max_w = 1100; max_w <= 1600; max_w += 10) {
        let matches = 0;
        for (let t of texts) {
            if (wrapText(t.text, max_w, baseWidths, t.bold_words) === t.actual) {
                matches++;
            }
        }
        if (matches > bestMatches) {
            bestMatches = matches;
            bestMaxW = max_w;
        }
    }

    if (bestMatches === 5) {
        console.log("Found perfect match initially at " + bestMaxW);
        return;
    }
    
    let chars = Object.keys(baseWidths);
    
    for (let iter = 0; iter < 10000; iter++) {
        let tempWidths = {...bestWidths};
        for (let i = 0; i < 5; i++) {
            let c = chars[Math.floor(Math.random() * chars.length)];
            tempWidths[c] += Math.floor(Math.random() * 17) - 8;
            if (tempWidths[c] < 10) tempWidths[c] = 10;
        }
        
        for (let max_w = 1100; max_w <= 1600; max_w += 10) {
            let matches = 0;
            for (let t of texts) {
                if (wrapText(t.text, max_w, tempWidths, t.bold_words) === t.actual) {
                    matches++;
                }
            }
            if (matches > bestMatches) {
                bestMatches = matches;
                bestWidths = {...tempWidths};
                bestMaxW = max_w;
                console.log(`New best: ${matches}/5 at max_w ${max_w}`);
                if (matches === 5) {
                    console.log("Perfect match!");
                    console.log(JSON.stringify(bestWidths));
                    return;
                }
            }
        }
    }
    console.log("Best match was " + bestMatches + " at max_w " + bestMaxW);
}

optimize();
