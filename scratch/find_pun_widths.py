import random
import json

samples = [
    {
        "text": 'माझे जुने नाव "रुबीना झाकीर" असे होते. माझे नवीन नाव "रुबीना झाकीर शेख" असे असून ते माझ्या अद्ययावत कागदपत्रांनुसार आहे. सदर नावाबदलाची नोंद नोटरी, क्र. 1280/26, दिनांक 09/06/2026 अन्वये करण्यात आलेली आहे.',
        "expected": 7
    },
    {
        "text": "महिला हाऊसकीपिंग स्टाफ पाहिजेत. खार रोड, आंबेडकर रोड, येथील रेस्टॉरंट साठी पगार 14,000/- 7715961563 / 9136231255",
        "expected": 4
    },
    {
        "text": "ठाणे (वसंतविहार) येथे मराठी कुटुंबांसाठी सर्वप्रकारचे जेवण बनवणारा हुशार व अनुभवी मुलगा पाहिजे. घरामध्येच जेवण बनविण्याचा अनुभव आवश्यक. अपेक्षेसह फोन करा. (महिला नको) संपर्क : 9867710014",
        "expected": 6
    },
    {
        "text": "कं.ला पॅकिंग, हाऊसकीपिंग, सिक्युरीटी मुला-मुलींची भर्ती चांगला पगार- 9594221140",
        "expected": 3
    },
    {
        "text": "ETP/STP/WTP च्या कामाचा अनुभव असणारा वर्किंग सुपरवायझर टेक्निशियन पाहिजे, पगार 30,000 शिक्षण 12वी, मेहनती आणि विश्वासू, कमीत कमी 5 वर्षांचा अनुभव आवश्यक, लोअर परेल 9870569000",
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
    # Do they bold first word? From the images: 
    # PUN1 "माझे" is NOT bolded? Or maybe it is?
    # Actually, in most Marathi papers, it isn't always bolded or it might be slightly bold. 
    # Let's see if first word bolding helps or not. We'll leave it as an option in GA.
    # From images: PUN1 "माझे" seems a bit bolder. PUN2 "महिला" seems a bit bolder. 
    s["first_word"] = s["text"].split(' ')[0].replace('.', '').replace(',', '')

def calc_lines(tokens, first_word, max_w, widths):
    lines = 1
    cur_w = 0
    sp_w = widths.get(' ', 25)
    for t in tokens:
        clean_word = t["orig"].replace(',', '').replace('.', '').replace('(', '').replace(')', '').replace(':', '').replace('/', '').replace('-', '').replace('"', '')
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
    if c in ' .,-:/()!"': return 25 if c != ' ' else 15
    if 'A' <= c <= 'Z': return 55
    if 'a' <= c <= 'z': return 45
    return 50

population_size = 400
population = []
for _ in range(population_size):
    ind = {c: get_base_width(c) + random.randint(-4, 4) for c in all_chars}
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
    if fitness(population[0]) > 490: # 5 samples = 500 max
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
