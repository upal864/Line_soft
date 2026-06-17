/**
 * Times of India Line Calculator Engine
 * Ported for frontend visualization
 */
class TimesOfIndiaLineCalculator {
    constructor() {
        // Physical column max width for a standard TOI classified column
        this.TOI_COLUMN_MAX_WIDTH = 1440; // The optimized limit

        // Proportional character widths extracted from sample optimization
        this.charWidths = {"0":58,"1":52,"2":55,"3":55,"4":55,"5":55,"6":55,"7":55,"8":55,"9":55,"a":55,"b":55,"c":55,"d":55,"e":55,"f":28,"g":55,"h":55,"i":19,"j":22,"k":55,"m":83,"n":55,"o":55,"p":49,"q":55,"r":33,"s":50,"u":55,"v":55,"w":72,"x":55,"y":55,"z":55,"l":22,"t":28,"A":72,"B":71,"C":72,"D":72,"E":72,"F":72,"G":72,"H":72,"J":72,"K":73,"L":72,"M":83,"N":72,"O":72,"P":72,"Q":72,"R":72,"S":72,"T":72,"U":72,"V":72,"X":72,"Y":72,"Z":72,"I":33,"W":94," ":28,".":28,",":28,"-":33,"*":39,"&":66,"(":37,")":34,"=":55,"+":55,"/":28,"|":28,"@":100,":":28,"\"":30};

        // Standard billing characters per line for Times of India (from db)
        this.RATE_PER_LINE = 24; 
    }

    getCharWidth(char) {
        return this.charWidths[char] !== undefined ? this.charWidths[char] : 55;
    }

    getWordPixelWidth(word, isBold = false) {
        let width = 0;
        for (let i = 0; i < word.length; i++) {
            let w = this.getCharWidth(word[i]);
            if (isBold) {
                w = Math.floor(w * 1.2);
            }
            width += w;
        }
        return width;
    }

    /**
     * Calculates lines and returns the structured lines for visualization
     */
    calculateLayout(adText, boldWords = []) {
        if (!adText || adText.trim() === '') return { linesCount: 0, layout: [] };

        const words = adText.trim().split(/\s+/);
        const layout = [];
        let currentLine = [];
        let currentLineWidth = 0;
        const spaceWidth = this.getCharWidth(' ');

        for (let i = 0; i < words.length; i++) {
            const word = words[i];
            const cleanWord = word.replace(/[.,()":|]/g, '');
            const isBold = boldWords.includes(cleanWord) || boldWords.includes(word);
            
            const wordWidth = this.getWordPixelWidth(word, isBold);

            if (currentLineWidth === 0) {
                currentLineWidth += wordWidth;
                currentLine.push({ text: word, isBold: isBold });
            } 
            else if (currentLineWidth + spaceWidth + wordWidth <= this.TOI_COLUMN_MAX_WIDTH) {
                currentLineWidth += spaceWidth + wordWidth;
                currentLine.push({ text: word, isBold: isBold });
            } 
            else {
                layout.push(currentLine);
                currentLine = [{ text: word, isBold: isBold }];
                currentLineWidth = wordWidth;
            }
        }
        
        if (currentLine.length > 0) {
            layout.push(currentLine);
        }
        
        return { linesCount: layout.length, layout: layout };
    }

    calculateBilledLines(adText) {
        if (!adText || adText.trim() === '') return 0;
        return Math.ceil(adText.length / this.RATE_PER_LINE);
    }
}

// DOM Elements
const adTextInput = document.getElementById('adTextInput');
const boldWordsInput = document.getElementById('boldWordsInput');
const physicalLinesStat = document.getElementById('physicalLinesStat');
const billedLinesStat = document.getElementById('billedLinesStat');
const newspaperOutput = document.getElementById('newspaperOutput');

const engine = new TimesOfIndiaLineCalculator();

// Event Listeners
adTextInput.addEventListener('input', updateVisualizer);
boldWordsInput.addEventListener('input', updateVisualizer);

function updateVisualizer() {
    const text = adTextInput.value;
    const boldWordsString = boldWordsInput.value;
    let boldWords = boldWordsString.split(',').map(w => w.trim()).filter(w => w !== '');

    if (text.trim().length > 0) {
        const textWords = text.trim().split(/\s+/);
        const firstWord = textWords[0].replace(/[.,()":|]/g, '');
        
        // Always bold the first word
        if (!boldWords.includes(firstWord) && !boldWords.includes(textWords[0])) {
            boldWords.push(firstWord);
        }
        
        // If input is empty, auto-detect subsequent ALL CAPS words
        if (boldWordsString.trim() === '') {
            for(let i = 1; i < textWords.length; i++) {
                let clean = textWords[i].replace(/[.,()":|]/g, '');
                if (clean.length > 0 && clean === clean.toUpperCase() && clean.match(/[A-Z]/)) {
                    boldWords.push(clean);
                } else {
                    break; // Stop at first non-uppercase word
                }
            }
        }
    }

    // Default sample if empty to show the premium feel
    if (!text.trim()) {
        renderLayout([]);
        physicalLinesStat.innerText = '0';
        billedLinesStat.innerText = '0';
        return;
    }

    // Calculate
    const layoutData = engine.calculateLayout(text, boldWords);
    const billedLines = engine.calculateBilledLines(text);

    // Update Stats
    animateValue(physicalLinesStat, parseInt(physicalLinesStat.innerText), layoutData.linesCount, 300);
    animateValue(billedLinesStat, parseInt(billedLinesStat.innerText), billedLines, 300);

    // Render Layout
    renderLayout(layoutData.layout);
}

function renderLayout(lines) {
    newspaperOutput.innerHTML = '';
    
    const containerDiv = document.createElement('div');
    containerDiv.style.textAlign = 'justify';
    containerDiv.style.width = '100%';
    
    lines.forEach((lineArray) => {
        lineArray.forEach((wordObj) => {
            const span = document.createElement('span');
            span.innerText = wordObj.text;
            if (wordObj.isBold) {
                span.className = 'word-bold';
            }
            containerDiv.appendChild(span);
            containerDiv.appendChild(document.createTextNode(' '));
        });
    });
    
    newspaperOutput.appendChild(containerDiv);
}

function animateValue(obj, start, end, duration) {
    if (start === end) return;
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Init with a demo sample
window.onload = () => {
    adTextInput.value = "BDA Site at Arkavathi Layout for Sale First Block, Jakkur, Site No 1018 (North East Corner Site - very good for Vasthu) Measurement: (11.00 + 4.60)/2 (East to West) & 18 (North to South) = 140.40 Sq Mtrs. Total Area = 1511.27 Sq Ft. Site is 3 sides Surrounded by Roads with North 40ft East 40ft and South by 30ft 5 minutes approach to New Airport Road/up-coming Metro Station. Premier Locality with good infrastructure with Kaveri Water and surrounded by Sobha Academy, Opp to MSR Unicorn Heights. Contact No: 9845950789 & 9632577700";
    boldWordsInput.value = "BDA";
    updateVisualizer();
};
