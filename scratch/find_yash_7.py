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

# Brute force ranges
for max_w in range(1000, 1500, 5):
    for space_w in range(15, 35, 2):
        for eng_up_w in range(40, 65, 2):
            for eng_low_w in range(30, 50, 4):
                for num_w in range(35, 55, 2):
                    for punct_w in range(15, 35, 2):
                        def get_w(c):
                            if c in matras: return 0
                            if '\u0900' <= c <= '\u097F': return 56
                            if c in '0123456789': return num_w
                            if c in ' .,-:/()!': return punct_w if c != ' ' else space_w
                            if 'A' <= c <= 'Z': return eng_up_w
                            if 'a' <= c <= 'z': return eng_low_w
                            return 50
                        
                        def calc_l(tokens, max_w):
                            lines = 1
                            cur_w = 0
                            sp_w = space_w
                            for t in tokens:
                                word_w = sum(get_w(c) for c in t["text"])
                                spacing = sp_w if t["has_space"] and cur_w > 0 else 0
                                if cur_w == 0: cur_w += word_w
                                elif cur_w + spacing + word_w <= max_w: cur_w += spacing + word_w
                                else: lines += 1; cur_w = word_w
                            return lines
                        
                        matches = sum(1 for s in samples if calc_l(s["tokens"], max_w) == s["expected"])
                        if matches == 7:
                            print(f"PERFECT! space={space_w}, eng_up={eng_up_w}, eng_low={eng_low_w}, num={num_w}, punct={punct_w}, max_w={max_w}")
                            exit(0)

