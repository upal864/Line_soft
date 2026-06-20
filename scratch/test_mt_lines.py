import re

widths = {
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

def get_word_width(word, is_bold=False):
    w_sum = 0
    for c in word:
        w = widths.get(c, 55)
        if is_bold:
            w = int(w * 1.2)
        w_sum += w
    return w_sum

def analyze_sample(name, text, bold_words):
    print(f"\n=== Analyzing {name} ===")
    words = text.split(' ')
    for w in words:
        clean = re.sub(r'[.,()":|]', '', w)
        is_bold = clean in bold_words or w in bold_words
        w_width = get_word_width(w, is_bold)
        print(f"Word: '{w}' | width={w_width} | bold={is_bold}")

# MAH4
mah4_text = "FEMALE Medical Typist / Transcriptionist with speed 40wpm for MRI CT Scan Centre , Contact 8850927330"
analyze_sample("MAH4", mah4_text, ["FEMALE"])

# MAH5
mah5_text = "VACANCIES for receptionists, sister,Wordboy in Borivali based Hospital. Computer knowledge is must [Receptionist]. Payment negotiable . Send resume on WhatsApp:- 9820550730. Please do not call"
analyze_sample("MAH5", mah5_text, ["VACANCIES"])
