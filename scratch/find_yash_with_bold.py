import random
import json

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

all_chars = set()
for s in samples:
    for c in s["text"]:
        all_chars.add(c)
        
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
                parts.append({"text": current, "has_space": len(parts) == 0, "original_word": w})
                current = ""
            elif char == '.' and i < len(w) - 1:
                if w[i+1].isalnum() or '\u0900' <= w[i+1] <= '\u097F':
                    parts.append({"text": current, "has_space": len(parts) == 0, "original_word": w})
                    current = ""
        if current:
            parts.append({"text": current, "has_space": len(parts) == 0, "original_word": w})
        tokens.extend(parts)
    return tokens

for s in samples:
    s["tokens"] = tokenize(s["text"])
    s["first_word"] = s["text"].split(' ')[0]

def calc_lines(tokens, first_word, max_w, widths):
    lines = 1
    cur_w = 0
    sp_w = widths.get(' ', 25)
    for t in tokens:
        is_bold = (t["original_word"] == first_word)
        word_w = 0
        for c in t["text"]:
            char_w = widths.get(c, 56)
            if is_bold: char_w = int(char_w * 1.2)
            word_w += char_w
            
        spacing = sp_w if t["has_space"] and cur_w > 0 else 0
        if cur_w == 0:
            cur_w += word_w
        elif cur_w + spacing + word_w <= max_w:
            cur_w += spacing + word_w
        else:
            lines += 1
            cur_w = word_w
    return lines

def get_base_width(c):
    if c in matras: return 0
    if '\u0900' <= c <= '\u097F': return 56
    if c in '0123456789': return 45
    if c in ' .,-:/()!': return 25 if c != ' ' else 15
    if 'A' <= c <= 'Z': return 55
    if 'a' <= c <= 'z': return 45
    return 50

population_size = 300
population = []
for _ in range(population_size):
    ind = {c: get_base_width(c) + random.randint(-3, 3) for c in all_chars}
    for c in matras:
        if c in ind: ind[c] = random.randint(0, 2)
    max_w = random.randint(1100, 1300)
    population.append((ind, max_w))

def fitness(ind_tuple):
    ind, max_w = ind_tuple
    score = 0
    diff_penalty = 0
    for s in samples:
        lines = calc_lines(s["tokens"], s["first_word"], max_w, ind)
        if lines == s["expected"]:
            score += 100
        else:
            diff_penalty += abs(lines - s["expected"]) * 10
            
    reg_penalty = sum(abs(ind[c] - get_base_width(c)) * 0.1 for c in all_chars)
    return score - diff_penalty - reg_penalty

for gen in range(1000):
    population.sort(key=fitness, reverse=True)
    if fitness(population[0]) > 690:
        print(f"Gen {gen}: PERFECT MATCH! {fitness(population[0])}")
        best_ind, best_max_w = population[0]
        print(f"Max Width: {best_max_w}")
        print(json.dumps(best_ind, ensure_ascii=False))
        exit(0)
        
    next_gen = population[:20]
    while len(next_gen) < population_size:
        p1 = random.choice(population[:50])
        p2 = random.choice(population[:50])
        child_ind = {c: (p1[0][c] if random.random() < 0.5 else p2[0][c]) for c in all_chars}
        child_max_w = p1[1] if random.random() < 0.5 else p2[1]
        
        if random.random() < 0.3:
            mut_char = random.choice(list(all_chars))
            child_ind[mut_char] += random.randint(-4, 4)
            if child_ind[mut_char] < 0: child_ind[mut_char] = 0
        if random.random() < 0.3:
            child_max_w += random.randint(-15, 15)
            
        next_gen.append((child_ind, child_max_w))
    population = next_gen

best_ind, best_max_w = population[0]
print(f"Best fitness: {fitness(population[0])}")
print(f"Max Width: {best_max_w}")
print(json.dumps(best_ind, ensure_ascii=False))

