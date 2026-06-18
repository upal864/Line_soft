import re

base_widths = {
    'i': 18, 'l': 20, 'j': 20, 'f': 25, 't': 25, 'r': 30, 'I': 30,
    'm': 80, 'w': 70, 'M': 80, 'W': 85,
    'a': 50, 'b': 50, 'c': 50, 'd': 50, 'e': 50, 'g': 50, 'h': 50, 'n': 50, 'o': 50, 'p': 50, 'q': 50, 's': 45, 'u': 50, 'v': 50, 'x': 50, 'y': 50, 'z': 50,
    ' ': 20, '.': 25, ',': 25, '-': 30, '+': 50, '&': 60, '(': 30, ')': 30, ':': 25, '@': 85, '/': 30
}
caps = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
for c in caps:
    if c not in base_widths:
        base_widths[c] = 65
for d in '0123456789':
    b = 50 if d == '1' else 55
    base_widths[d] = int(b * 0.9)

text = 'REQUIRED Female Teaching Staff for English Medium School Academic Year: 2026-27 Secondary Section: B.Sc. B.Ed. D.Ed (Science & Maths), B.A. B.Ed. (Hindi) and (English) Drawing & Craft Teacher Primary Section: Class Teacher (B.Com. B.Ed, D.Ed, ECCED) walk in interview on 18th June 2026 (Thursday) at 3.00 PM. SUNGRACE ENGLISH HIGH SCHOOL & JR. COLLEGE, 1, Milind Nagar, Himalaya Society Rd, Near Asalfa Metro Station, Ghatkopar (W.), M-84. Contact: ssungraceschool@yahoo.com'

def getWordPixelWidth(word, isBold, isFirstWord):
    width = sum(base_widths.get(c, 50) for c in word)
    if isFirstWord and isBold:
        return int(width * 1.6)
    return int(width * 1.2) if isBold else width

tokens = [w for w in text.split(' ') if w]
boldWords = ['REQUIRED', 'SUNGRACE', 'ENGLISH', 'HIGH', 'SCHOOL', '&', 'JR.', 'COLLEGE,']

lines = []
currentLine = []
currentWidth = 0

for t in tokens:
    clean = re.sub(r'[.,()":|+&@\/-]', '', t)
    isBold = clean in boldWords or t in boldWords
    isFirstWord = len(lines) == 0 and len(currentLine) == 0
    w_width = getWordPixelWidth(t, isBold, isFirstWord)
    spacing = base_widths[' '] if currentLine else 0
    
    if currentWidth == 0:
        currentWidth += w_width
        currentLine.append(t)
    elif currentWidth + spacing + w_width <= 1290:
        currentWidth += spacing + w_width
        currentLine.append(t)
    else:
        lines.append(currentLine)
        currentLine = [t]
        currentWidth = w_width

if currentLine:
    lines.append(currentLine)

print(f'Lines: {len(lines)}')
for i, l in enumerate(lines):
    line_w = sum(getWordPixelWidth(w, re.sub(r'[.,()":|+&@\/-]', '', w) in boldWords or w in boldWords, i==0 and l.index(w)==0) for w in l) + (len(l)-1)*20
    print(f'Line {i+1}: {" ".join(l)} ({line_w}px)')
