import re
import random
import json

samples = [
    {
        "id": "YASH1",
        "text": "सागर ज्योतिष नौकरीधंदा, प्रेमविवाह, शत्रुनाश, गुप्तसमस्या, वशीकरण यंत्र, जन्मकुंडली : 9870126299 नवी मुंबई",
        "expected_lines": [
            "सागर ज्योतिष नौकरीधंदा,",
            "प्रेमविवाह, शत्रुनाश, गुप्तसमस्या,",
            "वशीकरण यंत्र, जन्मकुंडली",
            ": 9870126299 नवी मुंबई"
        ],
        "expected": 4
    },
    {
        "id": "YASH2",
        "text": "भिवंडीमें नामांकित ट्रान्सपोर्ट कं. के लिए लोडींग अनलोडींग क्लर्क एवं डिलिव्हरी बॉईज - तथा LPT -407-1109 केलिए ड्राइवर चाहिए। मो : 9324606851, 9324606650",
        "expected_lines": [
            "भिवंडीमें नामांकित ट्रान्सपोर्ट कं.",
            "के लिए लोडींग अनलोडींग क्लर्क",
            "एवं डिलिव्हरी बॉईज - तथा LPT",
            "-407-1109 केलिए ड्राइवर चाहिए।",
            "मो : 9324606851, 9324606650"
        ],
        "expected": 5
    },
    {
        "id": "YASH3",
        "text": "गोरेगाव (पश्चिम) में पार्ले बिस्किट के लिए डिलिवरी बॉय कम लोडरकी आवश्यकता है। SSC पास, उम्र 18 से 35 साल गोरेगावमें रहनेवालों को प्राथमिकता दी जाएगी। संपर्क : 9820254124",
        "expected_lines": [
            "गोरेगाव (पश्चिम) में पार्ले बिस्किट",
            "के लिए डिलिवरी बॉय कम",
            "लोडरकी आवश्यकता है। SSC",
            "पास, उम्र 18 से 35 साल गोरेगावमें",
            "रहनेवालों को प्राथमिकता दी",
            "जाएगी। संपर्क : 9820254124"
        ],
        "expected": 6
    },
    {
        "id": "YASH4",
        "text": "घर बैठे दोना-पत्तल (पेपर डिश) बनाएं। महीना 30 - 35 हजार कमाएं। दो साल का एग्रीमेंट 9028160157",
        "expected_lines": [
            "घर बैठे दोना-पत्तल (पेपर डिश)",
            "बनाएं। महीना 30 - 35 हजार कमाएं।",
            "दो साल का एग्रीमेंट 9028160157"
        ],
        "expected": 3
    },
    {
        "id": "YASH5",
        "text": "मुंबई स्मार्ट मीटर प्रोजेक्ट हेतू इलेक्ट्रिकल वायरमैन व सुपरवाइजर की आवश्यकता। वेतन 15000- 20000 (परक्राम्य) प्रशिक्षण उपलब्ध। प्रोत्साहन एवं करियर विकास के अवसर संपर्क: +91 8582945474",
        "expected_lines": [
            "मुंबई स्मार्ट मीटर प्रोजेक्ट हेतू",
            "इलेक्ट्रिकल वायरमैन व सुपरवाइजर",
            "की आवश्यकता। वेतन 15000-",
            "20000 (परक्राम्य) प्रशिक्षण उपलब्ध।",
            "प्रोत्साहन एवं करियर विकास के",
            "अवसर संपर्क: +91 8582945474"
        ],
        "expected": 6
    }
]

# collect all unique characters
all_chars = set()
for s in samples:
    for c in s["text"]:
        all_chars.add(c)

base_widths = {c: 50 for c in all_chars}
# give spaces and punctuation smaller default widths
for c in " .,-:;()!":
    if c in base_widths:
        base_widths[c] = 25
for c in "0123456789":
    if c in base_widths:
        base_widths[c] = 50

def tokenize(text):
    return text.split(' ')

for s in samples:
    s["tokens"] = tokenize(s["text"])

def calculate_layout(tokens, max_width, widths):
    lines = []
    current_line = []
    current_line_width = 0
    space_width = widths.get(' ', 25)
    
    for word_text in tokens:
        word_width = sum(int(widths.get(c, 50)) for c in word_text)
        spacing = space_width if current_line_width > 0 else 0
        
        if current_line_width == 0:
            current_line.append(word_text)
            current_line_width += word_width
        elif current_line_width + spacing + word_width <= max_width:
            current_line.append(word_text)
            current_line_width += spacing + word_width
        else:
            lines.append(" ".join(current_line))
            current_line = [word_text]
            current_line_width = word_width
            
    if current_line:
        lines.append(" ".join(current_line))
    return lines

best_matches = 0
best_widths = base_widths.copy()
best_max_width = 1500

for i in range(50000):
    temp_widths = best_widths.copy()
    
    for _ in range(random.randint(1, 5)):
        key = random.choice(list(temp_widths.keys()))
        temp_widths[key] += random.randint(-5, 5)
        if temp_widths[key] < 5: temp_widths[key] = 5
        if temp_widths[key] > 100: temp_widths[key] = 100
        
    temp_max_width = best_max_width + random.choice([-20, -10, 0, 10, 20])
    if temp_max_width < 1000: temp_max_width = 1000
    if temp_max_width > 2000: temp_max_width = 2000
    
    matches = 0
    results = []
    for s in samples:
        layout = calculate_layout(s["tokens"], temp_max_width, temp_widths)
        if layout == s["expected_lines"]:
            matches += 1
            
    if matches > best_matches:
        best_matches = matches
        best_widths = temp_widths.copy()
        best_max_width = temp_max_width
        print(f"Iter {i}: matches={matches}/5, max_width={best_max_width}")
        if matches == 5:
            print("\nFOUND PERFECT MATCH CONFIGURATION!")
            print(f"Max Width: {best_max_width}")
            print("Widths JSON:")
            print(json.dumps(best_widths, ensure_ascii=False))
            break
