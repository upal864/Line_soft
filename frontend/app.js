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

        const paragraphs = adText.split('\n');
        const finalLayout = [];

        for (let p of paragraphs) {
            if (p.trim() === '') continue;
            const words = p.trim().split(/\s+/);
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
                    finalLayout.push(currentLine);
                    currentLine = [{ text: word, isBold: isBold }];
                    currentLineWidth = wordWidth;
                }
            }
            if (currentLine.length > 0) {
                finalLayout.push(currentLine);
            }
        }
        
        return { linesCount: finalLayout.length, layout: finalLayout };
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
        
        const paragraphs = adText.split('\n');
        const finalLayout = [];

        for (let p of paragraphs) {
            if (p.trim() === '') continue;
            const words = p.split(' ').filter(w => w.trim() !== '');
            let currentLine = [];
            let currentLineWidth = 0;
            const spaceWidth = this.getCharWidth(' ');
            const hyphenWidth = this.getCharWidth('-');

            for (let i = 0; i < words.length; i++) {
                const word = words[i];
                const cleanWord = word.replace(/[.,()":|+&@\/-]/g, '');
                const isBold = boldWords.includes(cleanWord) || boldWords.includes(word);
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
                            finalLayout.push(currentLine);
                            
                            // Remaining goes to next line
                            let remainingWord = word.substring(fitChars);
                            currentLine = [{ text: remainingWord, isBold }];
                            currentLineWidth = this.getWordPixelWidth(remainingWord, isBold);
                        }
                    }
                    
                    if (!canHyphenate) {
                        finalLayout.push(currentLine);
                        currentLine = [{ text: word, isBold }];
                        currentLineWidth = wordWidth;
                    }
                }
            }
            if (currentLine.length > 0) finalLayout.push(currentLine);
        }
        return { linesCount: finalLayout.length, layout: finalLayout };
    }

    calculateBilledLines(adText) {
        if (!adText || adText.trim() === '') return 0;
        return Math.ceil(adText.length / this.RATE_PER_LINE);
    }
}

class HindustanTimesCalculator extends TheHinduCalculator {
    constructor() {
        super();
        this.TOI_COLUMN_MAX_WIDTH = 1500; // Placeholder different width
        this.RATE_PER_LINE = 22; // Placeholder billing rate
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
        
        const paragraphs = adText.split('\n');
        const finalLayout = [];

        for (let p of paragraphs) {
            if (p.trim() === '') continue;
            const rawWords = p.split(' ');
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
                    finalLayout.push(currentLine);
                    currentLine = [{ text: word, isBold, hasPrecedingSpace: t.hasPrecedingSpace }];
                    currentLineWidth = wordWidth;
                }
            }
            if (currentLine.length > 0) finalLayout.push(currentLine);
        }
        return { linesCount: finalLayout.length, layout: finalLayout };
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
        
        const paragraphs = adText.split('\n');
        const finalLayout = [];

        for (let p of paragraphs) {
            if (p.trim() === '') continue;
            const rawWords = p.split(' ');
            const tokens = [];
            for (let w of rawWords) {
                if (w.trim() === '') continue;
                tokens.push({ text: w, hasPrecedingSpace: true });
            }
            
            let currentLine = [];
            let currentLineWidth = 0;
            const spaceWidth = this.getCharWidth(' ');

            for (let t of tokens) {
                const word = t.text;
                const cleanWord = word.replace(/[.,()":|+&@\/-]/g, '');
                const isBold = boldWords.includes(cleanWord) || boldWords.includes(word);
                const isFirstWord = (finalLayout.length === 0 && currentLine.length === 0);
                const wordWidth = this.getWordPixelWidth(word, isBold, isFirstWord);
                const spacing = t.hasPrecedingSpace ? spaceWidth : 0;

                if (currentLineWidth === 0) {
                    currentLineWidth += wordWidth;
                    currentLine.push({ text: word, isBold, hasPrecedingSpace: t.hasPrecedingSpace });
                } else if (currentLineWidth + spacing + wordWidth <= this.TOI_COLUMN_MAX_WIDTH) {
                    currentLineWidth += spacing + wordWidth;
                    currentLine.push({ text: word, isBold, hasPrecedingSpace: t.hasPrecedingSpace });
                } else {
                    finalLayout.push(currentLine);
                    currentLine = [{ text: word, isBold, hasPrecedingSpace: t.hasPrecedingSpace }];
                    currentLineWidth = wordWidth;
                }
            }
            if (currentLine.length > 0) finalLayout.push(currentLine);
        }
        return { linesCount: finalLayout.length, layout: finalLayout };
    }

    calculateBilledLines(adText) {
        if (!adText || adText.trim() === '') return 0;
        return Math.ceil(adText.length / this.RATE_PER_LINE);
    }
}

