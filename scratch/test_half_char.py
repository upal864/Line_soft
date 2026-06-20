samples = [
    {
        "text": "सागर ज्योतिष नौकरीधंदा, प्रेमविवाह, शत्रुनाश, गुप्तसमस्या, वशीकरण यंत्र, जन्मकुंडली : 9870126299 नवी मुंबई",
        "expected": 4
    },
    {
        "text": "भिवंडीमें नामांकित ट्रान्सपोर्ट कं. के लिए लोडींग अनलोडींग क्लर्क एवं डिलिव्हरी बॉईज - तथा LPT -407-1109 केलिए ड्राइवर चाहिए। मो : 9324606851, 9324606650",
        "expected": 5
    },
    {
        "text": "गोरेगाव (पश्चिम) में पार्ले बिस्किट के लिए डिलिवरी बॉय कम लोडरकी आवश्यकता है। SSC पास, उम्र 18 से 35 साल गोरेगावमें रहनेवालों को प्राथमिकता दी जाएगी। संपर्क : 9820254124",
        "expected": 6
    },
    {
        "text": "घर बैठे दोना-पत्तल (पेपर डिश) बनाएं। महीना 30 - 35 हजार कमाएं। दो साल का एग्रीमेंट 9028160157",
        "expected": 3
    },
    {
        "text": "मुंबई स्मार्ट मीटर प्रोजेक्ट हेतू इलेक्ट्रिकल वायरमैन व सुपरवाइजर की आवश्यकता। वेतन 15000- 20000 (परक्राम्य) प्रशिक्षण उपलब्ध। प्रोत्साहन एवं करियर विकास के अवसर संपर्क: +91 8582945474",
        "expected": 6
    },
    {
        "text": "बोरीवली (वे) स्टेशन के पास गार्डभर्ती 12 घंटा ड्यूटी- वेतन गार्ड- 22,000, सुपरवाईजर- 26,000/- (आयु- 45 वर्ष के अंदर) (महिने का 4 छुट्टी) संपर्क : 9324254338/ 8169833371",
        "expected": 5
    },
    {
        "text": "पुरूष/ महिला बाऊंसर अंधेरी वेस्ट के लिए संपर्क: CISB P. LTD., B-46, नथानी हाई ट्स, मुंबई सेन्ट्रल ब्रीज, मुंबई या 301, कुशवाहा चेंबर्स, मकवाना रोड, अंधेरी ईस्ट, मुंबई 9869343565",
        "expected": 6
    }
]

matras = ['ा', 'િ', 'ી', 'ु', 'ू', 'ृ', 'े', 'ै', 'ो', 'ौ', '्', 'ं', 'ः', 'ँ', '़', 'ि', 'ी']

def get_char_width(c):
    if c in matras: return 0
    if '\u0900' <= c <= '\u097F': return 56
    if c in '0123456789': return 45
    if c in ' .,-:/()!': return 25 if c != ' ' else 15
    if 'A' <= c <= 'Z': return 55
    if 'a' <= c <= 'z': return 45
    return 50

def get_word_w(word, is_bold):
    w = 0
    for i in range(len(word)):
        char_w = get_char_width(word[i])
        # Half character heuristic
        if i < len(word) - 1 and word[i+1] == '्':
            char_w = char_w // 2 # or char_w = 0, let's try 28
        
        if is_bold: char_w = int(char_w * 1.2)
        w += char_w
    return w

def tokenize(text):
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
    return tokens

for s in samples:
    s["tokens"] = tokenize(s["text"])

def calc_lines(tokens, max_w):
    lines = 1
    cur_w = 0
    sp_w = get_char_width(' ')
    for t_idx, t in enumerate(tokens):
        # Is bold if it's the first word (very simplified logic to match app)
        is_bold = (t_idx == 0)
        word_w = get_word_w(t["text"], is_bold)
        spacing = sp_w if t["has_space"] and cur_w > 0 else 0
        if cur_w == 0:
            cur_w += word_w
        elif cur_w + spacing + word_w <= max_w:
            cur_w += spacing + word_w
        else:
            lines += 1
            cur_w = word_w
    return lines

for max_w in range(900, 1200, 5):
    res = [calc_lines(s["tokens"], max_w) for s in samples]
    matches = sum(1 for r, s in zip(res, samples) if r == s["expected"])
    if matches >= 6:
        print(f"Max W: {max_w}, Matches: {matches}, Results: {res}")
        if matches == 7:
            print("PERFECT MATCH WITH HALF-CHAR RULE!")
            exit(0)

