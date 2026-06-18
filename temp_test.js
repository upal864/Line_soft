
class TheHinduCalculator { constructor() {} }
 {
    constructor() {
        this.TOI_COLUMN_MAX_WIDTH = 1240; // Optimized column limit for ET
        this.RATE_PER_LINE = 25; // ET bills per 25 chars average

        this.base_widths = {
            'i': 18, 'l': 20, 'j': 20, 'f': 25, 't': 25, 'r': 30, 'I': 30,
            'm': 80, 'w': 70, 'M': 80, 'W': 85,
            'a': 50, 'b': 50, 'c': 50, 'd': 50, 'e': 50, 'g': 50, 'h': 50, 'n': 50, 'o': 50, 'p': 50, 'q': 50, 's': 45, 'u': 50, 'v': 50, 'x': 50, 'y': 50, 'z': 50,
            ' ': 25, '.': 25, ',': 25, '-': 30, '+': 50, '&': 60, '(': 30, ')': 30, ':': 25, '@': 85, '/': 30
        };
        
        // ET scales Caps by 0.8
        const caps = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        for(let c of caps) {
            if (this.base_widths[c]) {
                this.base_widths[c] = Math.floor(this.base_widths[c] * 0.8);
            } else {
                this.base_widths[c] = Math.floor(65 * 0.8);
            }
        }
        // ET scales Digits by 0.8
        const digits = '0123456789';
        for(let d of digits) {
            this.base_widths[d] = Math.floor(55 * 0.8);
        }
    }

    getCharWidth(char) { 
        return this.base_widths[char] !== undefined ? this.base_widths[char] : 50; 
    }
    
    getWordPixelWidth(word, isBold = false) {
        let width = 0;
        for (let i = 0; i < word.length; i++) {
            width += this.getCharWidth(word[i]);
        }
        return isBold ? Math.floor(width * 1.2) : width;
    }

    calculateLayout(adText, boldWords = []) {
        if (!adText || adText.trim() === '') return { linesCount: 0, layout: [] };
        
        const rawWords = adText.replace(/\n/g, ' ').split(' ');
        const tokens = [];
        for (let w of rawWords) {
            if (w.trim() === '') continue;
            
            // Native Hyphen Split Logic
            if (w.includes('-') && w.indexOf('-') < w.length - 1) {
                const parts = w.split('-');
                for (let i = 0; i < parts.length; i++) {
                    let p = parts[i];
                    if (i < parts.length - 1) p += '-';
                    tokens.push({ text: p, hasPrecedingSpace: i === 0 });
                }
            } else {
                tokens.push({ text: w, hasPrecedingSpace: true });
            }
        }
        
        const layout = [];
        let currentLine = [];
        let currentLineWidth = 0;
        const spaceWidth = this.getCharWidth(' ');

        for (let t of tokens) {
            const word = t.text;
            const cleanWord = word.replace(/[.,()":|+&@\/-]/g, '');
            const isBold = boldWords.includes(cleanWord) || boldWords.includes(word);
            const wordWidth = this.getWordPixelWidth(word, isBold);
            const spacing = t.hasPrecedingSpace ? spaceWidth : 0;

            if (currentLineWidth === 0) {
                currentLineWidth += wordWidth;
                currentLine.push({ text: word, isBold, hasPrecedingSpace: t.hasPrecedingSpace });
            } else if (currentLineWidth + spacing + wordWidth <= this.TOI_COLUMN_MAX_WIDTH) {
                currentLineWidth += spacing + wordWidth;
                currentLine.push({ text: word, isBold, hasPrecedingSpace: t.hasPrecedingSpace });
            } else {
                layout.push(currentLine);
                currentLine = [{ text: word, isBold, hasPrecedingSpace: t.hasPrecedingSpace }];
                currentLineWidth = wordWidth;
            }
        }
        if (currentLine.length > 0) layout.push(currentLine);
        return { linesCount: layout.length, layout: layout };
    }

    calculateBilledLines(adText) {
        if (!adText || adText.trim() === '') return 0;
        return Math.ceil(adText.length / this.RATE_PER_LINE);
    }
}


const calc = new EconomicTimesCalculator();
const text = I, Dhruv Pandey S/o Karunesh Kumar Pandey, R/o Plot No. 108, Saraswati Vihar, Govindpuram, Ghaziabad, UP-201013, inform that Plot No. 22, Khasra No. 5, Village Dasna, (Ledger No. 1, Volume No. 7065, Page No. 330 to 343, Number 4845, dated 16/08/2007, Sub-Registrar First, Ghaziabad, is registered and the possession letter, Book No. 1, Volume No. 9262, Page No. 101 to 134, Number 7086, dated 02/11/2011, is lost somewhere. Whoever finds it, please contact the above address.;
console.log(calc.calculateLayout(text, ['I', 'I,']).linesCount);