class MaharashtraTimesCalculator {
    constructor() {
        this.TOI_COLUMN_MAX_WIDTH = 1420; // Specific limit for Maharashtra Times column density
        this.RATE_PER_LINE = 24; // Maharashtra Times bills based on 24 characters per line average

        // Proportional character widths
        this.charWidths = {"0":58,"1":52,"2":55,"3":55,"4":55,"5":55,"6":55,"7":55,"8":55,"9":55,"a":55,"b":55,"c":55,"d":55,"e":55,"f":28,"g":55,"h":55,"i":19,"j":22,"k":55,"m":83,"n":55,"o":55,"p":49,"q":55,"r":33,"s":50,"u":55,"v":55,"w":72,"x":55,"y":55,"z":55,"l":22,"t":28,"A":72,"B":71,"C":72,"D":72,"E":72,"F":72,"G":72,"H":72,"J":72,"K":73,"L":72,"M":83,"N":72,"O":72,"P":72,"Q":72,"R":72,"S":72,"T":72,"U":72,"V":72,"X":72,"Y":72,"Z":72,"I":33,"W":94," ":28,".":28,",":28,"-":33,"*":39,"&":66,"(":37,")":34,"=":55,"+":55,"/":28,"|":28,"Q":100,":":28,"\"":30};
    }

    getCharWidth(char) {
        return this.charWidths[char] !== undefined ? this.charWidths[char] : 55;
    }

    getWordPixelWidth(word, isBold = false) {
        let width = 0;
        for (let i = 0; i < word.length; i++) {
            let char = word[i];
            let w = this.getCharWidth(char);
            
            if (isBold) {
                w = Math.floor(w * 1.2);
            }
            width += w;
        }
        return width;
    }

    calculateLayout(adText, boldWords = []) {
        if (!adText || adText.trim() === '') return { linesCount: 0, layout: [] };

        // Clean up accidental single newlines from copy-pasting, preserving intentional double newlines
        adText = adText.replace(/\r\n/g, '\n').replace(/([^\n])\n([^\n])/g, '$1 $2');

        const paragraphs = adText.split(/\n+/);
        const finalLayout = [];

        for (let p of paragraphs) {
            if (p.trim() === '') continue;
            const rawWords = p.split(' ');
            const tokens = [];
            for (let w of rawWords) {
                if (w.trim() === '') continue;
                
                // Splitting logic: split on hyphens, slashes, and dots (if they are intra-word)
                let parts = [];
                let current = "";
                for (let i = 0; i < w.length; i++) {
                    let char = w[i];
                    current += char;
                    if ((char === '-' || char === '/') && i < w.length - 1) {
                        parts.push({ text: current, hasPrecedingSpace: parts.length === 0 });
                        current = "";
                    } else if (char === '.' && i < w.length - 1) {
                        // Split at dot if followed by alphanumeric characters (like in email addresses or URLs)
                        if (/[a-zA-Z0-9]/.test(w[i + 1])) {
                            parts.push({ text: current, hasPrecedingSpace: parts.length === 0 });
                            current = "";
                        }
                    }
                }
                if (current) {
                    parts.push({ text: current, hasPrecedingSpace: parts.length === 0 });
                }

                for (let p of parts) {
                    tokens.push(p);
                }
            }

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
                    finalLayout.push(currentLine);
                    currentLine = [{ text: word, isBold, hasPrecedingSpace: t.hasPrecedingSpace }];
                    currentLineWidth = wordWidth;
                }
            }
            if (currentLine.length > 0) {
                finalLayout.push(currentLine);
            }
        }
        return { linesCount: finalLayout.length, layout: finalLayout };
    }

    calculateBilledLines(adText) {
        if (!adText || adText.trim() === '') return 0;
        return Math.ceil(adText.length / this.RATE_PER_LINE);
    }
}

