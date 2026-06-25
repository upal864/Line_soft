const WORD_RULES_DICTIONARY = {
    "2bhk": 4.0,
    "3bhk": 4.0,
    "bhk": 3.0,
    "mnc": 3.0,
    "pqm4": 4.0,
    "sm4": 3.0,
    "m4": 2.0,
    "dob": 3.0,
    "tob": 3.0,
    "lpa": 3.0,
    "btech": 2.0,
    "mtech": 2.0,
    "nt": 2.0,
    "nd": 2.0,
    "nm": 2.0,
    "pb": 2.0,
    "nri": 3.0,
    "pqm": 3.0,
    "be": 2.0,
    "mca": 3.0,
    "bca": 3.0,
    "mba": 3.0,
    "sap": 3.0,
    "fico": 4.0,
    "sap fico": 7.0,
    "bed": 2.0,
    "ma": 2.0,
    "ph": 2.0,
    "4bhk": 4.0,
    "1bhk": 4.0,
    "jee": 3.0,
    "aipmt": 5.0,
    "mcq": 3.0,
    "ibps": 4.0,
    "sbi": 3.0,
    "asso": 4.0,
    "po": 2.0,
    "msc": 2.0,
    "bsc": 2.0,
    "biostat": 2.0,
    "b.com": 2.0,
    "m.com": 2.0,
    "bcom": 2.0,
    "mcom": 2.0,
    "phd": 3.0,
    "hod": 3.0,
    "am": 2.0,
    "cm": 2.0,
    "dm": 2.0,
    "bds": 3.0,
    "sm": 2.0,
    "md": 2.0,
    "ms": 2.0,
    "ca": 2.0,
    "cs": 2.0,
    "mbbs": 4.0,
    "sqft": 2.0,
    "uk": 2.0,
    "vb'ful": 3.0,
    "i'less": 2.0,
    "w/o": 3.0,
    "s/o": 3.0,
    "d/o": 3.0,
    "d.o.b": 3.0,
    "a/c": 2.0,
    "ac": 2.0,
    "sqyd": 2.0,
    "48000km": 3.0,
    "exwarranty": 2.0,
    "r/o": 2.0,
    "v.p.o": 3.0,
    "m/f": 11.0,
    "usa": 3.0,
    "ny": 2.0,
    "up": 2.0,
    "smf": 3.0,
    "iitd": 4.0,
    "vbful": 2.0,
    "iless": 2.0,
    "ps": 2.0,
    "ph.d": 3.0,
    "ceo": 3.0,
    "mds": 3.0,
    "iit": 3.0,
    "iim": 3.0,
    "kms": 3.0,
    "abs": 3.0,
    "sql": 3.0,
    "bhp": 3.0,
    "pm4": 3.0,
    "pm": 2.0,
    "cv": 2.0,
    "c.v.": 2.0,
    "mphil": 2.0,
    "rbi": 3.0,
    "b.tech": 2.0,
    "us": 2.0,
    "c/o": 2.0,
    "zdi": 2.0,
    "lko": 3.0,
    "gr": 2.0,
    "br": 2.0,
    "mgr": 3.0,
    "sq.ft": 2.0,
    "pg": 2.0,
    "anes": 4.0,
    "hp": 2.0,
    "chd": 3.0,
    "rc": 2.0,
    "i.i.t": 3.0,
    "i.i.t.": 3.0,
    "iitjee": 6.0,
    "pcs": 3.0,
    "/": 2.0,
    "th": 2.0,
    "dme": 3.0,
    "2d": 2.0,
    "3d": 2.0,
    "4d": 2.0,
    "rhce": 4.0,
    "cfa": 3.0,
    "sft": 2.0,
    "sq.ft.": 2.0,
    "iso": 3.0,
    "nct": 3.0,
    "mhrd": 4.0,
    "gmp": 3.0,
    "iti": 3.0,
    "ngo": 3.0,
    "m.tech": 2.0,
    "je": 2.0,
    "pspcl": 5.0,
    "bhdk": 4.0,
    "seo": 3.0,
    "ppt": 3.0,
    "it": 2.0,
    "bd": 2.0,
    "wb": 2.0,
    "m.sc": 2.0,
    "m.ed": 2.0,
    "dav": 3.0,
    "nit": 3.0,
    "pgpm": 4.0,
    "isb": 3.0,
    "web": 3.0,
    "pq": 2.0,
    "nmims": 5.0,
    "aapc": 4.0,
    "cpc": 3.0,
    "bhms": 4.0,
    "bams": 4.0,
    "pr": 2.0,
    "ctet": 4.0,
    "mha": 3.0,
    "ntt": 3.0,
    "prt": 3.0,
    "tgt": 3.0,
    "m.sc.": 2.0,
    "med": 2.0,
    "ugc": 3.0,
    "issueless": 2.0,
    "pmq": 3.0,
    "biodata": 2.0,
    "ldh": 3.0,
    "ggn": 3.0,
    "cima": 4.0,
    "pkg": 3.0,
    "b'ful": 2.0,
    "mob": 3.0,
    "p.m": 2.0,
    "p.m.": 2.0,
    "a.m": 2.0,
    "a.m.": 2.0,
    "remarriage": 2.0,
    "rcscboy": 5.0,
    "rcsc": 4.0,
    "c.m": 2.0,
    "c.m.": 2.0,
    "greencard": 2.0,
    "ff": 2.0,
    "teamlead": 2.0,
    "technopark": 2.0,
    "wa": 2.0,
    "boa": 3.0,
    "pnb": 3.0,
    "citibank": 2.0,
    "draftsman": 2.0,
    "iata": 4.0,
    "agm": 3.0,
    "ap": 2.0,
    "atm": 3.0,
    "ba": 2.0,
    "b.a.": 2.0,
    "bba": 3.0,
    "blib": 2.0,
    "bphar": 2.0,
    "bp": 2.0,
    "besu": 4.0,
    "biotech": 2.0,
    "b'lore": 2.0,
    "bpo": 3.0,
    "b.p.o.": 3.0,
    "b.pharm": 2.0,
    "bpharm": 2.0,
    "cd": 2.0,
    "cat": 3.0,
    "c.a.t": 3.0,
    "ccfc": 4.0,
    "cms": 3.0,
    "co": 2,
    "cu": 2.0,
    "ju": 2.0,
    "bu": 2.0,
    "cli": 3.0,
    "cc": 2.0,
    "cca": 3.0,
    "dsa": 3.0,
    "dgp": 3.0,
    "dgo": 3.0,
    "eb": 2.0,
    "emi": 3.0,
    "fm": 2.0,
    "fbt": 3.0,
    "f/o": 2,
    "fmcg": 4.0,
    "fmgc": 4.0,
    "fema": 4.0,
    "gd": 2.0,
    "gdp": 3.0,
    "gsm": 3.0,
    "ho": 2.0,
    "hs": 2.0,
    "isc": 3.0,
    "i.s.c.": 3.0,
    "icse": 4.0,
    "i.c.s.e.": 4.0,
    "html": 4.0,
    "ites": 4.0,
    "ipc": 3.0,
    "icu": 3.0,
    "iccu": 4.0,
    "itu": 3.0,
    "iq": 2.0,
    "ip": 2.0,
    "irs": 3.0,
    "isi": 3.0,
    "kb": 2.0,
    "mb": 2.0,
    "gb": 2.0,
    "kg": 2.0,
    "km": 2.0,
    "kgp": 3.0,
    "lan": 3.0,
    "lic": 3.0,
    "ltd.": 3.0,
    "mlib": 2.0,
    "mrcp": 4.0,
    "msd": 3.0,
    "mhz": 3.0,
    "mp": 2.0,
    "modem": 2.0,
    "mou": 3.0,
    "m/o": 2.0,
    "nbfc": 4.0,
    "nsc": 3.0,
    "nav": 3.0,
    "noc": 3.0,
    "ne": 2.0,
    "nift": 4.0,
    "nifd": 4.0,
    "nw": 2.0,
    "ot": 2.0,
    "pa": 2.0,
    "pl": 2.0,
    "pmry": 4.0,
    "rom": 3.0,
    "ram": 3.0,
    "r&d": 3.0,
    "rcgc": 4.0,
    "rctc": 4.0,
    "sc/st": 4.0,
    "se": 2.0,
    "sw": 2.0,
    "sez": 3.0,
    "telecomm": 2.0,
    "tte": 3.0,
    "tft": 3.0,
    "uae": 3.0,
    "uvr": 3.0,
    "url": 3.0,
    "vat": 3.0,
    "www": 3.0,
    "xmas": 2.0,
    "x": 3.0,
    "pob": 3.0,
    "%": 2.0,
    "dd": 2.0,
    "sco": 3.0,
    "scf": 3.0,
    "hig": 3.0,
    "lig": 3.0,
    "clu": 3.0,
    "dgr": 3.0,
    "mbl": 3.0,
    "hry": 3.0,
    "una": 3.0,
    "tehsil": 2.0,
    "amb": 3.0,
    "m4marry": 4.0,
    "ent": 3.0,
    "jacobite": 2.0,
    "teetotaler": 2.0,
    "ckg": 3.0,
    "swm4": 4.0,
    "llb": 3.0,
    "em": 2.0,
    "vesu": 4.0,
    "pbbsc": 5.0,
    "pgt": 3.0,
    "g.k.vihar": 3.0,
    "ed": 2.0,
    "pqf": 3.0,
    "k$": 2.0,
    "ft": 2.0,
    "apc": 3.0,
    "haad": 4.0,
    "dha": 3.0,
    "moh": 3.0,
    "cfl": 3.0,
    "led": 3.0,
    "bdms": 4.0,
    "2bhdk": 5.0,
    "i20": 2.0,
    "self": 2,
    "vmc": 3.0,
    "6ft": 2.0,
    "8lacs": 2.0,
    "kkb": 3.0,
    "ipia": 4.0,
    "aiims": 5.0,
    "icwa": 4.0,
    "llm": 3.0,
    "cusat": 5.0,
    "oics": 4.0,
    "hra": 3.0,
    "rcc": 3.0,
    "pcm": 3.0,
    "bio": 3.0,
    "pgdhrm": 6.0,
    "hr": 2.0,
    "mbd": 3.0,
    "migb": 4.0,
    "cma": 3.0,
    "ptet": 4.0,
    "tds": 3.0,
    "msw": 3.0,
    "bsw": 3.0,
    "csi": 3.0,
    "gnm": 3.0,
    "jbt": 3.0,
    "bihm": 4.0,
    "qc": 2.0,
    "awho": 4.0,
    "aecs": 4.0,
    "bbmp": 4.0,
    "sslc": 4.0,
    "ism": 3.0,
    "pgdca": 5.0,
    "ielts": 5.0,
    "ncr": 3.0,
    "psu": 3.0,
    "icici": 5.0,
    "pqsm4": 5.0,
    "hdfc": 4.0,
    "tcs": 3.0,
    "cts": 3.0,
    "ece": 3.0,
    "eee": 3.0,
    "me": 2.0,
    "sq": 2.0,
    "jrf": 3.0,
    "adhoc": 2.0,
    "1am": 3.0,
    "2am": 3.0,
    "3am": 3.0,
    "4am": 3.0,
    "5am": 3.0,
    "6am": 3.0,
    "7am": 3.0,
    "8am": 3.0,
    "9am": 3.0,
    "10am": 3.0,
    "11am": 3.0,
    "12am": 3.0,
    "1pm": 3.0,
    "2pm": 3.0,
    "3pm": 3.0,
    "4pm": 3.0,
    "5pm": 3.0,
    "6pm": 3.0,
    "7pm": 3.0,
    "8pm": 3.0,
    "9pm": 3.0,
    "10pm": 3.0,
    "11pm": 3.0,
    "12pm": 3.0,
    "gmch": 4.0,
    "csir": 4.0,
    "dds": 3.0,
    "h1b": 3.0,
    "net": 3.0,
    "pti": 3.0,
    "pet": 3.0,
    "aai": 3.0,
    "agp": 3.0,
    "ai": 2.0,
    "air": 3.0,
    "aslv": 4.0,
    "bcci": 4.0,
    "bg": 2.0,
    "bjp": 3.0,
    "bsp": 3.0,
    "cbi": 3.0,
    "cbse": 4.0,
    "cii": 3.0,
    "cpi": 3.0,
    "cpwd": 4.0,
    "da": 2.0,
    "dmk": 3.0,
    "dot": 3.0,
    "drdo": 4.0,
    "emu": 3.0,
    "fc": 2.0,
    "goi": 3.0,
    "gslv": 4.0,
    "hc": 2.0,
    "iaf": 3.0,
    "ignou": 5.0,
    "imd": 3.0,
    "insat": 5.0,
    "ipkf": 4.0,
    "isro": 4.0,
    "loc": 3.0,
    "ls": 2.0,
    "ltte": 4.0,
    "mdmk": 4.0,
    "mea": 3.0,
    "mg": 2.0,
    "nda": 3.0,
    "nic": 3.0,
    "obc": 3.0,
    "ongc": 4.0,
    "pan": 3.0,
    "pf": 2.0,
    "pigs": 4.0,
    "pil": 3.0,
    "pmk": 3.0,
    "pqwl": 4.0,
    "pslv": 4.0,
    "pwd": 3.0,
    "rac": 3.0,
    "raw": 3.0,
    "rlwl": 4.0,
    "rnri": 4.0,
    "saarc": 5.0,
    "sail": 4.0,
    "sc": 2.0,
    "sebi": 4.0,
    "sp": 2.0,
    "st": 2.0,
    "tn": 2.0,
    "ulfa": 4.0,
    "vhp": 3.0,
    "sqm4": 4.0,
    "1lpa": 4.0,
    "2lpa": 4.0,
    "3lpa": 4.0,
    "4lpa": 4.0,
    "5lpa": 4.0,
    "6lpa": 4.0,
    "7lpa": 4.0,
    "8lpa": 4.0,
    "9lpa": 4.0,
    "10lpa": 4.0,
    "11lpa": 4.0,
    "12lpa": 4.0,
    "13lpa": 4.0,
    "14lpa": 4.0,
    "15lpa": 4.0,
    "16lpa": 4.0,
    "17lpa": 4.0,
    "18lpa": 4.0,
    "19lpa": 4.0,
    "20lpa": 4.0,
    "21lpa": 4.0,
    "22lpa": 4.0,
    "23lpa": 4.0,
    "24lpa": 4.0,
    "25lpa": 4.0,
    "26lpa": 4.0,
    "27lpa": 4.0,
    "28lpa": 4.0,
    "29lpa": 4.0,
    "30lpa": 4.0,
    "1l": 2.0,
    "2l": 2.0,
    "3l": 4.0,
    "5l": 2.0,
    "6l": 2.0,
    "7l": 2.0,
    "8l": 2.0,
    "9l": 2.0,
    "10l": 2.0,
    "11l": 2.0,
    "12l": 2.0,
    "13l": 2.0,
    "14l": 2.0,
    "15l": 2.0,
    "16l": 2.0,
    "17l": 2.0,
    "18l": 2.0,
    "19l": 2.0,
    "20l": 2.0,
    "21l": 2.0,
    "22l": 2.0,
    "23l": 2.0,
    "24l": 2.0,
    "25l": 2.0,
    "26l": 2.0,
    "27l": 2.0,
    "28l": 2.0,
    "29l": 2.0,
    "30l": 2.0,
    "pmq4": 4.0,
    "pcms": 4.0,
    "bstc": 4.0,
    "rbse": 4.0,
    "nios": 4.0,
    "dgm": 3.0,
    "cmb": 3.0,
    "dmch": 4.0,
    "tet": 3.0,
    "kvs": 3.0,
    "pmc": 3.0,
    "\u090f\u092e\u090f": 2.0,
    "fcp": 3.0,
    "svt": 3.0,
    "iitian": 4.0,
    "sse": 3.0,
    "rclc": 4.0,
    "abudabai": 2.0,
    "bnys": 4.0,
    "bjmc": 4.0,
    "ukpr": 4.0,
    "btc": 3.0,
    "uptet": 5.0,
    "5bhk": 4.0,
    "6bhk": 4.0,
    "7bhk": 4.0,
    "8bhk": 4.0,
    "9bhk": 4.0,
    "10bhk": 4.0,
    "pec": 3.0,
    "php": 3.0,
    "pc": 2.0,
    "dtcp": 4.0,
    "hsbc": 4.0,
    "3br": 3.0,
    "2br": 3.0,
    "4br": 3.0,
    "cipet": 5.0,
    "cpcb": 4.0,
    "poi": 3.0,
    "poa": 3.0,
    "gst": 3.0,
    "epf": 3.0,
    "esic": 4.0,
    "bse": 3.0,
    "ias/has": 6.0,
    "\u0938\u0940\u092c\u0940\u090f\u0938\u0908": 4.0,
    "rscit": 5.0,
    "neet": 4.0,
    "lpg": 3.0,
    "netjrf": 4.0,
    "ips": 3.0,
    "ias/ips": 6.0,
    "tdscpc": 6.0,
    "usd": 3.0,
    "anm": 3.0,
    "dnb": 3.0,
    "\u092c\u0940\u091f\u0947\u0915": 2.0,
    "epgm": 4.0,
    "\u0906\u0908\u0906\u0908\u090f\u092e": 3.0,
    "riico": 5.0,
    "pstet": 4.0,
    "be+mba": 5.0,
    "nicu": 4.0,
    "itps": 4.0,
    "ctt": 3.0,
    "ias/pcs": 6.0,
    "ias": 3.0,
    "d3bhk": 5.0,
    "md/ms": 4.0,
    "\u092c\u0940\u0938\u0940\u090f": 3.0,
    "\u090f\u092e\u0938\u0940\u090f": 3.0,
    "asap": 4.0,
    "37a": 2.0
};

