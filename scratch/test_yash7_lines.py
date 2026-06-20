text = "पुरूष/ महिला बाऊंसर अंधेरी वेस्ट के लिए संपर्क: CISB P. LTD., B-46, नथानी हाई ट्स, मुंबई सेन्ट्रल ब्रीज, मुंबई या 301, कुशवाहा चेंबर्स, मकवाना रोड, अंधेरी ईस्ट, मुंबई 9869343565"

matras = ['ा', 'િ', 'ી', 'ु', 'ू', 'ृ', 'े', 'ै', 'ो', 'ौ', '्', 'ं', 'ः', 'ँ', '़', 'ि', 'ी']

def get_char_width(c):
    if c in matras: return 0
    if '\u0900' <= c <= '\u097F': return 56
    if c in '0123456789': return 45
    if c in ' .,-:/()!':
        if c == ' ': return 15
        return 25
    if 'A' <= c <= 'Z' or 'a' <= c <= 'z': return 37
    return 50

words = text.split(' ')
tokens = []
for w in words:
    if not w: continue
    parts = []
    current = ""
    for i, char in enumerate(w):
        current += char
        if (char == '-' or char == '/') and i < len(w) - 1:
            parts.append({"text": current, "has_space": len(parts) == 0})
            current = ""
        elif char == '.' and i < len(w) - 1:
            if w[i+1].isalnum() or '\u0900' <= w[i+1] <= '\u097F':
                parts.append({"text": current, "has_space": len(parts) == 0})
                current = ""
    if current:
        parts.append({"text": current, "has_space": len(parts) == 0})
    tokens.extend(parts)

lines = []
current_line = []
cur_w = 0
sp_w = get_char_width(' ')

for t in tokens:
    word_w = sum(get_char_width(c) for c in t["text"])
    spacing = sp_w if t["has_space"] and cur_w > 0 else 0
    if cur_w == 0:
        cur_w += word_w
        current_line.append(t["text"])
    elif cur_w + spacing + word_w <= 1200:
        cur_w += spacing + word_w
        current_line.append((" " if t["has_space"] else "") + t["text"])
    else:
        lines.append("".join(current_line))
        current_line = [t["text"]]
        cur_w = word_w
if current_line:
    lines.append("".join(current_line))

for i, l in enumerate(lines):
    print(f"L{i+1}: {l}")

