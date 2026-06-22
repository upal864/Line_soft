samples = [
    "सागर ज्योतिष नौकरीधंदा, प्रेमविवाह, शत्रुनाश, गुप्तसमस्या, वशीकरण यंत्र, जन्मकुंडली : 9870126299 नवी मुंबई",
    "भिवंडीमें नामांकित ट्रान्सपोर्ट कं. के लिए लोडींग अनलोडींग क्लर्क एवं डिलिव्हरी बॉईज - तथा LPT -407-1109 केलिए ड्राइवर चाहिए। मो : 9324606851, 9324606650",
    "गोरेगाव (पश्चिम) में पार्ले बिस्किट के लिए डिलिवरी बॉय कम लोडरकी आवश्यकता है। SSC पास, उम्र 18 से 35 साल गोरेगावमें रहनेवालों को प्राथमिकता दी जाएगी। संपर्क : 9820254124",
    "घर बैठे दोना-पत्तल (पेपर डिश) बनाएं। महीना 30 - 35 हजार कमाएं। दो साल का एग्रीमेंट 9028160157",
    "मुंबई स्मार्ट मीटर प्रोजेक्ट हेतू इलेक्ट्रिकल वायरमैन व सुपरवाइजर की आवश्यकता। वेतन 15000- 20000 (परक्राम्य) प्रशिक्षण उपलब्ध। प्रोत्साहन एवं करियर विकास के अवसर संपर्क: +91 8582945474"
]
expected = [4, 5, 6, 3, 6]

def calc_lines(text, max_chars):
    words = text.split(' ')
    lines = 1
    current_chars = 0
    for w in words:
        if current_chars == 0:
            current_chars = len(w)
        elif current_chars + 1 + len(w) <= max_chars:
            current_chars += 1 + len(w)
        else:
            lines += 1
            current_chars = len(w)
    return lines

for max_chars in range(15, 60):
    res = [calc_lines(s, max_chars) for s in samples]
    if res == expected:
        print(f"Match found for word wrap at max_chars={max_chars}")
        for i, s in enumerate(samples):
            words = s.split(' ')
            lines = []
            cur_line = []
            cur_len = 0
            for w in words:
                if cur_len == 0:
                    cur_line.append(w)
                    cur_len = len(w)
                elif cur_len + 1 + len(w) <= max_chars:
                    cur_line.append(w)
                    cur_len += 1 + len(w)
                else:
                    lines.append(" ".join(cur_line))
                    cur_line = [w]
                    cur_len = len(w)
            if cur_line:
                lines.append(" ".join(cur_line))
            print(f"Sample {i+1}:")
            for l in lines:
                print(f"  {l}")