/**
 * Combined Newspaper Line Calculator Engines
 * Ported for frontend visualization
 */


/**
 * Isolated Word Calculator Engine
 */
function extractDictionaryWords(text) {
    let lowerText = text.toLowerCase();
    let remainingText = text;
    let extractedCount = 0;
    
    if (typeof WORD_RULES_DICTIONARY === 'undefined') {
        return { remainingText, extractedCount };
    }
    
    const keys = Object.keys(WORD_RULES_DICTIONARY).sort((a, b) => b.length - a.length);
    
    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        if (!key) continue;
        
        const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp('(?<=^|\\s|[.,;:!?()"\'' + '\\/\\-])' + escapedKey + '(?=$|\\s|[.,;:!?()"\'' + '\\/\\-])', 'g');
        
        let match;
        while ((match = regex.exec(lowerText)) !== null) {
            extractedCount += WORD_RULES_DICTIONARY[key];
            const mask = ' '.repeat(key.length);
            lowerText = lowerText.substring(0, match.index) + mask + lowerText.substring(match.index + key.length);
            remainingText = remainingText.substring(0, match.index) + mask + remainingText.substring(match.index + key.length);
        }
    }
    return { remainingText, extractedCount };
}

function calculateWordBilledUnits(text) {
    if (!text || text.trim() === '') return 0;
    
    const dictRes = extractDictionaryWords(text);
    let wordCount = dictRes.extractedCount;
    let processedText = dictRes.remainingText;
    
    // Now apply standard processing to the remaining text
    // 1. Handle abbreviations with spaces (e.g., "B. D. A." -> "B.D.A.")
    processedText = processedText.replace(/([A-Za-z])\.\s+(?=[A-Za-z]\.)/g, '$1.');
    
    // 2. Handle dates formatted with dots (e.g., 10.05.2026 -> 10 05 2026)
    // Dates formatted with slashes or hyphens are automatically split below.
    processedText = processedText.replace(/\b(\d{1,2})\.(\d{1,2})\.(\d{2,4})\b/g, '$1 $2 $3');
    
    // Comma acts as a delimiter (forces split)
    processedText = processedText.replace(/,/g, ' ');

    // Replace slashes and hyphens with spaces to split them
    processedText = processedText.replace(/[\/\-]/g, ' '); 
    processedText = processedText.replace(/\s+/g, ' ').trim();
    
    const words = processedText.split(' ');

    for (let word of words) {
        // Strip basic punctuation attached to word boundaries
        const cleanWord = word.replace(/^[.,;:!?()]+|[.,;:!?()]+$/g, '');
        if (cleanWord.length === 0) continue;
        
        // 3. Phone number detection (10 to 13 digits, optional +)
        if (/^[+]?[0-9]{10,13}$/.test(cleanWord)) {
            wordCount += 2; // Phone numbers count as 2 words
        } else {
            wordCount += 1;
        }
    }
    return wordCount;
}

