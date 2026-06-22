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

all_chars = set()
for s in samples:
    for c in s["text"]:
        all_chars.add(c)
        
for s in samples:
    s["tokens"] = s["text"].split(' ')

def calc_lines(tokens, max_w, widths):
    lines = 1
    cur_w = 0
    sp_w = widths.get(' ', 20)
    for w in tokens:
        word_w = sum(widths.get(c, 50) for c in w)
        spacing = sp_w if cur_w > 0 else 0
        if cur_w == 0:
            cur_w += word_w
        elif cur_w + spacing + word_w <= max_w:
            cur_w += spacing + word_w
        else:
            lines += 1
            cur_w = word_w
    return lines

population_size = 500
num_generations = 500

# Initialization
population = []
for _ in range(population_size):
    ind = {c: random.randint(10, 80) for c in all_chars}
    for c in ' 0123456789.,-:/()!':
        ind[c] = random.randint(20, 50)
    for c in ['ा', 'િ', 'ી', 'ु', 'ू', 'ृ', 'े', 'ै', 'ो', 'ौ', '्', 'ं', 'ः', 'ि', 'ी']:
        if c in ind: ind[c] = random.randint(0, 5)
    max_w = random.randint(1200, 1600)
    population.append((ind, max_w))

def fitness(ind_tuple):
    ind, max_w = ind_tuple
    score = 0
    diff_penalty = 0
    for s in samples:
        lines = calc_lines(s["tokens"], max_w, ind)
        if lines == s["expected"]:
            score += 100
        else:
            diff_penalty += abs(lines - s["expected"]) * 10
    return score - diff_penalty

for gen in range(num_generations):
    population.sort(key=fitness, reverse=True)
    best_score = fitness(population[0])
    if best_score == 600:
        print(f"Gen {gen}: PERFECT MATCH!")
        break
        
    next_gen = population[:50] # elitism
    while len(next_gen) < population_size:
        p1 = random.choice(population[:100])
        p2 = random.choice(population[:100])
        
        # Crossover
        child_ind = {}
        for c in all_chars:
            child_ind[c] = p1[0][c] if random.random() < 0.5 else p2[0][c]
        child_max_w = p1[1] if random.random() < 0.5 else p2[1]
        
        # Mutation
        if random.random() < 0.2:
            mut_char = random.choice(list(all_chars))
            child_ind[mut_char] += random.randint(-10, 10)
            if child_ind[mut_char] < 0: child_ind[mut_char] = 0
        if random.random() < 0.2:
            child_max_w += random.randint(-50, 50)
            
        next_gen.append((child_ind, child_max_w))
    population = next_gen

best_ind, best_max_w = population[0]
print(f"Best fitness: {fitness(population[0])}")
print(f"Max Width: {best_max_w}")
print(json.dumps(best_ind, ensure_ascii=False))

