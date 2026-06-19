def get_char_widths():
    # Relative widths for a typical sans-serif proportional font
    # Base width = 100
    widths = {}
    for c in "abcdefghijkmnopqrsuvwxyz":
        widths[c] = 55
    widths['l'] = 22
    widths['i'] = 22
    widths['t'] = 28
    widths['f'] = 28
    widths['j'] = 22
    widths['r'] = 33
    widths['m'] = 83
    widths['w'] = 72

    for c in "ABCDEFGHJKLMNOPQRSTUVXYZ":
        widths[c] = 72
    widths['I'] = 28
    widths['W'] = 94
    widths['M'] = 83

    for c in "0123456789":
        widths[c] = 55

    widths[' '] = 28
    widths['.'] = 28
    widths[','] = 28
    widths['-'] = 33
    widths['*'] = 39
    widths['&'] = 66
    widths['('] = 33
    widths[')'] = 33
    widths['='] = 55
    widths['+'] = 55
    widths['/'] = 28
    widths['|'] = 28
    widths['@'] = 100
    widths[':'] = 28
    widths['"'] = 33
    widths["'"] = 28
    widths['#'] = 55
    
    return widths

widths = get_char_widths()

def get_word_width(word, is_bold=False):
    width = 0
    for char in word:
        w = widths.get(char, 55)
        if is_bold:
            w = int(w * 1.2) # Bold is usually 20% wider
        width += w
    return width

def wrap_text_proportional(text, max_width, bold_words=[]):
    words = text.split(' ')
    lines = []
    current_line = []
    current_width = 0
    space_width = widths[' ']
    
    for word in words:
        clean_word = word.strip('.,()":')
        is_bold = clean_word in bold_words or word in bold_words
        
        w_width = get_word_width(word, is_bold)
        
        if current_width == 0:
            current_line.append(word)
            current_width += w_width
        elif current_width + space_width + w_width <= max_width:
            current_line.append(word)
            current_width += space_width + w_width
        else:
            lines.append(" ".join(current_line))
            current_line = [word]
            current_width = w_width
            
    if current_line:
        lines.append(" ".join(current_line))
    return len(lines)

texts = [
    ("TEL1", "I Uppunuthala Srinivas Chary S/o Anjaneyulu Chary AGED ABOUT 47yrs H. No 9-2-372 Plot no 372 RVR Colony Road no -7 Almasguda, Badangpet RRDist TS:500058. Missed my original link Document No 1423/2003 Plot 746 servy no 438 & 440 Turkayamjal village. while traveling, See my plot Return to my home Date on 30-05-2026. If any body found please Call: 9393006543.", 8, ["I", "Uppunuthala", "Srinivas", "Chary"]),
    ("TEL2", "MY SON'S OLD NAME: B R SIDARTH CHAKRAVARTHY S/o SRINIVAS, 7 YEARS, R/o # 1-54/2, GANGWAR, NYALKAL, SANGAREDDY -TG-502249. I Changed his name as BHEEM RAO SIDHARTH S/o BHEEM RAO SRINIVAS.", 5, ["MY", "SON'S", "OLD", "NAME:", "B", "R", "SIDARTH", "CHAKRAVARTHY", "BHEEM", "RAO", "SIDHARTH"]),
    ("TEL3", "I, Amit Kumar Jai Narayan Chaubey S/o Jai Narayan Chaubey was Resident of Present Address A2/27 Mayuri Apartment Mayur Marg Opposite Hyderabad Public School Begumpet Hyderabad 500016 Has Changed my Old Name Amit Kumar Jai Narayan Chaubey to New Name Amit Kumar Chaubey for all purposes.", 6, ["I,", "Amit", "Kumar", "Jai", "Narayan", "Chaubey"]),
    ("TEL4", "I, Pantulolla Nasiruddin R/o. 2-119, Gajulapet Dhobipet Dist Shankarpally KV Rangareddy, TS. Changed My Name As Shaik Nasiruddin S/o. Khajamiyan.", 4, ["I,", "Pantulolla", "Nasiruddin"]),
    ("TEL5", "Lakkabathini Sridhar Rajesham S/o Rajesham R/o. H.No. 4-146, Mallial, Jagtial. I have changed my Name to Lakkabathini Sridhar S/o Rajesham.", 4, ["Lakkabathini", "Sridhar", "Rajesham", "S/o"])
]

import random

def optimize():
    global widths
    best_matches = 0
    best_widths = widths.copy()
    
    # Check current widths
    matches = sum(1 for name, text, actual, bold_words in texts if wrap_text_proportional(text, 1400, bold_words) == actual)
    if matches == len(texts):
        return best_widths, 1400

    for i in range(20000):
        temp_widths = best_widths.copy()
        for _ in range(5):
            char = random.choice(list(temp_widths.keys()))
            temp_widths[char] += random.randint(-8, 8)
            if temp_widths[char] < 10: temp_widths[char] = 10
            
        widths = temp_widths
        
        for max_w in range(1200, 1800, 20):
            matches = 0
            for name, text, actual, bold_words in texts:
                calc = wrap_text_proportional(text, max_w, bold_words)
                if calc == actual:
                    matches += 1
            if matches > best_matches:
                best_matches = matches
                best_widths = temp_widths.copy()
                print(f"New best: {matches}/5 at width {max_w}")
                if matches == 5:
                    print("Found perfect match!")
                    return best_widths, max_w
                    
    return best_widths, 1400

best_widths, best_width = optimize()
widths = best_widths

print(f"Final best width: {best_width}")
print("Final matches:")
for name, text, actual, bold_words in texts:
    calc = wrap_text_proportional(text, best_width, bold_words)
    print(f"{name}: actual={actual}, calc={calc}")
