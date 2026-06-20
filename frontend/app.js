/**
 * Combined Newspaper Line Calculator Engines
 * Ported for frontend visualization
 */

class TimesOfIndiaLineCalculator {
    constructor() {
        this.TOI_COLUMN_MAX_WIDTH = 1380; // Optimized TOI column max width
        this.charWidths = {"0":45,"1":45,"2":45,"3":45,"4":45,"5":45,"6":45,"7":45,"8":45,"9":45,"a":50,"b":55,"c":55,"d":50,"e":50,"f":28,"g":55,"h":55,"i":25,"j":22,"k":55,"m":83,"n":50,"o":60,"p":60,"q":55,"r":40,"s":55,"u":60,"v":55,"w":72,"x":55,"y":55,"z":55,"l":22,"t":28,"A":72,"B":71,"C":72,"D":72,"E":72,"F":72,"G":72,"H":72,"J":72,"K":73,"L":72,"M":83,"N":72,"O":72,"P":72,"Q":72,"R":72,"S":72,"T":72,"U":72,"V":72,"X":72,"Y":72,"Z":72,"I":33,"W":94," ":28,".":28,",":28,"-":33,"*":39,"&":66,"(":37,")":34,"=":55,"+":55,"/":28,"|":28,"@":100,":":28,"\"":30};
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

    calculateLayout(adText, boldWords = []) {
        if (!adText || adText.trim() === '') return { linesCount: 0, layout: [] };

        const paragraphs = adText.split('\n');
        const finalLayout = [];
        let isFirstWordOverall = true;

        for (let pIdx = 0; pIdx < paragraphs.length; pIdx++) {
            const p = paragraphs[pIdx];
            if (p.trim() === '') continue;
            const words = p.trim().split(/\s+/);
            let currentLine = [];
            let currentLineWidth = 0;
            const spaceWidth = this.getCharWidth(' ');

            for (let i = 0; i < words.length; i++) {
                let word = words[i];
                
                // Auto-capitalize the first word of the ad for TOI
                if (isFirstWordOverall) {
                    word = word.toUpperCase();
                }

                const cleanWord = word.replace(/[.,()":|]/g, '');
                let isBold = boldWords.includes(cleanWord) || boldWords.includes(word);
                if (boldWords.length === 0 && isFirstWordOverall) {
                    isBold = true;
                }
                
                isFirstWordOverall = false;

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
        this.RATE_PER_LINE = 35; // The Hindu bills per 35 chars roughly

        this.base_widths = {
            'i': 18, 'l': 20, 'j': 20, 'f': 25, 't': 25, 'r': 30, 'I': 30,
            'm': 80, 'w': 70, 'M': 80, 'W': 85,
            'a': 50, 'b': 50, 'c': 50, 'd': 50, 'e': 50, 'g': 50, 'h': 50, 'n': 50, 'o': 50, 'p': 50, 'q': 50, 's': 45, 'u': 50, 'v': 50, 'x': 50, 'y': 50, 'z': 50,
            '0': 55, '1': 50, '2': 55, '3': 55, '4': 55, '5': 55, '6': 55, '7': 55, '8': 55, '9': 55,
            ' ': 25, '.': 25, ',': 25, '-': 30, '+': 50, '&': 60, '(': 30, ')': 30, ':': 25, '@': 85, '/': 30
        };
        const caps = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        for(let c of caps) {
            if (c === 'I') this.base_widths[c] = 24; 
            else if (c === 'M' || c === 'W') this.base_widths[c] = Math.floor((c === 'W'? 85: 80) * 0.8);
            else this.base_widths[c] = Math.floor(65 * 0.8); 
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
        let isFirstWordOverall = true;

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
                let isBold = boldWords.includes(cleanWord) || boldWords.includes(word);
                if (boldWords.length === 0 && isFirstWordOverall) {
                    isBold = true;
                }
                isFirstWordOverall = false;

                const wordWidth = this.getWordPixelWidth(word, isBold);

                if (currentLineWidth === 0) {
                    currentLineWidth += wordWidth;
                    currentLine.push({ text: word, isBold });
                } else if (currentLineWidth + spaceWidth + wordWidth <= this.TOI_COLUMN_MAX_WIDTH) {
                    currentLineWidth += spaceWidth + wordWidth;
                    currentLine.push({ text: word, isBold });
                } else {
                    // Auto-Hyphenation Simulator
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
                            currentLine.push({ text: word.substring(0, fitChars) + '-', isBold, isHyphenated: true });
                            finalLayout.push(currentLine);
                            
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

class HindustanTimesCalculator {
    constructor() {
        this.TOI_COLUMN_MAX_WIDTH = 1400; // Optimized column limit for HT
        this.RATE_PER_LINE = 25; // HT average rate

        this.base_widths = {
            'i': 18, 'l': 20, 'j': 20, 'f': 25, 't': 25, 'r': 30, 'I': 30,
            'm': 80, 'w': 70, 'M': 80, 'W': 85,
            'a': 40, 'b': 40, 'c': 40, 'd': 40, 'e': 40, 'g': 40, 'h': 40, 'n': 40, 'o': 40, 'p': 40, 'q': 40, 's': 40, 'u': 40, 'v': 40, 'x': 40, 'y': 40, 'z': 40,
            ' ': 20, '.': 25, ',': 25, '-': 30, '+': 50, '&': 60, '(': 30, ')': 30, ':': 25, '@': 85, '/': 30, '#': 60
        };
        
        const caps = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        for(let c of caps) {
            if (this.base_widths[c]) {
                this.base_widths[c] = Math.floor(this.base_widths[c] * 0.75); 
            } else {
                this.base_widths[c] = 50; 
            }
        }
        for(let d of '0123456789') {
            this.base_widths[d] = 50; 
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
        return isBold ? Math.floor(width * 1.0) : width;
    }

    calculateLayout(adText, boldWords = []) {
        if (!adText || adText.trim() === '') return { linesCount: 0, layout: [] };
        
        const paragraphs = adText.split('\n');
        const finalLayout = [];
        let isFirstWordOverall = true;

        for (let p of paragraphs) {
            if (p.trim() === '') continue;
            const rawWords = p.replace(/\n/g, ' ').split(' ');
            const tokens = [];
            for (let w of rawWords) {
                if (w.trim() === '') continue;
                tokens.push({ text: w, hasPrecedingSpace: true });
            }
            
            let currentLine = [];
            let currentLineWidth = 0;
            const spaceWidth = this.getCharWidth(' ');

            for (let i = 0; i < tokens.length; i++) {
                const token = tokens[i];
                const cleanWord = token.text.replace(/[.,():+&@\/-]/g, '');
                let isBold = boldWords.includes(cleanWord) || boldWords.includes(token.text);
                if (boldWords.length === 0 && isFirstWordOverall) {
                    isBold = true;
                }
                isFirstWordOverall = false;

                const wordWidth = this.getWordPixelWidth(token.text, isBold);
                const totalWidth = wordWidth + (token.hasPrecedingSpace && currentLine.length > 0 ? spaceWidth : 0);

                if (currentLineWidth === 0) {
                    currentLineWidth += totalWidth;
                    currentLine.push({ text: token.text, isBold, hasPrecedingSpace: false });
                } else if (currentLineWidth + totalWidth <= this.TOI_COLUMN_MAX_WIDTH) {
                    currentLineWidth += totalWidth;
                    currentLine.push({ text: token.text, isBold, hasPrecedingSpace: token.hasPrecedingSpace });
                } else {
                    finalLayout.push(currentLine);
                    currentLine = [{ text: token.text, isBold, hasPrecedingSpace: false }];
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
        
        const caps = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        for(let c of caps) {
            if (this.base_widths[c]) {
                this.base_widths[c] = Math.floor(this.base_widths[c] * 0.8);
            } else {
                this.base_widths[c] = Math.floor(65 * 0.8);
            }
        }
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
        let isFirstWordOverall = true;

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
                        let part = parts[i];
                        if (i < parts.length - 1) part += '-';
                        tokens.push({ text: part, hasPrecedingSpace: i === 0 });
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
                let isBold = boldWords.includes(cleanWord) || boldWords.includes(word);
                if (boldWords.length === 0 && isFirstWordOverall) {
                    isBold = true;
                }
                isFirstWordOverall = false;

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

class MirrorCalculator {
    constructor() {
        this.TOI_COLUMN_MAX_WIDTH = 1310; // Optimized column limit for Mirror
        this.RATE_PER_LINE = 27; // Mirror average rate

        this.base_widths = {
            'i': 18, 'l': 20, 'j': 20, 'f': 25, 't': 25, 'r': 30, 'I': 30,
            'm': 80, 'w': 70, 'M': 80, 'W': 85,
            'a': 50, 'b': 50, 'c': 50, 'd': 50, 'e': 50, 'g': 50, 'h': 50, 'n': 50, 'o': 50, 'p': 50, 'q': 50, 's': 45, 'u': 50, 'v': 50, 'x': 50, 'y': 50, 'z': 50,
            ' ': 20, '.': 25, ',': 25, '-': 30, '+': 50, '&': 60, '(': 30, ')': 30, ':': 25, '@': 85, '/': 30
        };
        
        const caps = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        for(let c of caps) {
            if (!this.base_widths[c]) {
                this.base_widths[c] = 65;
            }
        }
        const digits = '0123456789';
        for(let d of digits) {
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
        let isFirstWordOverall = true;

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
                let isBold = boldWords.includes(cleanWord) || boldWords.includes(word);
                if (boldWords.length === 0 && isFirstWordOverall) {
                    isBold = true;
                }
                const isFirstWord = isFirstWordOverall;
                isFirstWordOverall = false;
                
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

class IndianExpressCalculator {
    constructor() {
        this.TOI_COLUMN_MAX_WIDTH = 950;
        this.RATE_PER_LINE = 27; 
        
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
            return Math.floor(width * 1.5); 
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

class MaharashtraTimesCalculator {
    constructor() {
        this.TOI_COLUMN_MAX_WIDTH = 1420; 
        this.RATE_PER_LINE = 24; 
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
                    let char = w[i];
                    current += char;
                    if ((char === '-' || char === '/') && i < w.length - 1) {
                        parts.push({ text: current, hasPrecedingSpace: parts.length === 0 });
                        current = "";
                      } else if (char === '.' && i < w.length - 1) {
                        if (/[a-zA-Z0-9]/.test(w[i + 1])) {
                            parts.push({ text: current, hasPrecedingSpace: parts.length === 0 });
                            current = "";
                        }
                    }
                }
                if (current) {
                    parts.push({ text: current, hasPrecedingSpace: parts.length === 0 });
                }

                for (let partObj of parts) {
                    tokens.push(partObj);
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
        this.TOI_COLUMN_MAX_WIDTH = 2380; 
        this.RATE_PER_LINE = 26; 
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
        this.RATE_PER_LINE = 20; 
        this.charWidths = {"0":22,"1":30,"2":30,"3":39,"4":39,"5":30,"6":30,"7":30,"8":30,"હ":58,"ુ":0,"ં":0,",":30," ":26,"ર":60,"્":0,"ષ":60,"ભ":60,"ા":20,"ઈ":69,"મ":60,"ે":0,"વ":60,"ળ":64,"ન":60,"ો":21,"જ":60,"પ":55,"ત":60,"૦":51,"૪":60,"/":60,"૬":60,"૨":60,"૩":65,"ધ":52,"ચ":56,"ક":68,"ડ":60,"ી":30,"ખ":60,"અ":60,"(":30,"૧":60,")":30,"સ":56,"ગ":55,"દ":60,"બ":60,"લ":60,"ય":60,"છ":51,".":39,"ણ":67,"થ":66,"-":30,"ૃ":0,"ટ":62,"ढ":53,"ૂ":0,"૫":55,"િ":30,"ૌ":0,"એ":48,"આ":60,"ઝ":60,"શ":56,":":34,"ફ":64,"૮":66,"૭":60};
    }

    getCharWidth(char) {
        if (this.charWidths[char] !== undefined) {
            return this.charWidths[char];
        }
        if (['ં', 'ઃ', 'ુ', 'ૂ', 'ૃ', 'ૄ', 'ૅ', 'ે', 'ૈ', 'ૉ', 'ો', 'ૌ', '્'].includes(char)) return 0;
        if (['ા', 'િ', 'ી'].includes(char)) return 20;
        return 60; 
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

class EenaduCalculator {
    constructor() {
        this.TOI_COLUMN_MAX_WIDTH = 1245;
        this.RATE_PER_LINE = 22; 
        this.charWidths = {"0":21,"1":24,"2":29,"3":22,"4":9,"5":16,"6":25,"7":32,"8":20,"9":17,"W":78,"a":32,"n":55,"t":50,"e":57,"d":60," ":49,"L":50,"b":50,"T":50,"c":64,"h":59,"i":16,"s":47,".":23,"C":55,"o":45,":":33,"D":39,"r":55,"M":80,"g":55,",":15,"B":63,"v":52,"l":15,"H":62,"p":58,"K":65,"m":61,"ఉ":65,"ద":75,"్":0,"య":60,"ో":0,"గ":40,"అ":51,"వ":56,"క":63,"ా":0,"శ":56,"ల":52,"ు":12,"ప":63,"ర":61,"మ":60,"ఖ":50,"ం":21,"ె":2,"న":63,"ీ":3,"ి":0,"స":67,"ట":63,"భ":55,"థ":55,"ఫ":51,"డ":45,"బ":55,"-":22,"ఆ":56,"(":25,"A":40,"/":55,")":34,"&":34,"త":52,"ొ":0,"ూ":8,"‌":48,"ే":8,"జ":53,"ఎ":59,"ష":60,"హ":37,"చ":70,"ణ":55,"R":64,"'":41,"f":56,"u":58,"P":60,"y":44,"F":46,"Q":33,"Y":28,"G":52,"S":52,"w":82,"V":55,"x":63,"q":55,"E":43,"I":17,"k":58,"N":51,"+":11,"ఏ":61,"ై":8};
    }

    getCharWidth(char) {
        if (this.charWidths[char] !== undefined) {
            return this.charWidths[char];
        }
        
        const code = char.charCodeAt(0);
        if (['ా', 'ి', 'ీ', 'ు', 'ూ', 'ృ', 'ె', 'ే', 'ై', 'ొ', 'ో', 'ౌ', '్', 'ం', 'ః'].includes(char)) return 5;
        if (code >= 0x0C00 && code <= 0x0C7F) return 60;
        if (code >= 65 && code <= 90) return 60; 
        if (code >= 97 && code <= 122) return 50; 
        return 55;
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
                const cleanWord = word.replace(/[.,()":|-]/g, '');
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

    calculateBilledLines(adText, boldWords = []) {
        if (!adText || adText.trim() === '') return 0;
        return this.calculateLayout(adText, boldWords).linesCount;
    }
}

class SakshiCalculator {
    constructor() {
        this.TOI_COLUMN_MAX_WIDTH = 1745;
        this.RATE_PER_LINE = 22; 
        this.charWidths = {"0":31,"1":18,"2":24,"3":18,"4":44,"5":50,"6":45,"7":0,"8":23,"9":11,"ఆ":82,"ట":70,"ో":15,"మ":88,"ొ":52,"బ":34,"ై":16,"ల":19,"్":14," ":48,"ష":53,"ా":32,"ప":48,"న":33,"ం":12,"ద":82,"ు":28,"ి":24,"చ":100,"ే":17,"య":73,"క":80,"t":52,"h":68,"వ":98,"స":53,"&":53,"గ":69,"ర":66,"ె":19,"జ":26,"ీ":7,"త":51,".":5,"|":40,"O":49,"l":38,"d":49,"A":51,"u":78,"o":46,"n":79,"a":8,"g":44,"r":75,",":0,"V":50,"J":60,"I":41,"M":85,"i":28,"p":35,"s":56,"R":79,"/":63,"H":22,"N":72,"-":9,"S":80,"c":35,"b":50,"k":49,"e":59,"D":31,"P":40,"m":51,"j":74,"y":61,"w":71,"T":41,"v":91,"\"":33,"G":95,"U":23,"E":49,"L":80,"F":60,"డ":62,"హ":29,"ళ":69,"ఇ":47,"ఉ":34,"ూ":16,"ణ":83,"‌":19,"ృ":44,"ధ":31,"ఫ":86,"భ":14,":":30,"K":61,"W":87,"C":28};
    }

    getCharWidth(char) {
        if (this.charWidths[char] !== undefined) return this.charWidths[char];
        const code = char.charCodeAt(0);
        if (['ా', 'ి', 'ీ', 'ు', 'ూ', 'ృ', 'ె', 'ే', 'ై', 'ొ', 'ો', 'ౌ', '్', 'ం', 'ః'].includes(char)) return 5;
        if (code >= 0x0C00 && code <= 0x0C7F) return 60;
        if (code >= 65 && code <= 90) return 60; 
        if (code >= 97 && code <= 122) return 50; 
        return 55;
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
                const cleanWord = word.replace(/[.,()":|-]/g, '');
                const isBold = boldWords.includes(cleanWord) || boldWords.includes(word);
                const wordWidth = this.getWordPixelWidth(word, isBold);
                if (currentLineWidth === 0) {
                    currentLineWidth += wordWidth;
                    currentLine.push({ text: word, isBold: isBold });
                } else if (currentLineWidth + spaceWidth + wordWidth <= this.TOI_COLUMN_MAX_WIDTH) {
                    currentLineWidth += spaceWidth + wordWidth;
                    currentLine.push({ text: word, isBold: isBold });
                } else {
                    finalLayout.push(currentLine);
                    currentLine = [{ text: word, isBold: isBold }];
                    currentLineWidth = wordWidth;
                }
            }
            if (currentLine.length > 0) finalLayout.push(currentLine);
        }
        return { linesCount: finalLayout.length, layout: finalLayout };
    }

    calculateBilledLines(adText, boldWords = []) {
        if (!adText || adText.trim() === '') return 0;
        return this.calculateLayout(adText, boldWords).linesCount;
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
        case 'mt': return new MaharashtraTimesCalculator();
        case 'lokmat': return new LokmatTimesCalculator();
        case 'telangana': return new TelanganaTodayCalculator();
        case 'navgujarat': return new NavGujaratSamayCalculator();
        case 'eenadu': return new EenaduCalculator();
        case 'sakshi': return new SakshiCalculator();
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
        'ie': 'The Indian Express',
        'lokmat': 'Lokmat Times',
        'telangana': 'Telangana Today',
        'navgujarat': 'Nav Gujarat Samay',
        'eenadu': 'Eenadu Classifieds',
        'sakshi': 'Sakshi Classifieds'
    };
    
    // Brand colors
    const colors = {
        'toi': '#ef4444',     // Red
        'et': '#ea580c',      // Orange/Salmon
        'mt': '#f97316',      // Saffron/Orange
        'mirror': '#b91c1c',  // Dark Red
        'hindu': '#3b82f6',   // Blue
        'ht': '#0ea5e9',      // Light Blue
        'ie': '#dc2626',      // Strong Red
        'lokmat': '#0284c7',  // Blue-cyan
        'telangana': '#0891b2', // Cyan
        'navgujarat': '#ea580c', // Gujarati Orange
        'eenadu': '#eab308',   // Eenadu Gold
        'sakshi': '#1d4ed8'    // Sakshi Blue
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
        columnWrapper.style.width = "230px"; 
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
        newspaperOutput.style.fontSize = "13px"; 
        newspaperOutput.style.letterSpacing = "-0.2px"; 
        newspaperOutput.style.lineHeight = "1.2";
        columnWrapper.style.width = "260px"; 
    } else if (e.target.value === 'lokmat') {
        newspaperOutput.style.fontFamily = "'Arial', Helvetica, sans-serif";
        newspaperOutput.style.fontSize = "14px";
        columnWrapper.style.width = "245px";
    } else if (e.target.value === 'telangana') {
        newspaperOutput.style.fontFamily = "'Times New Roman', Times, serif";
        newspaperOutput.style.fontSize = "13px";
        columnWrapper.style.width = "340px";
    } else if (e.target.value === 'navgujarat') {
        newspaperOutput.style.fontFamily = "'Hind Vadodara', 'Shruti', 'Arial Unicode MS', sans-serif";
        newspaperOutput.style.fontSize = "14px";
        columnWrapper.style.width = "260px";
    } else if (e.target.value === 'eenadu') {
        newspaperOutput.style.fontFamily = "'Gautami', 'Mandali', 'NTR', 'Arial Unicode MS', sans-serif";
        newspaperOutput.style.fontSize = "14px";
        columnWrapper.style.width = "330px";
    } else if (e.target.value === 'sakshi') {
        newspaperOutput.style.fontFamily = "'Gautami', 'Mandali', 'NTR', 'Arial Unicode MS', sans-serif";
        newspaperOutput.style.fontSize = "14px";
        columnWrapper.style.width = "320px";
    } else { // TOI and Maharashtra Times (MT)
        newspaperOutput.style.fontFamily = "'Times New Roman', 'Times', 'Georgia', serif";
        newspaperOutput.style.fontSize = "13.5px";
        newspaperOutput.style.letterSpacing = "-0.1px";
        newspaperOutput.style.lineHeight = "1.15";
        
        // Newsprint realism
        newspaperOutput.style.backgroundColor = "#fdfcf8";
        newspaperOutput.style.color = "#1a1a1a";
        newspaperOutput.style.padding = "5px"; 
        
        columnWrapper.style.width = "240px"; 
    }
    
    // Update sample texts for testing
    if (e.target.value === 'hindu') {
        adTextInput.value = "WANTED: HOUSEKEEPER Full-Time. (Male/Female) Trustworthy & energetic individual for daily chores (cleaning, organizing, maintenance). Full boarding + excellent salary & job security. Refs Required. Wanted: Brahmin Cook Full-Time, (Male/Female). Must be clean, hygienic & passionate about veg cooking (South Indian + North Indian expertise preferred). Premium independent accommodation + excellent salary. Ref required. Apply via email and passport size pic. Contact: travel.companionship.2026@gmail.com";
        boldWordsInput.value = "WANTED:, HOUSEKEEPER";
    } else if (e.target.value === 'et') {
        adTextInput.value = "I, Dhruv Pandey S/o Karunesh Kumar Pandey, R/o Plot No. 108, Saraswati Vihar, Govindpuram, Ghaziabad, UP-201013, inform that Plot No. 22, Khasra No. 5, Village Dasna, (Ledger No. 1, Volume No. 7065, Page No. 330 to 343, Number 4845, dated 16/08/2007, Sub-Registrar First, Ghiazabad, is registered and the possession letter, Book No. 1, Volume No. 9262, Page No. 101 to 134, Number 7086, dated 02/11/2011, is lost somewhere. Whoever finds it, please contact the above address.";
        boldWordsInput.value = "I,";
    } else if (e.target.value === 'ht') {
        adTextInput.value = "LOST ORIGINAL Sale Deed Regd. as Doc. No. 12289 Dt. 07/12/2012 with SR-I, Delhi, of Second Floor of Prop. No.157, Mg.160 Sq.Yds., Vivekanand Puri, Delhi-7 stands in name of Rajan Sarin & Rohit Sarin vide NCR Lodged LR No. 375284/2026 dt.16/06/2026. Finder Please Contact: Pooja Kapoor # 9811043464 / 8860309020.";
        boldWordsInput.value = "LOST, ORIGINAL";
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
    } else if (e.target.value === 'eenadu') {
        adTextInput.value = "ఉద్యోగ అవకాశాలు: ప్రముఖ కంపెనీకి క్రింది పోస్టుల కోసం అభ్యర్థులు కావలెను: ఫీల్డ్ బాయ్స్- 10 మంది అవసరం. ఆఫీస్ స్టాఫ్ (MBA/M.Com)-అమ్మాయిలు & అబ్బాయిలు, ట్యాలీలో కనీసం 2సంవత్సరాల అనుభవం ఉండాలి. ప్రొక్యూర్‌మెంట్ మేనేజర్. ఆసక్తి గల అభ్యర్థులు సంప్ర: 72072 74725, 98490 74725.";
        boldWordsInput.value = "ఉద్యోగ, అవకాశాలు:";
    } else if (e.target.value === 'sakshi') {
        adTextInput.value = "డ్వాక్రా మహిళలకు, నిరుద్యోగులకు ఇంట్లో ఉంటూ పెట్టుబడి మీరే పెట్టుకొని పెన్సిల్స్, కొవ్వొత్తులు తయారు చేసి మాకు ఇవ్వండి వీక్లీ పేమెంట్, 9640729906";
        boldWordsInput.value = "డ్వాక్రా, మహిళలకు,, నిరుద్యోగులకు";
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
        
        // If input is empty, auto-detect subsequent ALL CAPS words
        if (boldWordsString.trim() === '') {
            let upperCount = 0;
            for (let w of textWords) {
                if (w === w.toUpperCase() && w.match(/[A-Z]/)) upperCount++;
            }
            
            if (upperCount < textWords.length * 0.5) { 
                for(let i = 1; i < Math.min(textWords.length, 6); i++) { 
                    let clean = textWords[i].replace(/[.,()":|+&\/-]/g, '');
                    if (clean.length > 0 && clean === clean.toUpperCase() && clean.match(/[A-Z]/)) {
                        boldWords.push(clean);
                    } else {
                        break; 
                    }
                }
            }
        }
    }

    if (!text.trim()) {
        renderLayout([]);
        physicalLinesStat.innerText = '0';
        billedLinesStat.innerText = '0';
        return;
    }

    // Calculate
    const layoutData = engine.calculateLayout(text, boldWords);
    const billedLines = engine.calculateBilledLines(text, boldWords);

    // Update Stats
    animateValue(physicalLinesStat, parseInt(physicalLinesStat.innerText) || 0, layoutData.linesCount, 300);
    animateValue(billedLinesStat, parseInt(billedLinesStat.innerText) || 0, billedLines, 300);

    // Render Layout
    renderLayout(layoutData.layout);
}

function renderLayout(lines) {
    newspaperOutput.innerHTML = '';
    
    const isRaggedRight = (engine instanceof HindustanTimesCalculator);
    
    lines.forEach((lineArray, lineIdx) => {
        const lineDiv = document.createElement('div');
        lineDiv.style.display = 'flex';
        lineDiv.style.width = '100%';
        lineDiv.style.whiteSpace = 'nowrap';
        lineDiv.style.marginBottom = '0px';
        
        if (isRaggedRight || lineIdx === lines.length - 1) {
            lineDiv.style.justifyContent = 'flex-start';
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
            
            // Ensure first word is uppercase for TOI
            if (lineIdx === 0 && wordIdx === 0 && document.getElementById('newspaperSelect').value === 'toi') {
                span.style.textTransform = 'uppercase';
            }
            
            // Render drop cap for ET and Mirror
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

// Init with TOI sample
window.onload = () => {
    adTextInput.value = "BDA Site at Arkavathi Layout for Sale First Block, Jakkur, Site No 1018 (North East Corner Site - very good for Vasthu) Measurement: (11.00 + 4.60)/2 (East to West) & 18 (North to South) = 140.40 Sq Mtrs. Total Area = 1511.27 Sq Ft. Site is 3 sides Surrounded by Roads with North 40ft East 40ft and South by 30ft 5 minutes approach to New Airport Road/up-coming Metro Station. Premier Locality with good infrastructure with Kaveri Water and surrounded by Sobha Academy, Opp to MSR Unicorn Heights. Contact No: 9845950789 & 9632577700";
    boldWordsInput.value = "BDA";
    updateVisualizer();
};
