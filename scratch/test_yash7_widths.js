class YashobhumiCalculator {
    constructor() {
        this.TOI_COLUMN_MAX_WIDTH = 1200; // Found via genetic optimization of actual print samples
        this.RATE_PER_LINE = 32; 
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
}

const engine = new YashobhumiCalculator();
const lines = [
    "पुरूष/ महिला बाऊंसर अंधेरी",
    "वेस्ट के लिए संपर्क: CISB P.",
    "LTD., B-46, नथानी हाई ट्स,",
    "मुंबई सेन्ट्रल ब्रीज, मुंबई या 301,",
    "कुशवाहा चेंबर्स, मकवाना रोड,",
    "अंधेरी ईस्ट, मुंबई 9869343565"
];

lines.forEach((line, i) => {
    let w = 0;
    const words = line.split(' ');
    words.forEach((word, j) => {
        const isBold = (i === 0 && j === 0); // Bold first word
        w += engine.getWordPixelWidth(word, isBold);
        if (j > 0) w += engine.getCharWidth(' ');
    });
    console.log(`Line ${i+1} width: ${w} -> ${line}`);
});

