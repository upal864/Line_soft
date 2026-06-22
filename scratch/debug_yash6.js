class YashobhumiCalculator {
    constructor() {
        this.TOI_COLUMN_MAX_WIDTH = 1174;
    }

    getCharWidth(char) {
        if (['ा', 'િ', 'ી', 'ु', 'ू', 'ृ', 'े', 'ै', 'ो', 'ौ', '्', 'ं', 'ः', 'ँ', '़', 'ि', 'ी'].includes(char)) return 0;
        if (char >= '\u0900' && char <= '\u097F') return 56;
        if (char >= '0' && char <= '9') return 45;
        if (char >= 'A' && char <= 'Z') return 55;
        if (char >= 'a' && char <= 'z') return 45;
        if ([' ', '.', ',', '-', ':', '/', '(', ')', '!'].includes(char)) {
            if (char === ' ') return 15;
            return 25;
        }
        return 50;
    }

    getWordPixelWidth(word, isBold = false) {
        let width = 0;
        for (let i = 0; i < word.length; i++) {
            let w = this.getCharWidth(word[i]);
            if (isBold) w = Math.floor(w * 1.2);
            width += w;
        }
        return width;
    }

    calculateLayout(adText, boldWords = []) {
        adText = adText.replace(/\r\n/g, '\n').replace(/([^\n])\n([^\n])/g, '$1 $2');
        const paragraphs = adText.split(/\n+/);
        const finalLayout = [];
        let log = [];

        for (let p of paragraphs) {
            if (p.trim() === '') continue;
            const rawWords = p.split(' ');
            const tokens = [];
            
            for (let w of rawWords) {
                if (w.trim() === '') continue;
                
                let parts = [];
                let current = "";
                for (let i = 0; i < w.length; i++) {
                    current += w[i];
                    if ((w[i] === '-' || w[i] === '/') && i < w.length - 1) {
                        parts.push({ text: current, hasPrecedingSpace: parts.length === 0, orig: w });
                        current = "";
                    } else if (w[i] === '.' && i < w.length - 1) {
                        if (w[i+1].match(/[a-zA-Z0-9\u0900-\u097F]/)) {
                            parts.push({ text: current, hasPrecedingSpace: parts.length === 0, orig: w });
                            current = "";
                        }
                    }
                }
                if (current) {
                    parts.push({ text: current, hasPrecedingSpace: parts.length === 0, orig: w });
                }
                parts.forEach(p => tokens.push(p));
            }

            let currentLine = [];
            let currentLineWidth = 0;
            const spaceWidth = this.getCharWidth(' ');

            for (let t of tokens) {
                const word = t.text;
                const cleanWord = t.orig.replace(/[.,()":|+&@\/-]/g, '');
                const isBold = boldWords.includes(cleanWord) || boldWords.includes(t.orig);
                
                const wordWidth = this.getWordPixelWidth(word, isBold);
                const spacing = t.hasPrecedingSpace ? spaceWidth : 0;

                if (currentLineWidth === 0) {
                    currentLineWidth += wordWidth;
                    currentLine.push(word);
                    log.push(`Word: ${word}, Bold: ${isBold}, Width: ${wordWidth}, CurW: ${currentLineWidth}`);
                } 
                else if (currentLineWidth + spacing + wordWidth <= this.TOI_COLUMN_MAX_WIDTH) {
                    currentLineWidth += spacing + wordWidth;
                    currentLine.push(word);
                    log.push(`Word: ${word}, Bold: ${isBold}, Width: ${wordWidth}, Spacing: ${spacing}, CurW: ${currentLineWidth}`);
                } 
                else {
                    finalLayout.push(currentLine);
                    log.push(`--- LINE BREAK ---`);
                    currentLine = [word];
                    currentLineWidth = wordWidth;
                    log.push(`Word: ${word}, Bold: ${isBold}, Width: ${wordWidth}, CurW: ${currentLineWidth}`);
                }
            }
            if (currentLine.length > 0) {
                finalLayout.push(currentLine);
            }
        }
        return { log, linesCount: finalLayout.length };
    }
}

const engine = new YashobhumiCalculator();
const text = "बोरीवली (वे) स्टेशन के पास गार्डभर्ती 12 घंटा ड्यूटी- वेतन गार्ड- 22,000, सुपरवाईजर- 26,000/- (आयु- 45 वर्ष के अंदर) (महिने का 4 छुट्टी) संपर्क : 9324254338/ 8169833371";
const firstWord = text.split(/\s+/)[0].replace(/[.,()":|+&\/-]/g, '');
const res = engine.calculateLayout(text, [firstWord]);
console.log(res.log.join('\n'));
console.log("Lines:", res.linesCount);
