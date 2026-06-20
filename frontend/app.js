/**
 * Times of India Line Calculator Engine
 * Ported for frontend visualization
 */
class TimesOfIndiaLineCalculator {
    constructor() {
        // Physical column max width for a standard TOI classified column
        this.TOI_COLUMN_MAX_WIDTH = 1380; // Perfectly fits DECOR and ROL2_2

        // Proportional character widths extracted from sample optimization
        this.charWidths = {"0":45,"1":45,"2":45,"3":45,"4":45,"5":45,"6":45,"7":45,"8":45,"9":45,"a":50,"b":55,"c":55,"d":50,"e":50,"f":28,"g":55,"h":55,"i":25,"j":22,"k":55,"m":83,"n":50,"o":60,"p":60,"q":55,"r":40,"s":55,"u":60,"v":55,"w":72,"x":55,"y":55,"z":55,"l":22,"t":28,"A":72,"B":71,"C":72,"D":72,"E":72,"F":72,"G":72,"H":72,"J":72,"K":73,"L":72,"M":83,"N":72,"O":72,"P":72,"Q":72,"R":72,"S":72,"T":72,"U":72,"V":72,"X":72,"Y":72,"Z":72,"I":33,"W":94," ":28,".":28,",":28,"-":33,"*":39,"&":66,"(":37,")":34,"=":55,"+":55,"/":28,"|":28,"@":100,":":28,"\"":30};

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
            let word = words[i];
            
            // Auto-capitalize the first word for TOI
            if (i === 0) {
                word = word.toUpperCase();
            }

            const cleanWord = word.replace(/[.,()":|]/g, '');
            let isBold = boldWords.includes(cleanWord) || boldWords.includes(word);
            if (boldWords.length === 0 && currentLineWidth === 0 && currentLine.length === 0 && layout.length === 0) {
                isBold = true;
            }
            
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

class TheHinduCalculator {
    constructor() {
        this.TOI_COLUMN_MAX_WIDTH = 1470; // Optimized column limit for The Hindu
        this.RATE_PER_LINE = 35; // The Hindu bills per 35 chars roughly, though strictly line based in UI

        // Base widths identical to optimized script
        this.base_widths = {
            'i': 18, 'l': 20, 'j': 20, 'f': 25, 't': 25, 'r': 30, 'I': 30,
            'm': 80, 'w': 70, 'M': 80, 'W': 85,
            'a': 50, 'b': 50, 'c': 50, 'd': 50, 'e': 50, 'g': 50, 'h': 50, 'n': 50, 'o': 50, 'p': 50, 'q': 50, 's': 45, 'u': 50, 'v': 50, 'x': 50, 'y': 50, 'z': 50,
            '0': 55, '1': 50, '2': 55, '3': 55, '4': 55, '5': 55, '6': 55, '7': 55, '8': 55, '9': 55,
            ' ': 25, '.': 25, ',': 25, '-': 30, '+': 50, '&': 60, '(': 30, ')': 30, ':': 25, '@': 85, '/': 30
        };
        // Caps are scaled by 0.8 for The Hindu condensed font
        const caps = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        for(let c of caps) {
            if (c === 'I') this.base_widths[c] = 24; // 30 * 0.8
            else if (c === 'M' || c === 'W') this.base_widths[c] = Math.floor((c === 'W'? 85: 80) * 0.8);
            else this.base_widths[c] = Math.floor(65 * 0.8); // standard cap 65
        }
        this.base_widths['I'] = 24;
        this.base_widths['M'] = 64;
        this.base_widths['W'] = 68;
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
        
        // Split by spaces, treating existing newlines as spaces
        const text = adText.replace(/\n/g, ' ');
        const words = text.split(' ').filter(w => w.trim() !== '');
        
        const layout = [];
        let currentLine = [];
        let currentLineWidth = 0;
        const spaceWidth = this.getCharWidth(' ');
        const hyphenWidth = this.getCharWidth('-');

        for (let i = 0; i < words.length; i++) {
            const word = words[i];
            const cleanWord = word.replace(/[.,()":|+&@\/-]/g, '');
            let isBold = boldWords.includes(cleanWord) || boldWords.includes(word);
            if (boldWords.length === 0 && currentLineWidth === 0 && currentLine.length === 0 && layout.length === 0) {
                isBold = true;
            }
            const wordWidth = this.getWordPixelWidth(word, isBold);

            if (currentLineWidth === 0) {
                currentLineWidth += wordWidth;
                currentLine.push({ text: word, isBold });
            } else if (currentLineWidth + spaceWidth + wordWidth <= this.TOI_COLUMN_MAX_WIDTH) {
                currentLineWidth += spaceWidth + wordWidth;
                currentLine.push({ text: word, isBold });
            } else {
                // Auto-Hyphenation Mathematical Simulator
                let canHyphenate = false;
                let remainingSpace = this.TOI_COLUMN_MAX_WIDTH - (currentLineWidth + spaceWidth + hyphenWidth);
                
                if (remainingSpace > 0 && word.length > 3) {
                    let fitChars = 0;
                    let testWidth = 0;
                    for (let cIdx = 0; cIdx < word.length; cIdx++) {
                        let cw = this.getCharWidth(word[cIdx]);
                        if (isBold) cw = Math.floor(cw * 1.2);
                        
                        if (testWidth + cw <= remainingSpace) {
                            testWidth += cw;
                            fitChars++;
                        } else {
                            break;
                        }
                    }
                    
                    if (fitChars >= 2 && (word.length - fitChars) >= 2) {
                        canHyphenate = true;
                        
                        // Add first part with hyphen
                        currentLine.push({ text: word.substring(0, fitChars) + '-', isBold, isHyphenated: true });
                        layout.push(currentLine);
                        
                        // Remaining goes to next line
                        let remainingWord = word.substring(fitChars);
                        currentLine = [{ text: remainingWord, isBold }];
                        currentLineWidth = this.getWordPixelWidth(remainingWord, isBold);
                    }
                }
                
                if (!canHyphenate) {
                    layout.push(currentLine);
                    currentLine = [{ text: word, isBold }];
                    currentLineWidth = wordWidth;
                }
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

class HindustanTimesCalculator {
    constructor() {
        this.TOI_COLUMN_MAX_WIDTH = 1400; // Perfect mathematical limit for HT
        this.RATE_PER_LINE = 25; // HT bills per 25 chars average

        this.base_widths = {
            'i': 18, 'l': 20, 'j': 20, 'f': 25, 't': 25, 'r': 30, 'I': 30,
            'm': 80, 'w': 70, 'M': 80, 'W': 85,
            'a': 40, 'b': 40, 'c': 40, 'd': 40, 'e': 40, 'g': 40, 'h': 40, 'n': 40, 'o': 40, 'p': 40, 'q': 40, 's': 40, 'u': 40, 'v': 40, 'x': 40, 'y': 40, 'z': 40,
            ' ': 20, '.': 25, ',': 25, '-': 30, '+': 50, '&': 60, '(': 30, ')': 30, ':': 25, '@': 85, '/': 30, '#': 60
        };
        
        // HT specific widths for Caps
        const caps = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        for(let c of caps) {
            if (this.base_widths[c]) {
                this.base_widths[c] = Math.floor(this.base_widths[c] * 0.75); // scale I, M, W
            } else {
                this.base_widths[c] = 50; // exact python fallback
            }
        }
        // HT specific widths for Digits
        const digits = '0123456789';
        for(let d of digits) {
            this.base_widths[d] = 50; // exact python fallback
        }
    }

    getCharWidth(char) { 
        return this.base_widths[char] !== undefined ? this.base_widths[char] : 40; 
    }
    
    getWordPixelWidth(word, isBold = false) {
        let width = 0;
        for (let i = 0; i < word.length; i++) {
            width += this.getCharWidth(word[i]);
        }
        // Hindustan Times bold letters do not take up significantly more horizontal space
        return isBold ? Math.floor(width * 1.0) : width;
    }

    calculateLayout(adText, boldWords = []) {
        if (!adText || adText.trim() === '') return { linesCount: 0, layout: [] };
        
        const rawWords = adText.replace(/\n/g, ' ').split(' ');
        const tokens = [];
        for (let w of rawWords) {
            if (w.trim() === '') continue;
            // HT does not aggressively hyphen-split natively in the samples
            tokens.push({ text: w, hasPrecedingSpace: true });
        }
        
        const layout = [];
        let currentLine = [];
        let currentLineWidth = 0;
        const spaceWidth = this.getCharWidth(' ');

        for (let i = 0; i < tokens.length; i++) {
            const token = tokens[i];
            const cleanWord = token.text.replace(/[.,():+&@\/-]/g, '');
            let isBold = boldWords.includes(cleanWord) || boldWords.includes(token.text);
            if (boldWords.length === 0 && currentLineWidth === 0 && currentLine.length === 0 && layout.length === 0) {
                isBold = true;
            }
            const wordWidth = this.getWordPixelWidth(token.text, isBold);
            const totalWidth = wordWidth + (token.hasPrecedingSpace && currentLine.length > 0 ? spaceWidth : 0);

            if (currentLineWidth === 0) {
                currentLineWidth += totalWidth;
                currentLine.push({ text: token.text, isBold, hasPrecedingSpace: false });
            } else if (currentLineWidth + totalWidth <= this.TOI_COLUMN_MAX_WIDTH) {
                currentLineWidth += totalWidth;
                currentLine.push({ text: token.text, isBold, hasPrecedingSpace: token.hasPrecedingSpace });
            } else {
                layout.push(currentLine);
                currentLine = [{ text: token.text, isBold, hasPrecedingSpace: false }];
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

class EconomicTimesCalculator {
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
        return isBold ? Math.floor(width * 1.6) : width;
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
            let isBold = boldWords.includes(cleanWord) || boldWords.includes(word);
            if (boldWords.length === 0 && currentLineWidth === 0 && currentLine.length === 0 && layout.length === 0) {
                isBold = true;
            }
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

class MirrorCalculator {
    constructor() {
        this.TOI_COLUMN_MAX_WIDTH = 1310; // Optimized column limit for Mirror
        this.RATE_PER_LINE = 27; // Mirror bills per 27 chars average

        this.base_widths = {
            'i': 18, 'l': 20, 'j': 20, 'f': 25, 't': 25, 'r': 30, 'I': 30,
            'm': 80, 'w': 70, 'M': 80, 'W': 85,
            'a': 50, 'b': 50, 'c': 50, 'd': 50, 'e': 50, 'g': 50, 'h': 50, 'n': 50, 'o': 50, 'p': 50, 'q': 50, 's': 45, 'u': 50, 'v': 50, 'x': 50, 'y': 50, 'z': 50,
            ' ': 20, '.': 25, ',': 25, '-': 30, '+': 50, '&': 60, '(': 30, ')': 30, ':': 25, '@': 85, '/': 30
        };
        
        // Mirror does NOT scale Caps (scale=1.0)
        const caps = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        for(let c of caps) {
            if (!this.base_widths[c]) {
                this.base_widths[c] = 65;
            }
        }
        
        // Mirror scales Digits by 0.9
        const digits = '0123456789';
        for(let d of digits) {
            // Number '1' is natively 50 in TOI, others are 55.
            const baseDigitWidth = (d === '1') ? 50 : 55;
            this.base_widths[d] = Math.floor(baseDigitWidth * 0.9);
        }
    }

    getCharWidth(char) { 
        return this.base_widths[char] !== undefined ? this.base_widths[char] : 50; 
    }
    
    getWordPixelWidth(word, isBold = false, isFirstWord = false) {
        let width = 0;
        for (let i = 0; i < word.length; i++) {
            width += this.getCharWidth(word[i]);
        }
        if (isFirstWord && isBold) {
            return Math.floor(width * 1.6);
        }
        return isBold ? Math.floor(width * 1.2) : width;
    }

    calculateLayout(adText, boldWords = []) {
        if (!adText || adText.trim() === '') return { linesCount: 0, layout: [] };
        
        const rawWords = adText.replace(/\n/g, ' ').split(' ');
        const tokens = [];
        for (let w of rawWords) {
            if (w.trim() === '') continue;
            tokens.push({ text: w, hasPrecedingSpace: true });
        }
        
        const layout = [];
        let currentLine = [];
        let currentLineWidth = 0;
        const spaceWidth = this.getCharWidth(' ');

        for (let t of tokens) {
            const word = t.text;
            const cleanWord = word.replace(/[.,()":|+&@\/-]/g, '');
            let isBold = boldWords.includes(cleanWord) || boldWords.includes(word);
            if (boldWords.length === 0 && currentLineWidth === 0 && currentLine.length === 0 && layout.length === 0) {
                isBold = true;
            }
            const isFirstWord = (layout.length === 0 && currentLine.length === 0);
            const wordWidth = this.getWordPixelWidth(word, isBold, isFirstWord);
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

class IndianExpressCalculator {
    constructor() {
        this.TOI_COLUMN_MAX_WIDTH = 950;
        this.RATE_PER_LINE = 27; // IE typically standard rate
        
        // Use general Arial/Helvetica widths for sans-serif
        this.base_widths = {
            'i': 22, 'l': 22, 'j': 22, 'f': 28, 't': 28, 'r': 33, 'I': 25,
            'm': 83, 'w': 72, 'M': 75, 'W': 75,
            'a': 55, 'b': 55, 'c': 55, 'd': 55, 'e': 55, 'g': 55, 'h': 55, 'n': 55, 'o': 55, 'p': 55, 'q': 55, 's': 50, 'u': 55, 'v': 55, 'x': 55, 'y': 55, 'z': 55,
            ' ': 20, '.': 25, ',': 25, '-': 33, '+': 55, '&': 66, '(': 33, ')': 33, ':': 28, '@': 90, '/': 28
        };
        const caps = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        for (let c of caps) {
            if (!this.base_widths[c]) this.base_widths[c] = 60;
        }
        for (let d of '0123456789') {
            this.base_widths[d] = 55;
        }
    }

    getCharWidth(char) {
        return this.base_widths[char] || 50;
    }

    getWordPixelWidth(word, isBold = false, isFirstWord = false) {
        let width = 0;
        for (let char of word) {
            width += this.getCharWidth(char);
        }
        if (isFirstWord && isBold) {
            return Math.floor(width * 1.5); // Takes somewhat an extra line, big drop cap
        }
        if (isBold) width = Math.floor(width * 1.1);
        return width;
    }

    getTokens(text) {
        const words = text.trim().split(/(\s+)/);
        const tokens = [];
        for (let w of words) {
            if (w.trim() === '') continue;
            const hasSpace = (tokens.length > 0);
            
            if (w.includes('-') && w !== '-') {
                const parts = w.split('-');
                for (let i = 0; i < parts.length; i++) {
                    const p = parts[i];
                    if (i < parts.length - 1) {
                        tokens.push({ text: p + '-', hasPrecedingSpace: i === 0 ? hasSpace : false });
                    } else if (p) {
                        tokens.push({ text: p, hasPrecedingSpace: i === 0 ? hasSpace : false });
                    }
                }
            } else {
                tokens.push({ text: w, hasPrecedingSpace: hasSpace });
            }
        }
        return tokens;
    }

    calculateLayout(adText, boldWords = []) {
        if (!adText || adText.trim() === '') return { linesCount: 0, layout: [] };
        const tokens = this.getTokens(adText);
        const layout = [];
        let currentLine = [];
        let currentLineWidth = 0;
        const spaceWidth = 20;

        for (let t of tokens) {
            const word = t.text;
            const cleanWord = word.replace(/[.,()":|+&@\/-]/g, '');
            let isBold = boldWords.includes(cleanWord) || boldWords.includes(word);
            // Always bold the very first token for TOI if no custom bold words are provided
            if (boldWords.length === 0 && currentLineWidth === 0 && currentLine.length === 0 && layout.length === 0) {
                isBold = true;
            }
            const isFirstWord = (layout.length === 0 && currentLineWidth === 0 && currentLine.length === 0);
            const wordWidth = this.getWordPixelWidth(word, isBold, isFirstWord);
            const spacing = t.hasPrecedingSpace ? spaceWidth : 0;

            if (currentLineWidth === 0) {
                currentLineWidth += wordWidth;
                currentLine.push({ text: word, isBold, hasPrecedingSpace: t.hasPrecedingSpace });
            } else if (currentLineWidth + spacing + wordWidth <= this.TOI_COLUMN_MAX_WIDTH) {
                currentLineWidth += spacing + wordWidth;
                currentLine.push({ text: word, isBold, hasPrecedingSpace: t.hasPrecedingSpace });
            } else {
                // Check if we can hyphenate word
                let canHyphenate = false;
                if (word.length > 4 && !word.includes('-')) {
                    const hyphenWidth = this.getCharWidth('-');
                    const remainingSpace = this.TOI_COLUMN_MAX_WIDTH - (currentLineWidth + spacing + hyphenWidth);
                    if (remainingSpace > 0) {
                        for (let i = word.length - 2; i > 1; i--) {
                            const part1 = word.substring(0, i);
                            const part2 = word.substring(i);
                            const p1Width = this.getWordPixelWidth(part1, isBold, isFirstWord);
                            if (p1Width <= remainingSpace) {
                                currentLine.push({ text: part1 + '-', isBold, hasPrecedingSpace: t.hasPrecedingSpace });
                                layout.push(currentLine);
                                currentLine = [{ text: part2, isBold, hasPrecedingSpace: false }];
                                currentLineWidth = this.getWordPixelWidth(part2, isBold, false);
                                canHyphenate = true;
                                break;
                            }
                        }
                    }
                }
                if (!canHyphenate) {
                    layout.push(currentLine);
                    currentLine = [{ text: word, isBold, hasPrecedingSpace: t.hasPrecedingSpace }];
                    currentLineWidth = wordWidth;
                }
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

// DOM Elements
const adTextInput = document.getElementById('adTextInput');
const boldWordsInput = document.getElementById('boldWordsInput');
const newspaperSelect = document.getElementById('newspaperSelect');
const physicalLinesStat = document.getElementById('physicalLinesStat');
const billedLinesStat = document.getElementById('billedLinesStat');
const newspaperOutput = document.getElementById('newspaperOutput');
const columnHeader = document.querySelector('.column-header');
const billedLinesSubtitle = document.querySelector('.stat-card.secondary .stat-subtitle');

// Engine Factory
function getEngine(newspaperId) {
    switch(newspaperId) {
        case 'hindu': return new TheHinduCalculator();
        case 'ht': return new HindustanTimesCalculator();
        case 'et': return new EconomicTimesCalculator();
        case 'mirror': return new MirrorCalculator();
        case 'ie': return new IndianExpressCalculator();
        case 'mt':
        case 'toi': 
        default: 
            return new TimesOfIndiaLineCalculator();
    }
}

let engine = getEngine('toi');

// Event Listeners
adTextInput.addEventListener('input', updateVisualizer);
boldWordsInput.addEventListener('input', updateVisualizer);
newspaperSelect.addEventListener('change', (e) => {
    engine = getEngine(e.target.value);
    
    // Update UI headers
    const names = {
        'toi': 'TOI Classifieds',
        'et': 'Economic Times',
        'mt': 'Maharashtra Times',
        'mirror': 'Mirror Classifieds',
        'hindu': 'The Hindu Classifieds',
        'ht': 'HT Classifieds',
        'ie': 'The Indian Express'
    };
    
    // Brand colors for the "Microsite Illusion"
    const colors = {
        'toi': '#ef4444',     // Red
        'et': '#ea580c',      // Orange/Salmon
        'mt': '#f97316',      // Saffron/Orange
        'mirror': '#b91c1c',  // Dark Red
        'hindu': '#3b82f6',   // Blue
        'ht': '#0ea5e9',      // Light Blue
        'ie': '#dc2626'       // Strong Red
    };
    
    columnHeader.innerText = names[e.target.value];
    document.documentElement.style.setProperty('--header-color', colors[e.target.value] || '#ef4444');
    billedLinesSubtitle.innerText = `Based on ${engine.RATE_PER_LINE} chars/line`;
    
    const columnWrapper = document.querySelector('.column-wrapper');
    
    // Reset any specific persistent styles
    newspaperOutput.style.letterSpacing = "normal";
    newspaperOutput.style.lineHeight = "normal";
    newspaperOutput.style.backgroundColor = "";
    newspaperOutput.style.color = "";
    newspaperOutput.style.padding = "0px";

    // Update font visually to match actual newspaper
    if (e.target.value === 'hindu') {
        newspaperOutput.style.fontFamily = "'Arial', Helvetica, sans-serif";
        newspaperOutput.style.fontSize = "13px";
        columnWrapper.style.width = "255px"; 
    } else if (e.target.value === 'et') {
        newspaperOutput.style.fontFamily = "'Arial', Helvetica, sans-serif";
        newspaperOutput.style.fontSize = "12.5px";
        columnWrapper.style.width = "230px"; // Increased from 190px to prevent smashed words
    } else if (e.target.value === 'mirror') {
        newspaperOutput.style.fontFamily = "'Times New Roman', Times, serif";
        newspaperOutput.style.fontSize = "13px";
        columnWrapper.style.width = "260px";
    } else if (e.target.value === 'ie') {
        newspaperOutput.style.fontFamily = "'Arial', Helvetica, sans-serif";
        newspaperOutput.style.fontSize = "12.5px";
        columnWrapper.style.width = "250px"; 
    } else if (e.target.value === 'ht') {
        newspaperOutput.style.fontFamily = "'Arial Narrow', 'Roboto Condensed', 'Franklin Gothic Medium Cond', sans-serif";
        newspaperOutput.style.fontSize = "13px"; // Slightly larger but condensed
        newspaperOutput.style.letterSpacing = "-0.2px"; // Tighter letter spacing
        newspaperOutput.style.lineHeight = "1.2";
        columnWrapper.style.width = "260px"; // Increased from 225px to stop clipping text
    } else { // Times of India (TOI) and Maharashtra Times (MT)
        newspaperOutput.style.fontFamily = "'Times New Roman', 'Times', 'Georgia', serif";
        newspaperOutput.style.fontSize = "13.5px";
        newspaperOutput.style.letterSpacing = "-0.1px";
        newspaperOutput.style.lineHeight = "1.15";
        
        // Newsprint realism
        newspaperOutput.style.backgroundColor = "#fdfcf8";
        newspaperOutput.style.color = "#1a1a1a";
        newspaperOutput.style.padding = "5px"; // Slight padding for the paper effect
        
        columnWrapper.style.width = "240px"; // Default TOI width
    }
    
    // Update sample text for Hindu and ET for testing
    if (e.target.value === 'hindu') {
        adTextInput.value = "WANTED: HOUSEKEEPER Full-Time. (Male/Female) Trustworthy & energetic individual for daily chores (cleaning, organizing, maintenance). Full boarding + excellent salary & job security. Refs Required. Wanted: Brahmin Cook Full-Time, (Male/Female). Must be clean, hygienic & passionate about veg cooking (South Indian + North Indian expertise preferred). Premium independent accommodation + excellent salary. Ref required. Apply via email and passport size pic. Contact: travel.companionship.2026@gmail.com";
        boldWordsInput.value = "WANTED:, HOUSEKEEPER";
    } else if (e.target.value === 'et') {
        adTextInput.value = "I, Dhruv Pandey S/o Karunesh Kumar Pandey, R/o Plot No. 108, Saraswati Vihar, Govindpuram, Ghaziabad, UP-201013, inform that Plot No. 22, Khasra No. 5, Village Dasna, (Ledger No. 1, Volume No. 7065, Page No. 330 to 343, Number 4845, dated 16/08/2007, Sub-Registrar First, Ghaziabad, is registered and the possession letter, Book No. 1, Volume No. 9262, Page No. 101 to 134, Number 7086, dated 02/11/2011, is lost somewhere. Whoever finds it, please contact the above address.";
        boldWordsInput.value = "I,";
    } else if (e.target.value === 'ht') {
        adTextInput.value = "LOST ORIGINAL Sale Deed Regd. as Doc. No. 12289 Dt. 07/12/2012 with SR-I, Delhi, of Second Floor of Prop. No.157, Mg.160 Sq.Yds., Vivekanand Puri, Delhi-7 stands in name of Rajan Sarin & Rohit Sarin vide NCR Lodged LR No. 375284/2026 dt.16/06/2026. Finder Please Contact: Pooja Kapoor # 9811043464 / 8860309020.";
        boldWordsInput.value = "LOST, ORIGINAL";
    }
    
    updateVisualizer();
});

function updateVisualizer() {
    const text = adTextInput.value;
    const boldWordsString = boldWordsInput.value;
    let boldWords = boldWordsString.split(',').map(w => w.trim()).filter(w => w !== '');

    if (text.trim().length > 0) {
        const textWords = text.trim().split(/\s+/);
        const firstWord = textWords[0].replace(/[.,()":|+&\/-]/g, '');
        
        // Always bold the first word if no explicit bold words are given
        if (boldWords.length === 0) {
            // We will handle the first word bolding directly in the calculator engine
            // by passing a special flag or just letting the engine know.
            // Actually, we can just add a special symbol to the first word! 
            // Or better yet, just modify the engines to always bold the first word.
        }
        
        // If input is empty, auto-detect subsequent ALL CAPS words
        if (boldWordsString.trim() === '') {
            // Check if the text is mostly uppercase. If so, it's likely the user just typed in caps lock
            // and we shouldn't treat all uppercase words as the "bold intro phrase".
            let upperCount = 0;
            for (let w of textWords) {
                if (w === w.toUpperCase() && w.match(/[A-Z]/)) upperCount++;
            }
            
            if (upperCount < textWords.length * 0.5) { // Only auto-bold if uppercase words are a minority
                for(let i = 1; i < Math.min(textWords.length, 6); i++) { // Max 6 words for an intro phrase
                    let clean = textWords[i].replace(/[.,()":|+&\/-]/g, '');
                    if (clean.length > 0 && clean === clean.toUpperCase() && clean.match(/[A-Z]/)) {
                        boldWords.push(clean);
                    } else {
                        break; // Stop at first non-uppercase word
                    }
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
    
    // Hindustan Times uses ragged right (left-aligned) instead of full justification
    const isRaggedRight = (engine instanceof HindustanTimesCalculator);
    
    lines.forEach((lineArray, lineIdx) => {
        const lineDiv = document.createElement('div');
        lineDiv.style.display = 'flex';
        lineDiv.style.width = '100%';
        lineDiv.style.whiteSpace = 'nowrap';
        lineDiv.style.marginBottom = '0px';
        
        // Use space-between to perfectly justify text for most papers
        // Use flex-start for ragged right papers (HT) or the last line of any paper
        if (isRaggedRight || lineIdx === lines.length - 1) {
            lineDiv.style.justifyContent = 'flex-start';
            // Scale gap based on font density
            lineDiv.style.gap = isRaggedRight ? '4px' : '5px'; 
        } else {
            lineDiv.style.justifyContent = 'space-between';
        }

        lineArray.forEach((wordObj, wordIdx) => {
            const span = document.createElement('span');
            span.innerText = wordObj.text;
            if (wordObj.isBold) {
                span.className = 'word-bold';
            }
            
            // Ensure the first word is uppercase for TOI
            if (lineIdx === 0 && wordIdx === 0 && document.getElementById('newspaperSelect').value === 'toi') {
                span.style.textTransform = 'uppercase';
            }
            
            // Render the massive Drop-Cap-like first word for ET and Mirror
            if (lineIdx === 0 && wordIdx === 0 && (document.getElementById('newspaperSelect').value === 'et' || document.getElementById('newspaperSelect').value === 'mirror')) {
                span.style.fontSize = '130%';
                span.style.letterSpacing = '1px';
            }
            
            lineDiv.appendChild(span);
        });
        
        newspaperOutput.appendChild(lineDiv);
    });
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
