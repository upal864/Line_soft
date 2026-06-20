import re
import random
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
            if char in ['-', '/'] and i < len(w) - 1:
                parts.append((current, len(parts) == 0))
                current = ""
            elif char == '.' and i < len(w) - 1:
                if w[i+1].isalnum():
                    parts.append((current, len(parts) == 0))
                    current = ""
        if current:
            parts.append((current, len(parts) == 0))
            
        for p, is_first in parts:
            tokens.append((p, is_first))
    return tokens

for s in samples:
    s["tokens"] = tokenize_mt(s["text"])

def calculate_lines(tokens, bold_words, max_width, widths, bold_mult):
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
                multiplier = bold_mult
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

best_matches = 0
best_widths = base_widths.copy()
best_max_width = 1440
best_bold_mult = 1.2

# We run a very large number of independent perturbations
for i in range(200000):
    temp_widths = best_widths.copy()
    
    # Perturb between 1 and 4 random character widths
    for _ in range(random.randint(1, 4)):
        key = random.choice(list(temp_widths.keys()))
        temp_widths[key] += random.randint(-4, 4)
        if temp_widths[key] < 8: temp_widths[key] = 8
        if temp_widths[key] > 120: temp_widths[key] = 120
        
    temp_max_width = best_max_width + random.choice([-20, -10, 0, 10, 20])
    if temp_max_width < 1200: temp_max_width = 1200
    if temp_max_width > 1550: temp_max_width = 1550
    
    temp_bold_mult = round(best_bold_mult + random.choice([-0.05, 0, 0.05]), 2)
    if temp_bold_mult < 1.0: temp_bold_mult = 1.0
    if temp_bold_mult > 1.6: temp_bold_mult = 1.6

    matches = 0
    results = []
    for s in samples:
        calc = calculate_lines(s["tokens"], s["bold_words"], temp_max_width, temp_widths, temp_bold_mult)
        results.append(calc)
        if calc == s["expected"]:
            matches += 1
            
    if matches > best_matches:
        best_matches = matches
        best_widths = temp_widths.copy()
        best_max_width = temp_max_width
        best_bold_mult = temp_bold_mult
        print(f"Iter {i}: matches={matches}/5, max_width={best_max_width}, bold_mult={best_bold_mult}, results={results}")
        if matches == 5:
            print("\nFOUND PERFECT MATCH CONFIGURATION!")
            print(f"Max Width: {best_max_width}")
            print(f"Bold Mult: {best_bold_mult}")
            print("Widths JSON:")
            print(json.dumps(best_widths))
            break
            
if best_matches < 5:
    print(f"\nOptimization finished. Best matches: {best_matches}/5")
