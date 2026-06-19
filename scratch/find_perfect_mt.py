import re
import json

base_widths = {
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
    }
]

def tokenize_mt(text):
    raw_words = text.replace('\n', ' ').split(' ')
    tokens = []
    for w in raw_words:
        if w.strip() == '':
            continue
        
        parts = []
        current = ""
        for i, char in enumerate(w):
            current += char
            if char in ['-', '/', '.'] and i < len(w) - 1:
                if char == '.' and w[i+1] == '.':
                    continue
                if char == '.' and i > 0 and w[i-1] == '.':
                    continue
                parts.append((current, len(parts) == 0))
                current = ""
        if current:
            parts.append((current, len(parts) == 0))
            
        for p, is_first in parts:
            tokens.append((p, is_first))
    return tokens

def calculate_lines(tokens, bold_words, max_width, widths, bold_mult, first_bold_mult):
    lines = 1
    current_line_width = 0
    space_width = widths.get(' ', 28)
    first_word_done = False
    
    for word_text, has_space in tokens:
        clean_word = re.sub(r'[.,():+&@/-]', '', word_text)
        is_bold = clean_word in bold_words or word_text in bold_words
        
        multiplier = 1.0
        if is_bold:
            if not first_word_done:
                multiplier = first_bold_mult
                first_word_done = True
            else:
                multiplier = bold_mult
        
        word_width = sum(int(widths.get(c, 55) * multiplier) for c in word_text)
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

best_matches = 0
best_params = {}

# We'll use a very dense grid search to find a perfect fit
for max_w in range(1250, 1500, 10):
    for cap_scale in [0.75, 0.8, 0.85, 0.9, 0.95, 1.0]:
        for digit_scale in [0.75, 0.8, 0.85, 0.9, 0.95, 1.0]:
            for space_w in [24, 25, 26, 27, 28, 29, 30]:
                for b_mult in [1.15, 1.2, 1.25, 1.3]:
                    for f_b_mult in [1.2, 1.3, 1.4, 1.5, 1.6]:
                        widths = dict(base_widths)
                        widths[' '] = space_w
                        for k in widths:
                            if k.isupper():
                                widths[k] = int(widths[k] * cap_scale)
                            elif k.isdigit():
                                widths[k] = int(widths[k] * digit_scale)
                        
                        matches = 0
                        results = []
                        for s in samples:
                            calc = calculate_lines(s["tokens"], s["bold_words"], max_w, widths, b_mult, f_b_mult)
                            results.append(calc)
                            if calc == s["expected"]:
                                matches += 1
                        
                        if matches > best_matches:
                            best_matches = matches
                            best_params = {
                                "max_width": max_w,
                                "cap_scale": cap_scale,
                                "digit_scale": digit_scale,
                                "space_w": space_w,
                                "bold_mult": b_mult,
                                "first_bold_mult": f_b_mult,
                                "results": results
                            }
                            print(f"Match: {matches}/5 | Params: {best_params}")
                            if matches == 5:
                                break
                    if best_matches == 5: break
                if best_matches == 5: break
            if best_matches == 5: break
        if best_matches == 5: break
    if best_matches == 5: break

if best_matches == 5:
    print("\nSUCCESS! Found perfect match configuration!")
    print(best_params)
else:
    print(f"\nFailed to find perfect match. Best: {best_matches}/5")
    print(best_params)
