import re

base_widths = {
    'a': 55, 'b': 55, 'c': 55, 'd': 55, 'e': 55, 'f': 28, 'g': 55, 
    'h': 55, 'i': 19, 'j': 22, 'k': 55, 'm': 83, 'n': 55, 'o': 55, 
    'p': 49, 'q': 55, 'r': 33, 's': 50, 'u': 55, 'v': 55, 'w': 72, 
    'x': 55, 'y': 55, 'z': 55, 'l': 22, 't': 28, 
    'A': 72, 'B': 71, 'C': 72, 'D': 72, 'E': 72, 'F': 72, 'G': 72, 
    'H': 72, 'J': 72, 'K': 73, 'L': 72, 'M': 83, 'N': 72, 'O': 72, 
    'P': 72, 'Q': 72, 'R': 72, 'S': 72, 'T': 72, 'U': 72, 'V': 72, 
    'X': 72, 'Y': 72, 'Z': 72, 'I': 33, 'W': 94, 
    '0': 58, '1': 52, '2': 55, '3': 55, '4': 55, '5': 55, 
    '6': 55, '7': 55, '8': 55, '9': 55, 
    ' ': 28, '.': 28, ',': 28, '-': 33, '*': 39, '&': 66, 
    '(': 37, ')': 34, '=': 55, '+': 55, '/': 28, '|': 28, 
    '@': 100, ':': 28, '"': 30
}

samples = [
    {
        "id": "MAH1",
        "text": "SHAYONA CORPORATION, a Government Contracting Firm, invites applications for: 1) CIVIL ENGINEER (Female) – 4-5 years of experience in estimation, project quantity surveying and billing roles 2) CIVIL ENGINEER (Male) – 4-5 years exp. primarily for site supervision and execution work. Location: Thane | Job Type: Permanent. Email: dhanashree.shayona@gmail.com / 8976221639 / 9324956699",
        "bold_words": ["SHAYONA"],
        "expected": 14
    },
    {
        "id": "MAH2",
        "text": "OPENINGS at CA Office – Dadar. CA Firm invites applications for Accounts, GST & Taxation positions. Freshers and experienced candidates welcome. Email Resume: caashokchheda@gmail.com",
        "bold_words": ["OPENINGS"],
        "expected": 7
    },
    {
        "id": "MAH3",
        "text": "BUSINESS Dev Exec: To promote imp packaging M/C. Pref: Dip in Marketing with or without exp. Full/Part time. Extensive travel for MUM, Pune,AHD . age < 30 WA: + 91 9820541416",
        "bold_words": ["BUSINESS"],
        "expected": 7
    },
    {
        "id": "MAH4",
        "text": "FEMALE Medical Typist / Transcriptionist with speed 40wpm for MRI CT Scan Centre , Contact 8850927330",
        "bold_words": ["FEMALE"],
        "expected": 5
    },
    {
        "id": "MAH5",
        "text": "VACANCIES for receptionists, sister,Wordboy in Borivali based Hospital. Computer knowledge is must [Receptionist]. Payment negotiable . Send resume on WhatsApp:- 9820550730. Please do not call",
        "bold_words": ["VACANCIES"],
        "expected": 8
    },
    {
        "id": "MAH6",
        "text": "WANTED teachers for all classes in Jai Bharat English High School, Ravikiran society, Behind Union Bank, Sagaon, Dombivli East. Minimum salary Rs. 15000 pm. Fresh & retired candidates can apply. Email- ksiyer62@gmail.com",
        "bold_words": ["WANTED"],
        "expected": 9
    }
]

def tokenize_mt(text):
    raw_words = text.split(' ')
    tokens = []
    for w in raw_words:
        if w.strip() == '':
            continue
        
        parts = []
        current = ""
        for i, char in enumerate(w):
            current += char
            if (char == '-' or char == '/') and i < len(w) - 1:
                parts.append((current, len(parts) == 0))
                current = ""
            elif char == '.' and i < len(w) - 1:
                if re.match(r'[a-zA-Z0-9]', w[i+1]):
                    parts.append((current, len(parts) == 0))
                    current = ""
                    
        if current:
            parts.append((current, len(parts) == 0))
            
        for p in parts:
            tokens.append(p)
    return tokens

def calculate_lines(tokens, bold_words, max_width, digit_scale=1.0, caps_scale=1.0):
    lines = 1
    current_line_width = 0
    space_width = base_widths.get(' ', 28)
    
    for word_text, has_space in tokens:
        clean_word = re.sub(r'[.,()":|+&@/-]', '', word_text)
        is_bold = clean_word in bold_words or word_text in bold_words
        
        word_width = 0
        for c in word_text:
            w = base_widths.get(c, 55)
            if c.isdigit():
                w = int(w * digit_scale)
            elif c.isupper():
                w = int(w * caps_scale)
            if is_bold:
                w = int(w * 1.2)
            word_width += w
            
        spacing = space_width if has_space and current_line_width > 0 else 0
        
        if current_line_width == 0:
            current_line_width += word_width
        elif current_line_width + spacing + word_width <= max_width:
            current_line_width += spacing + word_width
        else:
            lines += 1
            current_line_width = word_width
            
    return lines

for s in samples:
    s["tokens"] = tokenize_mt(s["text"])

def test_config(max_w, d_scale, c_scale):
    matches = 0
    for s in samples:
        calc = calculate_lines(s["tokens"], s["bold_words"], max_w, d_scale, c_scale)
        if calc == s["expected"]:
            matches += 1
    return matches == len(samples)

for w in range(1200, 1500, 10):
    for d_scale in [1.0, 1.1, 1.2]:
        for c_scale in [0.8, 0.85, 0.9, 0.95, 1.0]:
            if test_config(w, d_scale, c_scale):
                print(f"Perfect match at Width: {w}, Digit Scale: {d_scale}, Caps Scale: {c_scale}")

print("Done scanning.")
