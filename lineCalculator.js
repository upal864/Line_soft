/**
 * Intelligent & Dynamic Line Calculator Engine
 * Specifically tailored for Times of India classifieds physical print rendering.
 */

class TimesOfIndiaLineCalculator {
    constructor() {
        // Physical column max width for a standard TOI classified column
        this.TOI_COLUMN_MAX_WIDTH = 1400;

        // Proportional character widths extracted from sample analysis
        // This simulates the actual proportional font used by the newspaper.
        this.charWidths = {
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

        // Standard billing characters per line for Times of India (from db)
        this.RATE_PER_LINE = 24; 
    }

    /**
     * Get the width of a single character, with a default fallback.
     */
    getCharWidth(char) {
        return this.charWidths[char] !== undefined ? this.charWidths[char] : 55;
    }

    /**
     * Get the physical pixel width of a word, accounting for bold scaling.
     */
    getWordPixelWidth(word, isBold = false) {
        let width = 0;
        for (let i = 0; i < word.length; i++) {
            let w = this.getCharWidth(word[i]);
            if (isBold) {
                // Bold characters are roughly 20% wider
                w = Math.floor(w * 1.2);
            }
            width += w;
        }
        return width;
    }

    /**
     * Intelligent dynamic calculator that simulates physical wrapping in the newspaper column.
     * @param {string} adText - The full ad matter text.
     * @param {Array<string>} boldWords - Array of words that are bolded in the ad.
     * @returns {number} The exact number of physical lines.
     */
    calculatePhysicalLines(adText, boldWords = []) {
        if (!adText || adText.trim() === '') return 0;

        const words = adText.split(' ');
        let lines = 0;
        let currentLineWidth = 0;
        const spaceWidth = this.getCharWidth(' ');

        for (let i = 0; i < words.length; i++) {
            const word = words[i];
            
            // Clean punctuation to check if word is bold
            const cleanWord = word.replace(/[.,()":|]/g, '');
            const isBold = boldWords.includes(cleanWord) || boldWords.includes(word);
            
            const wordWidth = this.getWordPixelWidth(word, isBold);

            // If it's the start of a new line
            if (currentLineWidth === 0) {
                currentLineWidth += wordWidth;
                lines++; // we just started a line
            } 
            // If it fits on the current line with a space
            else if (currentLineWidth + spaceWidth + wordWidth <= this.TOI_COLUMN_MAX_WIDTH) {
                currentLineWidth += spaceWidth + wordWidth;
            } 
            // If it doesn't fit, wrap to the next line
            else {
                lines++;
                currentLineWidth = wordWidth; // The word starts the new line
            }
        }
        
        return lines;
    }

    /**
     * Mathematical fallback for calculating Billed lines (for invoicing based on Db constants).
     * @param {string} adText - The full ad matter text.
     * @returns {number} The number of lines billed.
     */
    calculateBilledLines(adText) {
        if (!adText || adText.trim() === '') return 0;
        
        const totalCharacters = adText.length; // Including spaces
        let billedLines = Math.ceil(totalCharacters / this.RATE_PER_LINE);
        
        // Minimum lines logic could be applied here based on `line_in_base_rate` = 5
        return billedLines;
    }
}

module.exports = TimesOfIndiaLineCalculator;
