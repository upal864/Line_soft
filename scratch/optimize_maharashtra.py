import re

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

def get_char_width(c):
    return base_widths.get(c, 55)

def get_word_pixel_width(word, is_bold=False):
    width = 0
    for c in word:
        w = get_char_width(c)
        if is_bold:
            w = int(w * 1.2)
        width += w
    return width

def print_layout(text, bold_words, max_width=1400):
    words = text.split(' ')
    lines = []
    current_line = []
    current_width = 0
    space_width = get_char_width(' ')
    
    for word in words:
        clean_word = re.sub(r'[.,()":|]', '', word)
        is_bold = clean_word in bold_words or word in bold_words
        word_width = get_word_pixel_width(word, is_bold)
        
        if current_width == 0:
            current_width += word_width
            current_line.append(word)
        elif current_width + space_width + word_width <= max_width:
            current_width += space_width + word_width
            current_line.append(word)
        else:
            lines.append(" ".join(current_line))
            current_line = [word]
            current_width = word_width
            
    if current_line:
        lines.append(" ".join(current_line))
        
    print(f"Total Lines: {len(lines)}")
    for idx, l in enumerate(lines):
        print(f"Line {idx+1}: {l}")

mah1_text = "SHAYONA CORPORATION, a Government Contracting Firm, invites applications for: 1) CIVIL ENGINEER (Female) – 4-5 years of experience in estimation, project quantity surveying and billing roles 2) CIVIL ENGINEER (Male) – 4-5 years exp. primarily for site supervision and execution work. Location: Thane | Job Type: Permanent. Email: dhanashree.shayona@gmail.com / 8976221639 / 9324956699"
print("=== MAH1 ===")
print_layout(mah1_text, ["SHAYONA"])

mah4_text = "FEMALE Medical Typist / Transcriptionist with speed 40wpm for MRI CT Scan Centre , Contact 8850927330"
print("\n=== MAH4 ===")
print_layout(mah4_text, ["FEMALE"])
