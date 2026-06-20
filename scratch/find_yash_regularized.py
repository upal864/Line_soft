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
    }
]

matras = ['ा', 'ि', 'ी', 'ु', 'ू', 'ृ', 'े', 'ै', 'ो', 'ौ', '्', 'ं', 'ः', 'ँ', '़']

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

def calc_lines(tokens, max_w, widths):
    lines = 1
    cur_w = 0
    sp_w = widths.get(' ', 25)
    for t in tokens:
        word_w = sum(widths.get(c, 56) for c in t["text"])
        spacing = sp_w if t["has_space"] and cur_w > 0 else 0
        if cur_w == 0:
            cur_w += word_w
        elif cur_w + spacing + word_w <= max_w:
            cur_w += spacing + word_w
        else:
            lines += 1
            cur_w = word_w
    return lines

population_size = 300
num_generations = 1000

# Base realistic widths
def get_base_width(c):
    if c in matras: return 0
    if '\u0900' <= c <= '\u097F': return 56
    if c in '0123456789': return 50
    if c in ' .,-:/()!': return 25
    if 'A' <= c <= 'Z': return 55
    if 'a' <= c <= 'z': return 45
    return 50

population = []
for _ in range(population_size):
    ind = {c: get_base_width(c) + random.randint(-5, 5) for c in all_chars}
    for c in matras:
        if c in ind: ind[c] = random.randint(0, 5)
    max_w = random.randint(1200, 1500)
    population.append((ind, max_w))

def fitness(ind_tuple):
    ind, max_w = ind_tuple
    score = 0
    diff_penalty = 0
    
    # Check lines
    for s in samples:
        lines = calc_lines(s["tokens"], max_w, ind)
        if lines == s["expected"]:
            score += 100
        else:
            diff_penalty += abs(lines - s["expected"]) * 10
            
    # Regularization penalty
    reg_penalty = 0
    for c in all_chars:
        base = get_base_width(c)
        reg_penalty += abs(ind[c] - base) * 0.1
        
    return score - diff_penalty - reg_penalty

best_match = None
for gen in range(num_generations):
    population.sort(key=fitness, reverse=True)
    best_score = fitness(population[0])
    
    # 600 base score means all 6 match
    if best_score > 590:
        if best_match is None or fitness(population[0]) > fitness(best_match):
            best_match = population[0]
            
    next_gen = population[:20]
    while len(next_gen) < population_size:
        p1 = random.choice(population[:50])
        p2 = random.choice(population[:50])
        child_ind = {}
        for c in all_chars:
            child_ind[c] = p1[0][c] if random.random() < 0.5 else p2[0][c]
        child_max_w = p1[1] if random.random() < 0.5 else p2[1]
        
        if random.random() < 0.3:
            mut_char = random.choice(list(all_chars))
            child_ind[mut_char] += random.randint(-5, 5)
            if child_ind[mut_char] < 0: child_ind[mut_char] = 0
        if random.random() < 0.3:
            child_max_w += random.randint(-20, 20)
            
        next_gen.append((child_ind, child_max_w))
    population = next_gen

print(f"Best fitness: {fitness(best_match)}")
print(f"Max Width: {best_match[1]}")
print(json.dumps(best_match[0], ensure_ascii=False))

