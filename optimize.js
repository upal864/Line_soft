const fs = require('fs');

let charWidths = {
    'a': 55, 'b': 55, 'c': 55, 'd': 55, 'e': 55, 'f': 28, 'g': 55, 
    'h': 55, 'i': 22, 'j': 22, 'k': 55, 'm': 83, 'n': 55, 'o': 55, 
    'p': 50, 'q': 55, 'r': 33, 's': 55, 'u': 55, 'v': 55, 'w': 72, 
    'x': 55, 'y': 55, 'z': 55, 'l': 22, 't': 28, 
    'A': 72, 'B': 72, 'C': 72, 'D': 72, 'E': 72, 'F': 72, 'G': 72, 
    'H': 72, 'J': 72, 'K': 72, 'L': 72, 'M': 83, 'N': 72, 'O': 72, 
    'P': 72, 'Q': 72, 'R': 72, 'S': 72, 'T': 72, 'U': 72, 'V': 72, 
    'X': 72, 'Y': 72, 'Z': 72, 'I': 28, 'W': 94, 
    '0': 59, '1': 55, '2': 55, '3': 55, '4': 55, '5': 55, 
    '6': 55, '7': 55, '8': 55, '9': 55, 
    ' ': 28, '.': 28, ',': 28, '-': 33, '*': 39, '&': 66, 
    '(': 37, ')': 33, '=': 55, '+': 55, '/': 28, '|': 28, 
    '@': 100, ':': 28, '"': 33
};

const samples = [
    { id: "ROL1", text: "LOCATION ivc road Ad matter Available sale of land 2400 sqft corner site at airport city 5 KMs from main airport road on IVC road in gated community for immediate sale ..only genuine buyer contact on 9342846707", boldWords: ["LOCATION"], expectedPhysical: 9 },
    { id: "ROL2_1", text: "RMV II stage, near Club, 50*90, Bungalow for sale, Prime Location, Asking 25 Cr, Contact 9845687913", boldWords: ["RMV", "II"], expectedPhysical: 4 },
    { id: "ROL2_2", text: "BDA Site at Arkavathi Layout for Sale First Block, Jakkur, Site No 1018 (North East Corner Site - very good for Vasthu) Measurement: (11.00 + 4.60)/2 (East to West) & 18 (North to South) = 140.40 Sq Mtrs. Total Area = 1511.27 Sq Ft. Site is 3 sides Surrounded by Roads with North 40ft East 40ft and South by 30ft 5 minutes approach to New Airport Road/up-coming Metro Station. Premier Locality with good infrastructure with Kaveri Water and surrounded by Sobha Academy, Opp to MSR Unicorn Heights. Contact No: 9845950789 & 9632577700", boldWords: ["BDA"], expectedPhysical: 19 },
    { id: "ROL3_1", text: "IMMEDIATE JOINING Only Female GNM/BSc Nurses for reputed School Medical Rooms at Gunjur-Varthur Road, Hulimavu and near Nice Road, Bannerghatta Road. Good Salary and Day Shift Job. To apply, WhatsApp your CV to 9591990945 or email: hr@addresshealth.com", boldWords: ["IMMEDIATE", "JOINING"], expectedPhysical: 10 },
    { id: "ROL3_2", text: "WE, Mr. Deepak Sugadan and Mrs. Anusri Deepak, residing at D-306, Vedant Vayun, Begur-Koppa Road, Bommanahalli, Bengaluru, Karnataka - 560068, parents of our minor son, hereby declare that the name of our son appearing as \"VIDYUT\" in Passport and as \"VIDYUT DEEPAK\" in Aadhaar and changing his name in the passport records from \"VIDYUT\" to \"VIDYUT DEEPAK\" for all future purposes", boldWords: ["WE,"], expectedPhysical: 15 },
    { id: "ROL4", text: "WE Are Hiring Distributor Market Growth Representatives for a leading Beverage Company for Mumbai | Thane | Vashi | Raigad | Palghar locations Interested candidates with experience of 1-5 Years in field sales can walk in for interview. Candidates with 2 Wheeler Preferred Salary: 15,000 Incentives up to 18,000 Interview scheduled on 16th & 17th June Time: 10:00 AM to 3:00 PM Venue: Kanakia Wall Street, A Wing 814, Chakala, Above KFC/Starbucks, Andheri (E), Mumbai", boldWords: ["WE", "Are", "Hiring"], expectedPhysical: 18 },
    { id: "ROL5", text: "MATH & Physics one to one Tuitions JEE (Main & Adv), NEET, MHCET, 11 th, 12 th. 99.50 Percentile in JEE 2026 Kapil Sir (B.tech) 7276767718", boldWords: ["MATH", "&", "Physics"], expectedPhysical: 5 }
];

function getWordPixelWidth(word, boldWords, widths) {
    let width = 0;
    const cleanWord = word.replace(/[.,()":|]/g, '');
    const isBold = boldWords.includes(cleanWord) || boldWords.includes(word);
    for (let i = 0; i < word.length; i++) {
        let w = widths[word[i]] !== undefined ? widths[word[i]] : 55;
        if (isBold) w = Math.floor(w * 1.2);
        width += w;
    }
    return width;
}

function calculatePhysicalLines(text, boldWords, maxWidth, widths) {
    if (!text || text.trim() === '') return 0;
    const words = text.split(' ');
    let lines = 0;
    let currentLineWidth = 0;
    const spaceWidth = widths[' '] || 28;

    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        const wordWidth = getWordPixelWidth(word, boldWords, widths);
        if (currentLineWidth === 0) {
            currentLineWidth += wordWidth;
            lines++;
        } else if (currentLineWidth + spaceWidth + wordWidth <= maxWidth) {
            currentLineWidth += spaceWidth + wordWidth;
        } else {
            lines++;
            currentLineWidth = wordWidth;
        }
    }
    return lines;
}

let bestMatches = 3;
let bestWidths = { ...charWidths };
let bestMaxWidth = 1400;

for (let i = 0; i < 50000; i++) {
    let tempWidths = { ...bestWidths };
    let keys = Object.keys(tempWidths);
    for (let j = 0; j < 5; j++) {
        let key = keys[Math.floor(Math.random() * keys.length)];
        tempWidths[key] += Math.floor(Math.random() * 11) - 5;
        if (tempWidths[key] < 10) tempWidths[key] = 10;
    }

    for (let maxW = 1350; maxW <= 1450; maxW += 10) {
        let matches = 0;
        for (let s of samples) {
            if (calculatePhysicalLines(s.text, s.boldWords, maxW, tempWidths) === s.expectedPhysical) {
                matches++;
            }
        }
        if (matches > bestMatches) {
            bestMatches = matches;
            bestWidths = { ...tempWidths };
            bestMaxWidth = maxW;
            console.log(`New best: ${matches}/7 at width ${maxW}`);
            if (matches === 7) break;
        }
    }
    if (bestMatches === 7) break;
}

console.log('Final Best Max Width:', bestMaxWidth);
console.log('Final Widths JSON:', JSON.stringify(bestWidths));