class LokmatTimesCalculator {
    constructor() {
        this.TOI_COLUMN_MAX_WIDTH = 1480; 
        this.RATE_PER_LINE = 24; 
        this.charWidths = {"0":58,"1":52,"2":55,"3":55,"4":55,"5":55,"6":55,"7":55,"8":55,"9":55,"a":55,"b":55,"c":55,"d":55,"e":55,"f":28,"g":55,"h":55,"i":19,"j":22,"k":55,"m":83,"n":55,"o":55,"p":49,"q":55,"r":33,"s":50,"u":55,"v":55,"w":72,"x":55,"y":55,"z":55,"l":22,"t":28,"A":72,"B":71,"C":72,"D":72,"E":72,"F":72,"G":72,"H":72,"J":72,"K":73,"L":72,"M":83,"N":72,"O":72,"P":72,"Q":72,"R":72,"S":72,"T":72,"U":72,"V":72,"X":72,"Y":72,"Z":72,"I":33,"W":94," ":28,".":28,",":28,"-":33,"*":39,"&":66,"(":37,")":34,"=":55,"+":55,"/":28,"|":28,"Q":100,":":28,"\"":30};
    }

    getCharWidth(char) {
        // Handle Devanagari unicode characters (Marathi/Hindi)
        if (char >= '\u0900' && char <= '\u097F') {
            return 56;
        }
        return this.charWidths[char] !== undefined ? this.charWidths[char] : 55;
    }

    getWordPixelWidth(word, isBold = false) {
        let width = 0;
        for (let i = 0; i < word.length; i++) {
            let char = word[i];
            let w = this.getCharWidth(char);
            if (isBold) w = Math.floor(w * 1.2);
            width += w;
        }
        return width;
    }

    calculateLayout(adText, boldWords = []) {
        if (!adText || adText.trim() === '') return { linesCount: 0, layout: [] };

        adText = adText.replace(/\r\n/g, '\n').replace(/([^\n])\n([^\n])/g, '$1 $2');
        const paragraphs = adText.split(/\n+/);
        const finalLayout = [];

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
                        parts.push({ text: current, hasPrecedingSpace: parts.length === 0 });
                        current = "";
                    } else if (w[i] === '.' && i < w.length - 1) {
                        if (w[i+1].match(/[a-zA-Z0-9\u0900-\u097F]/)) {
                            parts.push({ text: current, hasPrecedingSpace: parts.length === 0 });
                            current = "";
                        }
                    }
                }
                if (current) {
                    parts.push({ text: current, hasPrecedingSpace: parts.length === 0 });
                }
                parts.forEach(p => tokens.push(p));
            }

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
                    finalLayout.push(currentLine);
                    currentLine = [{ text: word, isBold, hasPrecedingSpace: t.hasPrecedingSpace }];
                    currentLineWidth = wordWidth;
                }
            }
            if (currentLine.length > 0) finalLayout.push(currentLine);
        }
        return { linesCount: finalLayout.length, layout: finalLayout };
    }

    calculateBilledLines(adText) {
        if (!adText || adText.trim() === '') return 0;
        return Math.ceil(adText.length / this.RATE_PER_LINE);
    }
}

