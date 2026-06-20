import random
import json

samples = [
    {
        "text": "स्वतःचा लघुउद्योग सुरू करून दिवसा 3000/- कमवा अनिरूध्दा दादर - 8652643434/9076403434",
        "expected": 3
    },
    {
        "text": "हाऊसकीपिंग मुलांची भरती परेल ते गोरेगाव व कुर्ला ते वाशी करिता पगार 14,500/- ते 17,500/- + PF + ESIC + बोनस (प्लेसमेंट नाही), पत्ता : A 1 सर्व्हिर्सेस, परेल-ईस्ट, संपर्क: 9321131276",
        "expected": 6
    },
    {
        "text": "सुरक्षा गार्ड भरती मुंबई सॅलरी 18- 25 राहणे खाणे फ्री 9925736285",
        "expected": 2
    },
    {
        "text": "12/24 तास घरकामासाठी महिला/ मुली पाहिजे. पगार 20,000/- ते 30,000/-संपर्क -9136740609/ 9324389592",
        "expected": 4
    },
    {
        "text": "भांडुप येथे सफाईसाठी स्त्री/पुरूष पाहिजे. 12000/-, 1ला माळा, B विंग, तारामोती अपार्टमेंट, शिवाई शाळेजवळ, नाहूर (पूर्व) 7021704637",
        "expected": 4
    },
    {
        "text": "Urgent requirement for peon, qualification SSC / HSC for Smt H M Gala English School, V P Cross Road, Mulund West, Mumbai- 80, Mobile 9324779308, 9769470825 Email hmgalaprimary@gmail.com",
        "expected": 8
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
                parts.append({"text": current, "has_space": len(parts) == 0, "orig": w})
                current = ""
            elif char == '.' and i < len(w) - 1:
                if w[i+1].isalnum() or '\u0900' <= w[i+1] <= '\u097F':
                    parts.append({"text": current, "has_space": len(parts) == 0, "orig": w})
                    current = ""
        if current:
            parts.append({"text": current, "has_space": len(parts) == 0, "orig": w})
        tokens.extend(parts)
    return tokens

for s in samples:
    s["tokens"] = tokenize(s["text"])
    s["first_word"] = s["text"].split(' ')[0].replace('.', '').replace(',', '')

def calc_lines(tokens, first_word, max_w, widths):
    lines = 1
    cur_w = 0
    sp_w = widths.get(' ', 25)
    for t in tokens:
        # In this newspaper, does it bold the first word? Let's assume the standard fallback from UI applies
        clean_word = t["orig"].replace(',', '').replace('.', '').replace('(', '').replace(')', '').replace(':', '').replace('/', '').replace('-', '')
        is_bold = (clean_word == first_word)
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

population_size = 400
population = []
for _ in range(population_size):
    ind = {c: get_base_width(c) + random.randint(-4, 4) for c in all_chars}
    for c in matras:
        if c in ind: ind[c] = random.randint(0, 3)
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
    if fitness(population[0]) > 590: # 6 samples = 600 max
        print(f"Gen {gen}: PERFECT MATCH! {fitness(population[0])}")
        best_ind, best_max_w = population[0]
        print(f"Max Width: {best_max_w}")
        print(json.dumps(best_ind, ensure_ascii=False))
        exit(0)
        
    next_gen = population[:40]
    while len(next_gen) < population_size:
        p1 = random.choice(population[:100])
        p2 = random.choice(population[:100])
        child_ind = {c: (p1[0][c] if random.random() < 0.5 else p2[0][c]) for c in all_chars}
        child_max_w = p1[1] if random.random() < 0.5 else p2[1]
        
        if random.random() < 0.3:
            mut_char = random.choice(list(all_chars))
            child_ind[mut_char] += random.randint(-5, 5)
            if child_ind[mut_char] < 0: child_ind[mut_char] = 0
        if random.random() < 0.3:
            child_max_w += random.randint(-15, 15)
            
        next_gen.append((child_ind, child_max_w))
    population = next_gen

best_ind, best_max_w = population[0]
print(f"Best fitness: {fitness(population[0])}")
print(f"Max Width: {best_max_w}")
print(json.dumps(best_ind, ensure_ascii=False))
