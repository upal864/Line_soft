class YashobhumiCalculator {
    constructor() {
        this.TOI_COLUMN_MAX_WIDTH = 1200; // Found via genetic optimization of actual print samples
        this.RATE_PER_LINE = 32; 
    }

    getCharWidth(char) {
        // Matras and zero-width modifiers in Devanagari
        if (['ा', 'િ', 'ી', 'ु', 'ू', 'ृ', 'े', 'ै', 'ो', 'ौ', '्', 'ं', 'ः', 'ँ', '़', 'ि', 'ी'].includes(char)) {
            return 0; // These sit on top/bottom of base characters
        }
        
        // Base Devanagari Consonants
        if (char >= '\u0900' && char <= '\u097F') return 56;
        
        // Numbers
        if (char >= '0' && char <= '9') return 45;
        
        // English letters
        if (char >= 'A' && char <= 'Z') return 55;
        if (char >= 'a' && char <= 'z') return 45;
        
        // Punctuation
        if ([' ', '.', ',', '-', ':', '/', '(', ')', '!'].includes(char)) {
            if (char === ' ') return 15;
            return 25;
        }
        
        return 50; // default fallback
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
        
        // Clean up accidental single newlines from copy-pasting, preserving intentional double newlines
        adText = adText.replace(/\r\n/g, '\n').replace(/([^\n])\n([^\n])/g, '$1 $2');
        
        const paragraphs = adText.split(/\n+/);
        const finalLayout = [];

        for (let p of paragraphs) {
            if (p.trim() === '') continue;
            const rawWords = p.split(' ');
            const tokens = [];
            
            // Hyphenation and punctuation splitting logic
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
                    currentLine.push({ text: word, isBold: isBold, hasPrecedingSpace: t.hasPrecedingSpace });
                } 
                else if (currentLineWidth + spacing + wordWidth <= this.TOI_COLUMN_MAX_WIDTH) {
                    currentLineWidth += spacing + wordWidth;
                    currentLine.push({ text: word, isBold: isBold, hasPrecedingSpace: t.hasPrecedingSpace });
                } 
                else {
                    finalLayout.push(currentLine);
                    currentLine = [{ text: word, isBold: isBold, hasPrecedingSpace: t.hasPrecedingSpace }];
                    currentLineWidth = wordWidth;
                }
            }
            if (currentLine.length > 0) {
                finalLayout.push(currentLine);
            }
        }
        
        return { linesCount: finalLayout.length, layout: finalLayout };
    }
}

const engine = new YashobhumiCalculator();
const text = "पुरूष/ महिला बाऊंसर अंधेरी वेस्ट के लिए संपर्क: CISB P. LTD., B-46, नथानी हाई ट्स, मुंबई सेन्ट्रल ब्रीज, मुंबई या 301, कुशवाहा चेंबर्स, मकवाना रोड, अंधेरी ईस्ट, मुंबई 9869343565";
const layout = engine.calculateLayout(text);
console.log("Total Lines:", layout.linesCount);
layout.layout.forEach((line, i) => {
    console.log(`L${i+1}: ${line.map(t => (t.hasPrecedingSpace ? ' ' : '') + t.text).join('')}`);
});