class TelanganaTodayCalculator {
    constructor() {
        this.TOI_COLUMN_MAX_WIDTH = 2380; // Optimized column limit for Telangana Today physical layout
        this.RATE_PER_LINE = 26; // Telangana Today bills based on 26 characters per line average (from DB)

        // Same base proportional kerning as TOI, just wider column bounds.
        this.charWidths = {"0":58,"1":52,"2":55,"3":55,"4":55,"5":55,"6":55,"7":55,"8":55,"9":55,"a":55,"b":55,"c":55,"d":55,"e":55,"f":28,"g":55,"h":55,"i":19,"j":22,"k":55,"m":83,"n":55,"o":55,"p":49,"q":55,"r":33,"s":50,"u":55,"v":55,"w":72,"x":55,"y":55,"z":55,"l":22,"t":28,"A":72,"B":71,"C":72,"D":72,"E":72,"F":72,"G":72,"H":72,"J":72,"K":73,"L":72,"M":83,"N":72,"O":72,"P":72,"Q":72,"R":72,"S":72,"T":72,"U":72,"V":72,"X":72,"Y":72,"Z":72,"I":33,"W":94," ":28,".":28,",":28,"-":33,"*":39,"&":66,"(":37,")":34,"=":55,"+":55,"/":28,"|":28,"Q":100,":":28,"\"":30};
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

    calculateLayout(adText, boldWords = []) {
        if (!adText || adText.trim() === '') return { linesCount: 0, layout: [] };

        const paragraphs = adText.split('\n');
        const finalLayout = [];

        for (let p of paragraphs) {
            if (p.trim() === '') continue;
            const words = p.trim().split(/\s+/);
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
                    finalLayout.push(currentLine);
                    currentLine = [{ text: word, isBold: isBold }];
                    currentLineWidth = wordWidth;
                }
            }
            if (currentLine.length > 0) {
                finalLayout.push(currentLine);
            }
        }
        
        return { linesCount: finalLayout.length, layout: finalLayout };
    }

    calculateBilledLines(adText) {
        if (!adText || adText.trim() === '') return 0;
        return Math.ceil(adText.length / this.RATE_PER_LINE);
    }
}

class NavGujaratSamayCalculator {
    constructor() {
        this.TOI_COLUMN_MAX_WIDTH = 1049;
        this.RATE_PER_LINE = 20; // typical billed rate for gujarati
        this.charWidths = {"0":22,"1":30,"2":30,"3":39,"4":39,"5":30,"6":30,"7":30,"8":30,"હ":58,"ુ":0,"ં":0,",":30," ":26,"ર":60,"્":0,"ષ":60,"ભ":60,"ા":20,"ઈ":69,"મ":60,"ે":0,"વ":60,"ળ":64,"ન":60,"ો":21,"જ":60,"પ":55,"ત":60,"૦":51,"૪":60,"/":60,"૬":60,"૨":60,"૩":65,"ધ":52,"ચ":56,"ક":68,"ડ":60,"ી":30,"ખ":60,"અ":60,"(":30,"૧":60,")":30,"સ":56,"ગ":55,"દ":60,"બ":60,"લ":60,"ય":60,"છ":51,".":39,"ણ":67,"થ":66,"-":30,"ૃ":0,"ટ":62,"ઢ":53,"ૂ":0,"૫":55,"િ":30,"ૌ":0,"એ":48,"આ":60,"ઝ":60,"શ":56,":":34,"ફ":64,"૮":66,"૭":60};
    }

    getCharWidth(char) {
        if (this.charWidths[char] !== undefined) {
            return this.charWidths[char];
        }
        // zero-width modifier fallbacks
        if (['ં', 'ઃ', 'ુ', 'ૂ', 'ૃ', 'ૄ', 'ૅ', 'ે', 'ૈ', 'ૉ', 'ો', 'ૌ', '્'].includes(char)) return 0;
        if (['ા', 'િ', 'ી'].includes(char)) return 20;
        return 60; // default base consonant
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

    calculateLayout(adText, boldWords = []) {
        const paragraphs = adText.split('\n');
        const finalLayout = [];

        for (let p of paragraphs) {
            if (p.trim() === '') continue;
            const words = p.trim().split(/\s+/);
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
                    finalLayout.push(currentLine);
                    currentLine = [{ text: word, isBold: isBold }];
                    currentLineWidth = wordWidth;
                }
            }
            if (currentLine.length > 0) {
                finalLayout.push(currentLine);
            }
        }
        
