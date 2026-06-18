import json
import re

base_widths = {
    'i': 18, 'l': 20, 'j': 20, 'f': 25, 't': 25, 'r': 30, 'I': 30,
    'm': 80, 'w': 70, 'M': 80, 'W': 85,
    'a': 50, 'b': 50, 'c': 50, 'd': 50, 'e': 50, 'g': 50, 'h': 50, 'n': 50, 'o': 50, 'p': 50, 'q': 50, 's': 45, 'u': 50, 'v': 50, 'x': 50, 'y': 50, 'z': 50,
    '0': 55, '1': 50, '2': 55, '3': 55, '4': 55, '5': 55, '6': 55, '7': 55, '8': 55, '9': 55,
    ' ': 25, '.': 25, ',': 25, '-': 30, '+': 50, '&': 60, '(': 30, ')': 30, ':': 25, '@': 85, '/': 30
}
caps = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
for c in caps:
    if c not in base_widths:
        base_widths[c] = 72

def get_char_width(c, widths):
    return widths.get(c, 50)

def wrap_text_mirror(text, max_width, widths, bold_words=[]):
    raw_words = text.replace('\n', ' ').split(' ')
    tokens = []
    for w in raw_words:
        if w.strip() == '':
            continue
        tokens.append((w, True))
            
    lines = 1
    current_line_width = 0
    space_width = get_char_width(' ', widths)
    line_str = []
    
    first_word_done = False
    
    for word_text, has_preceding_space in tokens:
        clean_word = re.sub(r'[.,():+&@/-]', '', word_text)
        is_bold = clean_word in bold_words or word_text in bold_words
        
        # Test first word is massive?
        if not first_word_done:
            multiplier = 1.6 if is_bold else 1.0
            first_word_done = True
        else:
            multiplier = 1.2 if is_bold else 1.0 # Use 1.2 for Mirror
        
        word_width = sum(int(get_char_width(c, widths) * multiplier) for c in word_text)
        spacing = space_width if has_preceding_space else 0
        
        if current_line_width == 0:
            current_line_width += word_width
        elif current_line_width + spacing + word_width <= max_width:
            current_line_width += spacing + word_width
        else:
            lines += 1
            current_line_width = word_width

    return lines

samples = [
    ("Mirror1", "WANTED Late Sau. S. R. Abhang Memorial College Of Arts & Commerce, Ulhasnagar * I/C Principal (Commerce) - NET/SET Passed/Appeared, Minimum 3 Years Experience, Asst. Profesor M.A History, Clerk - Commerce Graduate with Computer Knowledge. Interested candidates may send their Bio-data on WhatsApp only. Mob.: 9158446600", 12, ["WANTED"]),
    ("Mirror2", "A reputed school in Malad (west) requires qualified Primary Teacher, Drawing Teacher, Clerk, Lab. Assistant/ Attendant, and a Peon. Eligible candidates are requested to email their detailed resume to ijs.222324@gmail.com a.s.a.p.", 8, ["A"]),
    ("Mirror3", "RESTART-YOUR-CAREER in Govt. Regd. Co. Only 50+. Retired, VRS, Pensioners, NRI, Sr. Officers. Get Great Package +Extra Benefits.Call:9869485101", 5, ["RESTART-YOUR-CAREER", "RESTART", "YOUR", "CAREER"]),
    ("Mirror4", "REENA MEHTA COLLEGE, 150 FEET ROAD, BHAYANDAR WEST requires full time faculty for Accounting and Finance, Food And Beverages, Front Office, BMS , IT ,Data science and Management Subjects. Also required clerk with 3 years of experience in Degree college. Candidate should be experienced and NET/ SET qualified . Apply to PRINCIPAL jobs@rmc.edu.in Walk in interview 11.00 am to 02.00 pm Tel 28176264 / 66 / 68", 16, ["REENA"])
]

best_matches = 0
best_width = 1400
best_scale = 1.0
best_d_scale = 1.0
best_space = 25

for max_w in range(1200, 1800, 10):
    for u_scale in [0.9, 1.0, 1.1]:
        for d_scale in [0.9, 1.0, 1.1]:
            for space_w in [20, 25, 30]:
                temp_widths = dict(base_widths)
                temp_widths[' '] = space_w
                for k in temp_widths:
                    if k.isupper():
                        temp_widths[k] = int(temp_widths[k] * u_scale)
                    elif k.isdigit():
                        temp_widths[k] = int(temp_widths[k] * d_scale)

                matches = 0
                for name, text, actual, bwords in samples:
                    calc = wrap_text_mirror(text, max_w, temp_widths, bwords)
                    if calc == actual:
                        matches += 1
                
                if matches >= 3:
                    print(f"Match=3 at max_w={max_w}, u_scale={u_scale}, d_scale={d_scale}, space={space_w}")
                    for name, text, actual, bwords in samples:
                        calc = wrap_text_mirror(text, max_w, temp_widths, bwords)
                        if calc != actual:
                            print(f"  FAILED {name}: Expected {actual}, Got {calc}")
                if matches > best_matches:
                    best_matches = matches
                    best_width = max_w
                    best_scale = u_scale
                    best_d_scale = d_scale
                    best_space = space_w
                if matches == len(samples):
                    print(f"PERFECT MATCH! Max Width: {max_w}, Upper: {u_scale}, Digit: {d_scale}, Space: {space_w}")
                    for name, text, actual, bwords in samples:
                        print(f"  {name}: {wrap_text_mirror(text, max_w, temp_widths, bwords)}")
                    break
            if best_matches == len(samples): break
        if best_matches == len(samples): break
    if best_matches == len(samples): break

if best_matches < len(samples):
    print(f"Best Max Width: {best_width}, Upper: {best_scale}, Digit: {best_d_scale}, Space: {best_space} with {best_matches} matches")
    temp_widths = dict(base_widths)
    temp_widths[' '] = best_space
    for k in temp_widths:
        if k.isupper():
            temp_widths[k] = int(temp_widths[k] * best_scale)
        elif k.isdigit():
            temp_widths[k] = int(temp_widths[k] * best_d_scale)
    for name, text, actual, bwords in samples:
        if name == "Mirror3" and calc == 5:
            pass # We want to find cases where Mirror3 = 5

