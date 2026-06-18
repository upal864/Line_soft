import json
import re

# Standard starting widths for serif font
base_widths = {
    'i': 18, 'l': 20, 'j': 20, 'f': 25, 't': 25, 'r': 30, 'I': 30,
    'm': 80, 'w': 70, 'M': 80, 'W': 85,
    'a': 50, 'b': 50, 'c': 50, 'd': 50, 'e': 50, 'g': 50, 'h': 50, 'n': 50, 'o': 50, 'p': 50, 'q': 50, 's': 45, 'u': 50, 'v': 50, 'x': 50, 'y': 50, 'z': 50,
    '0': 55, '1': 50, '2': 55, '3': 55, '4': 55, '5': 55, '6': 55, '7': 55, '8': 55, '9': 55,
    ' ': 25, '.': 25, ',': 25, '-': 30, '+': 50, '&': 60, '(': 30, ')': 30, ':': 25, '@': 85, '/': 30
}
# Default caps mapping
caps = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
for c in caps:
    if c not in base_widths:
        base_widths[c] = 65

def get_char_width(c, widths):
    return widths.get(c, 50)

def wrap_text_et(text, max_width, widths, bold_words=[]):
    # Instead of just splitting by space, we also split by '-' to simulate native hyphenation
    # e.g., "UP-201013," -> ["UP-", "201013,"] where "201013," has NO preceding space.
    
    raw_words = text.replace('\n', ' ').split(' ')
    tokens = []
    for w in raw_words:
        if w.strip() == '':
            continue
        
        # Split by hyphen if it's inside the word
        if '-' in w and w.index('-') < len(w) - 1:
            parts = w.split('-')
            for i, p in enumerate(parts):
                if i < len(parts) - 1:
                    p += '-'
                tokens.append((p, i == 0)) # i==0 means it has a preceding space (from the original word boundary)
        else:
            tokens.append((w, True))
            
    lines = 1
    current_line_width = 0
    space_width = get_char_width(' ', widths)
    
    for word_text, has_preceding_space in tokens:
        clean_word = re.sub(r'[.,():+&@/-]', '', word_text)
        is_bold = clean_word in bold_words or word_text in bold_words
        multiplier = 1.6 if is_bold else 1.0
        
        word_width = sum(int(get_char_width(c, widths) * multiplier) for c in word_text)
        
        spacing = space_width if has_preceding_space else 0
        
        if current_line_width == 0:
            current_line_width += word_width
        elif current_line_width + spacing + word_width <= max_width:
            current_line_width += spacing + word_width
        else:
            # ET does NOT auto-hyphenate natively
            # Wrap whole word
            lines += 1
            current_line_width = word_width

    return lines

et_samples = [
    ("ET1", "I, Varun Mehta R/O 252, GF, Back Side, Ashoka Enclave, Sec-35, Faridabad-121003 have changed my minor daughter name from Aadya to Aadya Mehta for all future purposes.", 6, ["I,"]),
    ("ET2", "I, Jayant Kumar Singh S/o Jitender Kumar Singh R/o Indian Oil Company Asoati, Palwal, Haryana have changed my name Jayant Kumar Singh S/o Jitender Kumar Singh to Jayant Kumar S/o Jitender Kumar for all future purposes.", 9, ["I,"]),
    ("ET3", "I, Vijaywati Devi W/o Late Rameshwar Prasad, R/o H.No. 14 Rumthiyal Gaon, P.O. Rampur Chatti, Tehsil Srinagar, Distt Pauri Garhwal, Pincode-246194, Uttrakhand, declare that my name has been wrongly written as Beejawati. My correct name is Vijaywati Devi stands amended accordingly vide Gazette of India Notification dated 28 February 2026.", 13, ["I,"]),
    ("ET4", "I, Dhruv Pandey S/o Karunesh Kumar Pandey, R/o Plot No. 108, Saraswati Vihar, Govindpuram, Ghaziabad, UP-201013, inform that Plot No. 22, Khasra No. 5, Village Dasna, (Ledger No. 1, Volume No. 7065, Page No. 330 to 343, Number 4845, dated 16/08/2007, Sub-Registrar First, Ghaziabad, is registered and the possession letter, Book No. 1, Volume No. 9262, Page No. 101 to 134, Number 7086, dated 02/11/2011, is lost somewhere. Whoever finds it, please contact the above address.", 17, ["I,"])
]

best_matches = 0
best_width = 1200
best_scale = 1.0
best_d_scale = 1.0
best_space = 25

for max_w in range(1200, 1600, 10):
    for u_scale in [0.8, 0.9, 1.0]:
        for d_scale in [0.8, 0.9, 1.0]:
            for space_w in [20, 25, 30]:
                temp_widths = dict(base_widths)
                temp_widths[' '] = space_w
                for k in temp_widths:
                    if k.isupper():
                        temp_widths[k] = int(temp_widths[k] * u_scale)
                    elif k.isdigit():
                        temp_widths[k] = int(temp_widths[k] * d_scale)

                matches = 0
                results = []
                for name, text, actual, bwords in et_samples:
                    calc = wrap_text_et(text, max_w, temp_widths, bwords)
                    results.append((name, actual, calc))
                    if calc == actual:
                        matches += 1
                
                if matches > best_matches:
                    best_matches = matches
                    best_width = max_w
                    best_scale = u_scale
                    best_d_scale = d_scale
                    best_space = space_w
                if matches == len(et_samples):
                    print(f"PERFECT MATCH FOUND! Max Width: {max_w}, Upper Scale: {u_scale}, Digit Scale: {d_scale}, Space: {space_w}")
                    for r in results:
                        print(f"  {r[0]}: Expected {r[1]}, Got {r[2]}")
                    break
            if best_matches == len(et_samples): break
        if best_matches == len(et_samples): break
    if best_matches == len(et_samples): break

if best_matches < len(et_samples):
    print(f"Best Max Width: {best_width}, Upper: {best_scale}, Digit: {best_d_scale}, Space: {best_space} with {best_matches} matches")
    temp_widths = dict(base_widths)
    temp_widths[' '] = best_space
    for k in temp_widths:
        if k.isupper():
            temp_widths[k] = int(temp_widths[k] * best_scale)
        elif k.isdigit():
            temp_widths[k] = int(temp_widths[k] * best_d_scale)
    for name, text, actual, bwords in et_samples:
        calc = wrap_text_et(text, best_width, temp_widths, bwords)
        print(f"  {name}: Expected {actual}, Got {calc}")