        return { linesCount: finalLayout.length, layout: finalLayout };
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
        case 'mt': return new MaharashtraTimesCalculator();
        case 'lokmat': return new LokmatTimesCalculator();
        case 'telangana': return new TelanganaTodayCalculator();
        case 'navgujarat': return new NavGujaratSamayCalculator();
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
        'lokmat': 'Lokmat Times',
        'telangana': 'Telangana Today',
        'navgujarat': 'Nav Gujarat Samay'
    };
    columnHeader.innerText = names[e.target.value];
    billedLinesSubtitle.innerText = `Based on ${engine.RATE_PER_LINE} chars/line`;
    
    // Update sample text for testing
    if (e.target.value === 'hindu') {
        adTextInput.value = "WANTED: HOUSEKEEPER Full-Time. (Male/Female) Trustworthy & energetic individual for daily chores (cleaning, organizing, maintenance). Full boarding + excellent salary & job security. Refs Required. Wanted: Brahmin Cook Full-Time, (Male/Female). Must be clean, hygienic & passionate about veg cooking (South Indian + North Indian expertise preferred). Premium independent accommodation + excellent salary. Ref required. Apply via email and passport size pic. Contact: travel.companionship.2026@gmail.com";
        boldWordsInput.value = "WANTED:, HOUSEKEEPER";
    } else if (e.target.value === 'et') {
        adTextInput.value = "I, Dhruv Pandey S/o Karunesh Kumar Pandey, R/o Plot No. 108, Saraswati Vihar, Govindpuram, Ghaziabad, UP-201013, inform that Plot No. 22, Khasra No. 5, Village Dasna, (Ledger No. 1, Volume No. 7065, Page No. 330 to 343, Number 4845, dated 16/08/2007, Sub-Registrar First, Ghaziabad, is registered and the possession letter, Book No. 1, Volume No. 9262, Page No. 101 to 134, Number 7086, dated 02/11/2011, is lost somewhere. Whoever finds it, please contact the above address.";
        boldWordsInput.value = "I,";
    } else if (e.target.value === 'mt') {
        adTextInput.value = "SHAYONA CORPORATION, a Government Contracting Firm, invites applications for: 1) CIVIL ENGINEER (Female) – 4-5 years of experience in estimation, project quantity surveying and billing roles 2) CIVIL ENGINEER (Male) – 4-5 years exp. primarily for site supervision and execution work. Location: Thane | Job Type: Permanent. Email: dhanashree.shayona@gmail.com / 8976221639 / 9324956699";
        boldWordsInput.value = "SHAYONA";
    } else if (e.target.value === 'lokmat') {
        adTextInput.value = "वॉर्डबॉय व सुपरवायझर कल्याणीनगर, पुणे येथील हॉस्पिटलसाठी पाहिजे. 8 तास ड्युटी, Over Time मिळेल पगार- 16,000/- ते 20,000 हातात. PF, ESIC, साप्ताहिक सुट्टी. संपर्क- 9552504513, 9552504520, 9552504510. (726823)";
        boldWordsInput.value = "वॉर्डबॉय";
    } else if (e.target.value === 'telangana') {
        adTextInput.value = "I, Amit Kumar Jai Narayan Chaubey S/o Jai Narayan Chaubey was Resident of Present Address A2/27 Mayuri Apartment Mayur Marg Opposite Hyderabad Public School Begumpet Hyderabad 500016 Has Changed my Old Name Amit Kumar Jai Narayan Chaubey to New Name Amit Kumar Chaubey for all purposes.";
        boldWordsInput.value = "I, Amit, Kumar, Jai, Narayan, Chaubey";
    } else if (e.target.value === 'navgujarat') {
        adTextInput.value = "હું, હર્ષભાઈ મેવાળા, મનોજભાઈ મેવાળાનો પુત્ર જન્મ ૦૪/૦૬/૨૦૦૩ ના રોજ ધારચોકાડી ખાતે રહેતો હતો, અને મેં (૧૦/૦૬/૨૦૨૬) ના સોગંદનામા દ્વારા (અમદાવાદ ) ખાતે મારું નામ બદલીને હર્ષ મેવાળા રાખ્યું છે.";
        boldWordsInput.value = "હું,";
    } else {
        adTextInput.value = "";
        boldWordsInput.value = "";
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
        
        // Always bold the first word
        if (!boldWords.includes(firstWord) && !boldWords.includes(textWords[0])) {
            boldWords.push(firstWord);
        }
        
        // If input is empty, auto-detect subsequent ALL CAPS words
        if (boldWordsString.trim() === '') {
            for(let i = 1; i < textWords.length; i++) {
                let clean = textWords[i].replace(/[.,()":|+&\/-]/g, '');
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

    // Update font and layout wrapper CSS visually to match actual newspaper
    const columnWrapper = document.querySelector('.column-wrapper');
    const npVal = newspaperSelect.value;
    
    let baseWidth = 240;
    let baseFontSize = 14;
    if (npVal === 'hindu') {
        newspaperOutput.style.fontFamily = "'Arial', Helvetica, sans-serif";
        baseFontSize = 13;
        baseWidth = 255;
    } else if (npVal === 'et') {
        newspaperOutput.style.fontFamily = "'Arial', Helvetica, sans-serif";
        baseFontSize = 12;
        baseWidth = 270;
    } else if (npVal === 'mirror') {
        newspaperOutput.style.fontFamily = "'Times New Roman', Times, serif";
        baseFontSize = 13;
        baseWidth = 260;
    } else if (npVal === 'lokmat') {
        newspaperOutput.style.fontFamily = "'Arial', Helvetica, sans-serif";
        baseFontSize = 14;
        baseWidth = 245;
    } else if (npVal === 'telangana') {
        newspaperOutput.style.fontFamily = "'Times New Roman', Times, serif";
        baseFontSize = 13;
        baseWidth = 340;
    } else if (npVal === 'navgujarat') {
        newspaperOutput.style.fontFamily = "'Hind Vadodara', 'Shruti', 'Arial Unicode MS', sans-serif";
        baseFontSize = 14;
        baseWidth = 260; // Adjust physical base width to visually balance the layout logic
    } else {
        newspaperOutput.style.fontFamily = "'Times New Roman', Times, serif";
        baseFontSize = 14;
        baseWidth = 240;
    }
    
    columnWrapper.style.width = baseWidth + "px";
    newspaperOutput.style.fontSize = baseFontSize + "px";

    // Calculate
    const layoutData = engine.calculateLayout(text, boldWords);
    const billedLines = engine.calculateBilledLines(text);

    // Update Stats
    animateValue(physicalLinesStat, parseInt(physicalLinesStat.innerText) || 0, layoutData.linesCount, 300);
    animateValue(billedLinesStat, parseInt(billedLinesStat.innerText) || 0, billedLines, 300);

    // Render Layout
    renderLayout(layoutData.layout);
}

function renderLayout(lines) {
    newspaperOutput.innerHTML = '';
    
    lines.forEach((lineArray, lineIdx) => {
        const lineDiv = document.createElement('div');
        lineDiv.style.display = 'flex';
        lineDiv.style.width = '100%';
        lineDiv.style.whiteSpace = 'nowrap';
        lineDiv.style.marginBottom = '0px';
        
        // Use space-between to perfectly justify text without relying on CSS text-align
        if (lineIdx === lines.length - 1) {
            lineDiv.style.justifyContent = 'flex-start';
            lineDiv.style.gap = '5px'; // Standard space size for the ragged last line
        } else {
            lineDiv.style.justifyContent = 'space-between';
        }

        lineArray.forEach((wordObj, wordIdx) => {
            const span = document.createElement('span');
            span.innerText = wordObj.text;
            if (wordObj.isBold) {
                span.className = 'word-bold';
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