class TimesOfIndiaLineCalculator {
    constructor() {
        this.TOI_COLUMN_MAX_WIDTH = 1400; // Optimized TOI column max width
        this.charWidths = {"0":45,"1":45,"2":45,"3":45,"4":45,"5":45,"6":45,"7":45,"8":45,"9":45,"a":50,"b":55,"c":55,"d":50,"e":50,"f":28,"g":55,"h":55,"i":25,"j":22,"k":55,"m":83,"n":50,"o":60,"p":60,"q":55,"r":40,"s":55,"u":60,"v":55,"w":72,"x":55,"y":55,"z":55,"l":22,"t":28,"A":72,"B":71,"C":72,"D":72,"E":72,"F":72,"G":72,"H":72,"J":72,"K":73,"L":72,"M":83,"N":72,"O":72,"P":72,"Q":72,"R":72,"S":72,"T":72,"U":72,"V":72,"X":72,"Y":72,"Z":72,"I":33,"W":94," ":28,".":28,",":28,"-":33,"*":39,"&":66,"(":37,")":34,"=":55,"+":55,"/":28,"|":28,"@":100,":":28,"\"":30,"\'":20};
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
        this.TOI_COLUMN_MAX_WIDTH = 1300; // Optimized column limit for The Hindu
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
            if (this.base_widths[c]) {
                this.base_widths[c] = Math.floor(this.base_widths[c] * 0.9);
            } else {
                this.base_widths[c] = 64; // Math.floor(72 * 0.9)
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
    calculateBilledWords(adText) {
        const words = calculateWordBilledUnits(adText);
        return Math.max(words, 20);
    }
}

class IndianExpressNorthCalculator extends IndianExpressCalculator {
    constructor() {
        super();
        this.TOI_COLUMN_MAX_WIDTH = 1400;
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

class MumbaiChouferCalculator {
    constructor() {
        this.TOI_COLUMN_MAX_WIDTH = 1174; 
        this.RATE_PER_LINE = 32; 
    }

    getCharWidth(char) {
        const exactWidths = {"े": 1, "ष": 57, "2": 45, "ी": 1, "प": 54, "ि": 0, "ु": 1, "1": 43, "-": 25, "6": 45, "+": 50, "व": 57, "G": 55, "ऊ": 56, "न": 54, "थ": 57, "ॅ": 54, "S": 54, "C": 56, "p": 46, "V": 54, "H": 56, "ग": 55, "l": 45, "ण": 56, ".": 26, "उ": 56, "घ": 52, "0": 45, "U": 56, "h": 44, "n": 42, "a": 47, "i": 45, "3": 44, "o": 46, "9": 43, "ा": 1, "ह": 56, ",": 24, "च": 58, "म": 56, "श": 55, "ड": 57, "ल": 57, "्": 0, "@": 47, "E": 57, "y": 44, "F": 56, "P": 55, "ध": 55, "ः": 0, "ठ": 56, "ब": 56, "c": 42, ")": 26, "R": 54, "ई": 54, "r": 45, "र": 56, "ो": 0, "8": 43, "5": 45, "ू": 1, "अ": 55, "(": 27, "s": 42, ":": 26, "I": 54, "द": 57, "त": 57, "b": 45, "q": 45, "फ": 56, "u": 46, "स": 55, "4": 45, "W": 54, "ं": 1, "M": 55, "य": 56, "t": 46, "/": 25, "m": 47, "ख": 56, "f": 48, "e": 44, "g": 44, " ": 12, "क": 56, "7": 43, "ज": 57, "B": 55, "d": 45, "ट": 56, "A": 54, "ळ": 56, "भ": 57};
        
        if (exactWidths[char] !== undefined) return exactWidths[char];

        if (['ा', 'િ', 'ી', 'ु', 'ू', 'ृ', 'े', 'ै', 'ो', 'ौ', '्', 'ं', 'ः', 'ँ', '़', 'ि', 'ी'].includes(char)) return 0;
        if (char >= '\u0900' && char <= '\u097F') return 56;
        if (char >= '0' && char <= '9') return 45;
        if (char >= 'A' && char <= 'Z') return 55;
        if (char >= 'a' && char <= 'z') return 45;
        
        if ([' ', '.', ',', '-', ':', '/', '(', ')', '!'].includes(char)) {
            if (char === ' ') return 12;
            return 25;
        }
        
        return 50; 
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

    calculateBilledLines(adText) {
        if (!adText || adText.trim() === '') return 0;
        return Math.ceil(adText.length / this.RATE_PER_LINE);
    }
}

class PunyaNagariCalculator {
    constructor() {
        this.TOI_COLUMN_MAX_WIDTH = 1191; 
        this.RATE_PER_LINE = 32; 
    }

    getCharWidth(char) {
        const exactWidths = {"झ": 58, "ु": 0, "फ": 57, "ख": 57, "य": 52, "ऊ": 56, "घ": 56, "/": 27, "ह": 54, "1": 46, "0": 43, "े": 1, "र": 54, "श": 57, "ठ": 56, "ज": 54, "\"": 23, " ": 16, "थ": 56, "ी": 0, "8": 49, "म": 58, "ल": 58, "ि": 1, "प": 56, "ण": 53, "ब": 59, "9": 48, "क": 56, "अ": 56, ")": 28, "4": 47, "त": 56, "3": 45, "ग": 56, "ट": 52, "5": 48, "E": 55, "P": 55, "भ": 57, "ष": 55, "6": 42, "व": 60, "आ": 55, "ू": 0, "ड": 56, "ॅ": 55, "-": 27, "7": 44, "ं": 0, "द": 59, "T": 57, "2": 48, "W": 55, "(": 24, ":": 25, ".": 21, "च": 58, "ॉ": 56, "्": 1, "ध": 56, ",": 22, "स": 53, "ा": 1, "ो": 1, "S": 55, "न": 56};
        
        if (exactWidths[char] !== undefined) return exactWidths[char];

        if (['ा', 'િ', 'ી', 'ु', 'ू', 'ृ', 'े', 'ै', 'ो', 'ौ', '्', 'ं', 'ः', 'ँ', '़', 'ि', 'ी'].includes(char)) return 0;
        if (char >= '\u0900' && char <= '\u097F') return 56;
        if (char >= '0' && char <= '9') return 45;
        if (char >= 'A' && char <= 'Z') return 55;
        if (char >= 'a' && char <= 'z') return 45;
        
        if ([' ', '.', ',', '-', ':', '/', '(', ')', '!'].includes(char)) {
            if (char === ' ') return 16;
            return 25;
        }
        
        return 50; 
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

    calculateBilledLines(adText) {
        if (!adText || adText.trim() === '') return 0;
        return Math.ceil(adText.length / this.RATE_PER_LINE);
    }
}


class TribuneCalculator {
    constructor(npId) {
        this.npId = npId;
    }
    calculateBilledLines(adText) { return 0; }
    calculateLayout(adText, boldWords = []) { return { linesCount: 0, layout: [] }; }
    
    calculateBilledWords(text) {
        if (!text || text.trim() === '') return 0;
        
        const dictRes = extractDictionaryWords(text);
        let wordCount = dictRes.extractedCount;
        let processedText = dictRes.remainingText;
        
        // 2. Handle dates formatted with dots
        processedText = processedText.replace(/\b(\d{1,2})\.(\d{1,2})\.(\d{2,4})\b/g, '$1 $2 $3');
        
        // Mask Emails so they survive dot-splitting
        processedText = processedText.replace(/([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})/g, function(match) {
            return match.replace(/\./g, '__DOT__');
        });

        // Comma and Dot acts as a delimiter (forces split)
        processedText = processedText.replace(/[,.]/g, ' ');

        // Restore masked dots
        processedText = processedText.replace(/__DOT__/g, '.');

        // 3. Splitting & Tokenization (Standard logic)
        processedText = processedText.replace(/[\/\-]/g, ' '); 
        processedText = processedText.replace(/\s+/g, ' ').trim();
        
        const words = processedText.split(' ');

        for (let word of words) {
            // Punctuation Stripping (Standard logic)
            const cleanWord = word.replace(/^[.,;:!?()]+|[.,;:!?()]+$/g, '');
            if (cleanWord.length === 0) continue;
            
            const upperWord = cleanWord.toUpperCase();
            
            if (upperWord === 'SM4') {
                wordCount += 3;
            } else if (upperWord === 'PQM4') {
                wordCount += 4;
            } else if (upperWord === 'DOB' || upperWord === 'D.O.B') {
                wordCount += 3;
            } else if (/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/.test(cleanWord)) {
                wordCount += 4;
            } else if (/^[+]?[0-9]{10,13}$/.test(cleanWord)) {
                wordCount += 2;
            } else {
                // Calculated "as it is" - standard 1 word per token without 15-char limit penalty
                wordCount += 1;
            }
        }
        
        return wordCount;
    }
}


class IndianExpressGroupCalculator {
    constructor(npId) {
        this.npId = npId;
    }
    calculateBilledLines(adText) { return 0; }
    calculateLayout(adText, boldWords = []) { return { linesCount: 0, layout: [] }; }
    
    calculateBilledWords(text) {
        if (!text || text.trim() === '') return 0;
        
        let processedText = text;
        
        // Standard Date Handling
        processedText = processedText.replace(/\b(\d{1,2})\.(\d{1,2})\.(\d{2,4})\b/g, '$1 $2 $3');
        
        // Mask dates like 10/05/2026 or 10-05-2026 so they are not split
        processedText = processedText.replace(/\b(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})\b/g, '$1__SEP__$2__SEP__$3');
        
        // Mask Emails so they survive dot-splitting
        processedText = processedText.replace(/([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})/g, function(match) {
            return match.replace(/\./g, '__DOT__');
        });

        // Comma and Dot acts as a delimiter (forces split)
        processedText = processedText.replace(/[,.]/g, ' ');

        // Restore masked dots
        processedText = processedText.replace(/__DOT__/g, '.');

        // 1. Splitting & Tokenization
        processedText = processedText.replace(/[\/\-]/g, ' '); 
        processedText = processedText.replace(/\s+/g, ' ').trim();
        
        // Restore masked dates
        processedText = processedText.replace(/__SEP__/g, '/');
        
        const words = processedText.split(' ');
        let wordCount = 0;

        for (let word of words) {
            // 2. Punctuation Stripping
            const cleanWord = word.replace(/^[.,;:!?()]+|[.,;:!?()]+$/g, '');
            if (cleanWord.length === 0) continue;
            
            if (/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/.test(cleanWord)) {
                wordCount += 3; // Emails are 3 words
            } else if (/^[+]?[0-9]{10,13}$/.test(cleanWord)) {
                wordCount += 2; // Mobile numbers are 2 words
            } else {
                // Normal words calculated as it is (1 word per token)
                wordCount += 1;
            }
        }
        
        return wordCount;
    }
}


// Word Calculator Limits Dictionary
const WORD_LIMITS = {
    'word_assamtribune': { min: 12, max: 100 },
    'word_deccanchronicle': { min: 20, max: 50 },
    'word_rajasthanpatrika': { min: 20, max: 50 },
    'word_indianexpress': { min: 20, max: 50 },
    'word_tribune': { min: 15, max: 100 },
    'word_dainikbhaskar': { min: 20, max: 50 },
    'word_amarujjala': { min: 25, max: 100 },
    'word_gujaratsamachar': { min: 10, max: 50 },
    'word_jansatta': { min: 20, max: 50 },
    'word_aajkal': { min: 12, max: 100 }
};



class GujaratSamacharCalculator {
    constructor(npId) {
        this.npId = npId;
    }
    
    calculateBilledLines(adText) { return 0; }
    calculateLayout(adText, boldWords = []) { return { linesCount: 0, layout: [] }; }
    
    calculateBilledWords(text) {
        if (!text || text.trim() === '') return 0;
        
        let processedText = text;
        
        // Standard Date Handling
        processedText = processedText.replace(/\b(\d{1,2})\.(\d{1,2})\.(\d{2,4})\b/g, '$1 $2 $3');
        
        // Mask Emails so they survive dot-splitting
        processedText = processedText.replace(/([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})/g, function(match) {
            return match.replace(/\./g, '__DOT__');
        });

        // Comma and Dot acts as a delimiter (forces split)
        processedText = processedText.replace(/[,.]/g, ' ');

        // Restore masked dots
        processedText = processedText.replace(/__DOT__/g, '.');

        // 1. Splitting & Tokenization
        processedText = processedText.replace(/[\/\-]/g, ' '); 
        processedText = processedText.replace(/\s+/g, ' ').trim();
        
        const words = processedText.split(' ');
        let wordCount = 0;

        for (let word of words) {
            // 2. Punctuation Stripping
            const cleanWord = word.replace(/^[.,;:!?()]+|[.,;:!?()]+$/g, '');
            if (cleanWord.length === 0) continue;
            
            if (/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/.test(cleanWord)) {
                wordCount += 8; // Emails are 8 words for Gujarat Samachar
            } else if (/^[+]?[0-9]{10,13}$/.test(cleanWord)) {
                wordCount += 2; // Mobile numbers are 2 words
            } else {
                // Normal words calculated as it is (1 word per token)
                wordCount += 1;
            }
        }
        
        return wordCount;
    }
}


class DainikBhaskarCalculator {
    constructor(npId) {
        this.npId = npId;
    }
    
    calculateBilledLines(adText) { return 0; }
    calculateLayout(adText, boldWords = []) { return { linesCount: 0, layout: [] }; }
    
    calculateBilledWords(text) {
        if (!text || text.trim() === '') return 0;
        
        let processedText = text;
        
        // Standard Date Handling
        processedText = processedText.replace(/\b(\d{1,2})\.(\d{1,2})\.(\d{2,4})\b/g, '$1 $2 $3');
        
        // Mask Emails so they survive dot-splitting
        processedText = processedText.replace(/([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})/g, function(match) {
            return match.replace(/\./g, '__DOT__');
        });

        // Comma and Dot acts as a delimiter (forces split)
        processedText = processedText.replace(/[,.]/g, ' ');

        // Restore masked dots
        processedText = processedText.replace(/__DOT__/g, '.');

        // 1. Splitting & Tokenization
        processedText = processedText.replace(/[\/\-]/g, ' '); 
        processedText = processedText.replace(/\s+/g, ' ').trim();
        
        const words = processedText.split(' ');
        let wordCount = 0;

        for (let word of words) {
            // 2. Punctuation Stripping
            const cleanWord = word.replace(/^[.,;:!?()]+|[.,;:!?()]+$/g, '');
            if (cleanWord.length === 0) continue;
            
            const upperWord = cleanWord.toUpperCase();
            
            if (upperWord === 'DOB' || upperWord === 'D.O.B') {
                wordCount += 3; // DOB is 3 words
            } else if (/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/.test(cleanWord)) {
                wordCount += 3; // Emails are 3 words
            } else if (/^[+]?[0-9]{10,13}$/.test(cleanWord)) {
                wordCount += 2; // Mobile numbers are 2 words
            } else {
                // Normal words calculated as it is (1 word per token)
                wordCount += 1;
            }
        }
        
        return wordCount;
    }
}

class GenericWordCalculator {
    constructor(npId) {
        this.npId = npId;
    }
    calculateBilledLines(adText) { return 0; }
    calculateLayout(adText, boldWords = []) { return { linesCount: 0, layout: [] }; }
    calculateBilledWords(adText) {
        const words = calculateWordBilledUnits(adText);
        return words;
    }
}

class ArthikLipiCalculator {
    constructor() {
        this.TOI_COLUMN_MAX_WIDTH = 1200; 
        this.RATE_PER_LINE = 32; 
    }

    getCharWidth(char) {
        if (char >= '0' && char <= '9') return 57;
        if (char >= 'A' && char <= 'Z') return 39;
        if (char >= 'a' && char <= 'z') return 37;
        
        // Bengali mapping
        if (['া', 'ি', 'ী', 'ু', 'ূ', 'ৃ', 'ে', 'ৈ', 'ো', 'ৌ', '্', 'ং', 'ঃ', 'ঁ', '়'].includes(char)) return 0;
        if (char >= '\u0980' && char <= '\u09FF') return 32;

        if ([' ', '.', ',', '-', ':', '/', '(', ')', '!', '&', '@', '।'].includes(char)) {
            if (char === ' ') return 10;
            return 15;
        }
        
        return 50; 
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
            const cleanBold = boldWords.map(b => b.replace(/[.,()":|+&@\/-]/g, ''));

            for (let t of tokens) {
                const word = t.text;
                const cleanWord = t.orig.replace(/[.,()":|+&@\/-]/g, '');
                const isBold = cleanBold.includes(cleanWord) || boldWords.includes(t.orig);
                
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

    calculateBilledLines(adText) {
        if (!adText || adText.trim() === '') return 0;
        return Math.ceil(adText.length / this.RATE_PER_LINE);
    }
    calculateBilledWords(adText) {
        const words = calculateWordBilledUnits(adText);
        return Math.max(words, 10);
    }
}

class NamastheTelanganaCalculator {
    constructor() {
        this.TOI_COLUMN_MAX_WIDTH = 1220; 
        this.RATE_PER_LINE = 32; 
    }

    getCharWidth(char) {
        if (char >= '0' && char <= '9') return 35;
        if (char >= 'A' && char <= 'Z') return 35;
        if (char >= 'a' && char <= 'z') return 37;
        if (char === '★') return 40;
        
        // Telugu mapping
        if (['ా', 'ి', 'ీ', 'ు', 'ూ', 'ృ', 'ె', 'ే', 'ై', 'ొ', 'ో', 'ౌ', '్', 'ం', 'ః', 'ఁ', 'ౢ', 'ౣ', '౦', '౧', '౨', '౩', '౪', '౫', '౬', '౭', '౮', '౯'].includes(char)) return 0;
        if (char >= '\u0C00' && char <= '\u0C7F') return 38;

        if ([' ', '.', ',', '-', ':', '/', '(', ')', '!', '&', '@', '"'].includes(char)) {
            if (char === ' ') return 10;
            return 15;
        }
        
        return 50; 
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
        
        if (!adText.startsWith('★')) {
            adText = '★ ' + adText;
        }
        if (!boldWords.includes('★')) {
            boldWords.push('★');
        }

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
                        parts.push({ text: current, hasPrecedingSpace: parts.length === 0, orig: w });
                        current = "";
                    } else if (w[i] === '.' && i < w.length - 1) {
                        if (w[i+1].match(/[a-zA-Z0-9\u0C00-\u0C7F]/)) {
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
            const cleanBold = boldWords.map(b => b.replace(/[.,()":|+&@\/-]/g, ''));

            for (let t of tokens) {
                const word = t.text;
                const cleanWord = t.orig.replace(/[.,()":|+&@\/-]/g, '');
                const isBold = cleanBold.includes(cleanWord) || boldWords.includes(t.orig);
                
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

    calculateBilledLines(adText) {
        if (!adText || adText.trim() === '') return 0;
        if (!adText.startsWith('★')) {
            adText = '★ ' + adText;
        }
        return Math.ceil(adText.length / this.RATE_PER_LINE);
    }
}

class PudhariCalculator {
    constructor() {
        this.TOI_COLUMN_MAX_WIDTH = 290;
        this.RATE_PER_LINE = 26; // Roughly guessed from widths
    }

    getCharWidth(char) {
        if (char >= '0' && char <= '9') return 17;
        
        // Devnagari mapping
        if (['ा', 'ि', 'ी', 'ु', 'ू', 'ृ', 'े', 'ै', 'ो', 'ौ', '्', 'ं', 'ः', 'ँ', 'ॅ', 'ॉ'].includes(char)) return 2;
        if (char >= '\u0900' && char <= '\u097F') {
            if (char >= '०' && char <= '९') return 17;
            return 12;
        }

        if ([' ', '.', ',', '-', ':', '/', '(', ')', '!', '&', '@', '"'].includes(char)) {
            if (char === ' ') return 5;
            return 6;
        }
        
        return 12; 
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
            const cleanBold = boldWords.map(b => b.replace(/[.,()":|+&@\/-]/g, ''));

            for (let t of tokens) {
                const word = t.text;
                const cleanWord = t.orig.replace(/[.,()":|+&@\/-]/g, '');
                const isBold = cleanBold.includes(cleanWord) || boldWords.includes(t.orig);
                
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

    calculateBilledLines(adText) {
        if (!adText || adText.trim() === '') return 0;
        return Math.ceil(adText.length / this.RATE_PER_LINE);
    }
}

class YashobhumiCalculator {
    constructor() {
        this.TOI_COLUMN_MAX_WIDTH = 1174; // Found via genetic optimization of actual print samples
        this.RATE_PER_LINE = 32; 
    }

    getCharWidth(char) {
        // Precise physical widths derived from mathematical optimization of print samples
        const exactWidths = {"L": 56, "/": 23, "आ": 55, "ज": 56, "न": 56, "द": 53, "D": 54, "P": 55, "ा": 0, "T": 53, "र": 53, "ण": 57, ",": 26, "ट": 58, " ": 15, "थ": 56, "ऊ": 56, "्": 1, "I": 54, "व": 55, "ष": 54, "1": 44, "6": 46, "ग": 57, "ध": 57, "ो": 0, "उ": 55, "ई": 57, "प": 56, "ं": 2, "5": 45, ".": 25, "(": 25, "म": 57, ")": 28, "3": 44, "C": 55, "7": 47, "ड": 54, "ू": 0, "2": 47, "0": 42, "ी": 0, "इ": 53, "भ": 55, "ठ": 55, "घ": 56, "ल": 54, "9": 45, "8": 46, "ि": 1, "+": 50, "छ": 56, "ए": 59, "ब": 55, "े": 0, "4": 46, "-": 22, "ै": 2, "य": 56, "B": 55, "क": 54, "स": 57, "ौ": 0, "ु": 1, "।": 53, "S": 54, "श": 55, "ॉ": 54, "अ": 58, ":": 25, "त": 56, "ह": 58, "च": 53};
        
        if (exactWidths[char] !== undefined) return exactWidths[char];

        // Fallbacks for unseen characters
        if (['ा', 'િ', 'ી', 'ु', 'ू', 'ृ', 'े', 'ै', 'ो', 'ौ', '्', 'ं', 'ः', 'ँ', '़', 'ि', 'ी'].includes(char)) {
            return 0; // Modifiers
        }
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
        case 'ie_north': return new IndianExpressNorthCalculator();
        case 'mt': return new MaharashtraTimesCalculator();
        case 'lokmat': return new LokmatTimesCalculator();
        case 'telangana': return new TelanganaTodayCalculator();
        case 'navgujarat': return new NavGujaratSamayCalculator();
        case 'eenadu': return new EenaduCalculator();
        case 'sakshi': return new SakshiCalculator();
        case 'yashobhumi': return new YashobhumiCalculator();
        case 'mumbaichoufer': return new MumbaiChouferCalculator();
        case 'punyanagari': return new PunyaNagariCalculator();
        case 'arthiklipi': return new ArthikLipiCalculator();
        case 'namasthetelangana': return new NamastheTelanganaCalculator();
        case 'pudhari': return new PudhariCalculator();
        case 'toi': 
        default: 
            if (newspaperId === 'word_dainikbhaskar') return new DainikBhaskarCalculator(newspaperId);
            if (newspaperId === 'word_gujaratsamachar') return new GujaratSamacharCalculator(newspaperId);
            if (newspaperId === 'word_indianexpress' || newspaperId === 'word_jansatta' || newspaperId === 'word_aajkal') return new IndianExpressGroupCalculator(newspaperId);
            if (newspaperId === 'word_tribune') return new TribuneCalculator(newspaperId);
            if (newspaperId.startsWith('word_')) return new GenericWordCalculator(newspaperId);
            return new TimesOfIndiaLineCalculator();
    }
}

let engine = getEngine('toi');

// Tab Logic
let allNewspaperOptions = [];
const tabLine = document.getElementById('tab-line');
const tabWord = document.getElementById('tab-word');

function switchTab(type) {
    if (allNewspaperOptions.length === 0) {
        allNewspaperOptions = Array.from(newspaperSelect.options);
    }

    tabLine.classList.remove('active');
    tabWord.classList.remove('active');
    
    if (type === 'line') {
        tabLine.classList.add('active');
    } else {
        tabWord.classList.add('active');
    }
    
    // Filter dropdown options
    newspaperSelect.innerHTML = '';
    allNewspaperOptions.forEach(opt => {
        if (opt.getAttribute('data-type') === type) {
            newspaperSelect.appendChild(opt);
        }
    });
    
    // Select the first available option in the new tab and trigger engine update
    newspaperSelect.selectedIndex = 0;
    engine = getEngine(newspaperSelect.value);
    
    // Update main titles
    const mainTitle = document.querySelector('header h1');
    if (mainTitle) {
        if (type === 'word') {
            mainTitle.innerText = "Word Calculator";
            document.querySelector('header p').innerText = "Classified Ad Word Calculator";
        } else {
            mainTitle.innerText = "Line Calculator";
            document.querySelector('header p').innerText = "Classified Ad Line Visualizer & Calculator";
        }
    }

    updateVisualizer();
}

tabLine.addEventListener('click', () => switchTab('line'));
tabWord.addEventListener('click', () => switchTab('word'));

// Initialize tabs on load
setTimeout(() => switchTab('line'), 100);


// Event Listeners
    adTextInput.addEventListener('input', (e) => {
        const text = e.target.value;
        // Auto-detect bold words for Arthik Lipi Name Change ads
        if (newspaperSelect.value === 'arthiklipi') {
            // Match English Name Changes
            const matchEng = text.match(/^(I,\s*(?:\(OLD NAME\)\s*)?[A-Za-z\s]+?(?:,|@|\sW\/o|\sS\/o|\sWIFE|\sS\/O))/i);
            if (matchEng) {
                const extracted = matchEng[1].trim().split(/\s+/).join(',');
                boldWordsInput.value = extracted;
            } else if (text.startsWith("আমি")) {
                boldWordsInput.value = "আমি";
            }
        } 
        // Auto-detect bold words for Namasthe Telangana Name Change ads
        else if (newspaperSelect.value === 'namasthetelangana') {
            let modText = text.startsWith('★') ? text.substring(1).trim() : text;
            const matchNT = modText.match(/^(I,\s*[A-Za-z\s]+?(?:,|W\/o|S\/o|D\/o))/i);
            if (matchNT) {
                const extracted = matchNT[1].trim().split(/\s+/).join(',');
                boldWordsInput.value = "★," + extracted;
            } else if (text.startsWith("★")) {
                boldWordsInput.value = "★";
            }
        }
        updateVisualizer();
    });

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
        'ie': 'The Indian Express (Gujarat/Narrow)',
        'ie_north': 'The Indian Express (Delhi/North)',
        'lokmat': 'Lokmat Times',
        'telangana': 'Telangana Today',
        'navgujarat': 'Nav Gujarat Samay',
        'eenadu': 'Eenadu Classifieds',
        'sakshi': 'Sakshi Classifieds',
        'yashobhumi': 'Yashobhumi Classifieds',
        'mumbaichoufer': 'Mumbai Choufer Classifieds',
        'punyanagari': 'Punya Nagari Classifieds',
        'arthiklipi': 'Arthik Lipi Classifieds',
        'namasthetelangana': 'Namasthe Telangana Classifieds',
        'pudhari': 'Pudhari Classifieds'
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
        'ie_north': '#dc2626', // Strong Red
        'lokmat': '#0284c7',  // Blue-cyan
        'telangana': '#0891b2', // Cyan
        'navgujarat': '#ea580c', // Gujarati Orange
        'eenadu': '#eab308',   // Eenadu Gold
        'sakshi': '#1d4ed8'    // Sakshi Blue
    };
    
    columnHeader.innerText = names[e.target.value] || e.target.options[e.target.selectedIndex].text;
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
    } else if (e.target.value === 'ie_north') {
        newspaperOutput.style.fontFamily = "'Arial', Helvetica, sans-serif";
        newspaperOutput.style.fontSize = "12.5px";
        columnWrapper.style.width = "360px"; 
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
    } else if (e.target.value === 'ie_north') {
        adTextInput.value = "I DEEPCHAND FATHER OF SUSHIL KUMAR R/O VPO - KIDHWANA, TEHSIL - SURAJGARH, DIST- JHUNJHUNU, RAJ-333026 HAVE CHANGED MY NAME FROM DEEP CHAND TO DEEPCHAND VIDE AFFIDAVIT IN- DL34970839826403Y DATED 17/06/2026. 0050291657-1";
        boldWordsInput.value = "";
    } else if (e.target.value === 'ie') {
        adTextInput.value = "I, MADHU WIFE OF NO 14292180L EX-NK PATEL DHANJILAL KARASHANDAS RESIDENCE AT VILL-KAMALPUR TEH-PRANTIJ DISTT-SABARKANTHA-383205 HAVE CHANGED MY NAME FROM MADHU TO PATEL MADHUBEN DHANJIBHAI BEFORE CLASS-I MAGISTRATE";
        boldWordsInput.value = "I,, MADHU";
    } else if (e.target.value === 'yashobhumi') {
        adTextInput.value = "भिवंडीमें नामांकित ट्रान्सपोर्ट कं. के लिए लोडींग अनलोडींग क्लर्क एवं डिलिव्हरी बॉईज - तथा LPT -407-1109 केलिए ड्राइवर चाहिए। मो : 9324606851, 9324606650";
        boldWordsInput.value = "";
    } else if (e.target.value === 'mumbaichoufer') {
        adTextInput.value = "भांडुप येथे सफाईसाठी स्त्री/पुरूष पाहिजे. 12000/-, 1ला माळा, B विंग, तारामोती अपार्टमेंट, शिवाई शाळेजवळ, नाहूर (पूर्व) 7021704637";
        boldWordsInput.value = "";
    } else if (e.target.value === 'punyanagari') {
        adTextInput.value = 'माझे जुने नाव "रुबीना झाकीर" असे होते. माझे नवीन नाव "रुबीना झाकीर शेख" असे असून ते माझ्या अद्ययावत कागदपत्रांनुसार आहे. सदर नावाबदलाची नोंद नोटरी, क्र. 1280/26, दिनांक 09/06/2026 अन्वये करण्यात आलेली आहे.';
        boldWordsInput.value = "माझे";
    } else if (e.target.value === 'arthiklipi') {
        adTextInput.value = "I, (OLD NAME) SHAHNAZ RAYEES, WIFE OF RAYEES AZAM AGED ABOUT 52 YEARS, PRESENTLY RESIDING AT 59/A, B.R.B. BASU ROAD, P.O.- G.P.O., P.S.- BURRABAZAR, KOLKATA-700001, WB, I HAVE CHANGED MY NAME AND SHALL HENCEFORTH BE KNOWN AS (NEW NAME) SHAHNAZ BEGUM, AS DECLARED BEFORE THE FIRST CLASS JUDICIAL MAGISTRATE COURT, (ALIPORE, KOLKATA W.B.) VIDE AFFIDAVIT NO.8621, DATED: 18-06-2026 (OLD NAME) SHAHNAZ RAYEES AND (NEW NAME) SHAHNAZ BEGUM BOTH ARE SAME AND IDENTICAL PERSON";
        boldWordsInput.value = "I,,(OLD,NAME),SHAHNAZ,RAYEES,,WIFE";
    } else if (e.target.value === 'namasthetelangana') {
        adTextInput.value = 'I, DHANARAJU PASALA, S/o. SAMSON PASALA, Residing at H.No. 1-40/A/1, Ganesh Nagar, Kuntloor, Abdullapurmet Mandal, Ranga Reddy District, Telangana-501 505. As per Aadhar Card I have Changed my Sons Name from PASALA NOEL to PASALA NOEL DANI.';
        boldWordsInput.value = "I,,DHANARAJU,PASALA,";
    } else if (e.target.value === 'pudhari') {
        adTextInput.value = "घरी बसून मोबाईल द्वारा रजिस्टर्ड काम करण्यासाठी मुले, मुलींची आवश्यकता आहे. मिस कॉल- ०७९३५४२९१४६.";
        boldWordsInput.value = "";
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

    // UPDATE UI TITLES IMMEDIATELY (even if text is empty)
    const billedTitle = document.getElementById('billedUnitTitle');
    const billedSubtitle = document.getElementById('billedUnitSubtitle');
    const billedCard = document.getElementById('billedCard');
    const physicalLinesCard = document.getElementById('physicalLinesCard');
    const visualizerPanel = document.querySelector('.visualizer-panel');
    const gridLayout = document.querySelector('.grid-layout');
    
    if (typeof engine.calculateBilledWords === 'function') {
        if (visualizerPanel) visualizerPanel.style.display = 'none';
        
        // Handle Maximum Limits
        const wordLimitWarning = document.getElementById('wordLimitWarning');
        const limits = typeof WORD_LIMITS !== 'undefined' && WORD_LIMITS[newspaperSelect.value];
        const actualWords = engine.calculateBilledWords(text); // This correctly computes actual since it enforces min
        
        // Wait, calculateBilledWords enforces the min mathematically. 
        // We need to check if the RAW wordCount exceeded the max. Or just if the returned actualWords > max.
        if (wordLimitWarning && limits) {
            if (actualWords > limits.max) {
                wordLimitWarning.style.display = 'block';
                wordLimitWarning.innerText = `⚠️ Exceeds maximum limit of ${limits.max} words (Currently: ${actualWords})`;
                billedLinesStat.style.color = '#dc2626'; // Turn red
            } else {
                wordLimitWarning.style.display = 'none';
                billedLinesStat.style.color = ''; // Reset
            }
        }
        if (gridLayout) {
            // Optional: center the input panel by changing grid to 1fr or centering
            // Setting grid template to 1fr makes it full width. If we want it centered, we can use margin.
            // Let's just set it to 1fr so the editor expands nicely or centers.
            gridLayout.style.gridTemplateColumns = '1fr';
            gridLayout.style.maxWidth = '800px';
            gridLayout.style.margin = '0 auto';
        }
        if (billedTitle) billedTitle.innerText = "Billed Words";
        if (billedSubtitle) {
            billedSubtitle.innerText = "Calculated by exact word count";
        }
        if (billedCard) billedCard.style.display = ''; // Show billed words card
        if (physicalLinesCard) physicalLinesCard.style.display = 'none'; // Hide physical lines for word calculator
    } else {
        if (billedTitle) billedTitle.innerText = "Billed Lines";
        if (billedSubtitle) billedSubtitle.innerText = "Based on 24 chars/line";
        const wordLimitWarning = document.getElementById('wordLimitWarning');
        if (wordLimitWarning) wordLimitWarning.style.display = 'none';
        billedLinesStat.style.color = ''; // Reset
        if (billedCard) billedCard.style.display = 'none'; // Hide billed card in line calculator tab
        if (physicalLinesCard) physicalLinesCard.style.display = ''; // Show physical lines for line calculator
        if (visualizerPanel) visualizerPanel.style.display = ''; // Show visualizer
        if (gridLayout) {
            gridLayout.style.gridTemplateColumns = '1fr 1fr';
            gridLayout.style.maxWidth = 'none';
            gridLayout.style.margin = '';
        }
    }

    if (text.trim().length > 0) {
        const textWords = text.trim().split(/\s+/);
        const firstWord = textWords[0].replace(/[.,()":|+&\/-]/g, '');

        const intrinsicBolding = ['toi', 'hindu', 'ht', 'et', 'mirror'];

        // Only auto-bold the first word if no custom bold words are provided, 
        // AND the calculator doesn't already do it inherently,
        // AND it's not a newspaper that explicitly suppresses it (Pudhari, IE North).
        if (boldWordsString.trim() === '' && 
            !intrinsicBolding.includes(newspaperSelect.value) && 
            newspaperSelect.value !== 'pudhari' && 
            newspaperSelect.value !== 'ie_north') {
            if (!boldWords.includes(firstWord) && !boldWords.includes(textWords[0])) {
                boldWords.push(firstWord);
            }
        }
    }

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
    } else if (npVal === 'ie') {
        newspaperOutput.style.fontFamily = "'Arial', Helvetica, sans-serif";
        baseFontSize = 12.5;
        baseWidth = 250;
    } else if (npVal === 'ie_north') {
        newspaperOutput.style.fontFamily = "'Arial', Helvetica, sans-serif";
        baseFontSize = 12.5;
        baseWidth = 360;
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
        baseWidth = 260;
    } else if (npVal === 'eenadu') {
        newspaperOutput.style.fontFamily = "'Gautami', 'Mandali', 'NTR', 'Arial Unicode MS', sans-serif";
        baseFontSize = 14;
        baseWidth = 330;
    } else if (npVal === 'yashobhumi') {
        newspaperOutput.style.fontFamily = "'Mangal', 'Arial Unicode MS', sans-serif";
        baseFontSize = 14;
        baseWidth = 260;
    } else if (npVal === 'mumbaichoufer') {
        newspaperOutput.style.fontFamily = "'Mangal', 'Arial Unicode MS', sans-serif";
        baseFontSize = 14;
        baseWidth = 260; 
    } else if (npVal === 'punyanagari') {
        newspaperOutput.style.fontFamily = "'Mangal', 'Arial Unicode MS', sans-serif";
        baseFontSize = 14;
        baseWidth = 265; 
    } else if (npVal === 'arthiklipi') {
        newspaperOutput.style.fontFamily = "'Arial', sans-serif";
        baseFontSize = 12;
        baseWidth = 265;
    } else if (npVal === 'namasthetelangana') {
        newspaperOutput.style.fontFamily = "'Gautami', 'Arial', sans-serif";
        baseFontSize = 13;
        baseWidth = 270;
    } else if (npVal === 'pudhari') {
        newspaperOutput.style.fontFamily = "'Mangal', 'Arial Unicode MS', sans-serif";
        baseFontSize = 14;
        baseWidth = 270;
    } else {
        newspaperOutput.style.fontFamily = "'Times New Roman', Times, serif";
        baseFontSize = 14;
        baseWidth = 240;
    }
    
    columnWrapper.style.width = baseWidth + 'px';
    newspaperOutput.style.fontSize = baseFontSize + 'px';


    // Calculate
    const layoutData = engine.calculateLayout(text, boldWords);
    
    let billedUnits = 0;
    if (typeof engine.calculateBilledWords === 'function') {
        billedUnits = engine.calculateBilledWords(text);
    } else {
        billedUnits = engine.calculateBilledLines(text, boldWords);
    }

    // Update Stats
    animateValue(physicalLinesStat, parseInt(physicalLinesStat.innerText) || 0, layoutData.linesCount, 300);
    animateValue(billedLinesStat, parseInt(billedLinesStat.innerText) || 0, billedUnits, 300);

    // Render Layout
    renderLayout(layoutData.layout);
}

function renderLayout(lines) {
    newspaperOutput.innerHTML = '';
    
    const isRaggedRight = (engine instanceof HindustanTimesCalculator) || (engine instanceof IndianExpressCalculator) || (engine instanceof IndianExpressNorthCalculator);
    
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
