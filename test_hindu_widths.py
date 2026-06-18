import json
import re

# Standard starting widths (like Arial/Times New Roman)
base_widths = {
    'i': 18, 'l': 20, 'j': 20, 'f': 25, 't': 25, 'r': 30, 'I': 30,
    'm': 80, 'w': 70, 'M': 80, 'W': 85,
    'a': 50, 'b': 50, 'c': 50, 'd': 50, 'e': 50, 'g': 50, 'h': 50, 'n': 50, 'o': 50, 'p': 50, 'q': 50, 's': 45, 'u': 50, 'v': 50, 'x': 50, 'y': 50, 'z': 50,
    'A': 65, 'B': 65, 'C': 65, 'D': 65, 'E': 65, 'F': 60, 'G': 65, 'H': 65, 'J': 60, 'K': 65, 'L': 60, 'N': 65, 'O': 65, 'P': 65, 'Q': 65, 'R': 65, 'S': 65, 'T': 65, 'U': 65, 'V': 65, 'X': 65, 'Y': 65, 'Z': 65,
    '0': 55, '1': 50, '2': 55, '3': 55, '4': 55, '5': 55, '6': 55, '7': 55, '8': 55, '9': 55,
    ' ': 25, '.': 25, ',': 25, '-': 30, '+': 50, '&': 60, '(': 30, ')': 30, ':': 25, '@': 85, '/': 30
}

def get_char_width(c, widths):
    return widths.get(c, 50)

def wrap_text_hindu(text, max_width, widths, bold_words=[]):
    # Split text into words (including newlines as spaces)
    words = text.replace('\n', ' ').split(' ')
    words = [w for w in words if w.strip() != '']
    
    lines = 1
    current_line_width = 0
    space_width = get_char_width(' ', widths)
    hyphen_width = get_char_width('-', widths)
    
    for word in words:
        clean_word = re.sub(r'[.,():+&@/-]', '', word)
        is_bold = clean_word in bold_words or word in bold_words
        multiplier = 1.2 if is_bold else 1.0
        
        word_width = sum(int(get_char_width(c, widths) * multiplier) for c in word)
        
        if current_line_width == 0:
            current_line_width += word_width
        elif current_line_width + space_width + word_width <= max_width:
            current_line_width += space_width + word_width
        else:
            # Hyphenation Check
            # Try to fit as much of the word as possible + hyphen
            can_hyphenate = False
            remaining_space = max_width - (current_line_width + space_width + hyphen_width)
            
            if remaining_space > 0:
                # How many chars can fit?
                fit_chars = 0
                test_width = 0
                for i, c in enumerate(word):
                    cw = int(get_char_width(c, widths) * multiplier)
                    if test_width + cw <= remaining_space:
                        test_width += cw
                        fit_chars += 1
                    else:
                        break
                
                # Assume a word needs at least 2 chars to hyphenate before the break
                # and leaves at least 2 chars for the next line
                if fit_chars >= 2 and (len(word) - fit_chars) >= 2:
                    # We can hyphenate!
                    can_hyphenate = True
                    lines += 1
                    # Remaining part of the word goes to next line
                    remaining_word = word[fit_chars:]
                    current_line_width = sum(int(get_char_width(c, widths) * multiplier) for c in remaining_word)
            
            if not can_hyphenate:
                # Wrap whole word
                lines += 1
                current_line_width = word_width

    return lines

hindu_samples = [
    ("Hindu1", "I , Ishwari Abhijit Bhor D/o Abhi- jit Vasant Bhor W/o Naren Kumar, residing at B702 Navins Whiteber- ry, 70, Madhavaram Redhills Road, Moolakadai, Madhavaram, Tiruval- lur, Tamil Nadu - 600060, Shall henceforth be known as ISHWARI NAREN Vide Affidavit No FD 735683 Dt 05-06-2026 for all Purposes", 9, ["I", ","]),
    ("Hindu2", "MY DAUGHTER, Emma Sundar, born on 11th July 2008 (District of Birth: Chennai), residing at Old No. 20, New No. 2, Krishnapuri 1st Street, Raja Annamalaipuram, Chennai-600 028, shall henceforth be known as RORY SUNDAR Chennai, 1st June 2026.SUNDAR ARUMUGAM (Father)", 8, ["MY", "DAUGHTER,"]),
    ("Hindu3", "WANTED: HOUSEKEEPER Full-Time. (Male/Female) Trustworthy & energetic individual for daily chores (cleaning, organizing, maintenance). Full boarding + excellent salary & job security. Refs Required. Wanted: Brahmin Cook Full-Time, (Male/Female). Must be clean, hygienic & passionate about veg cooking (South Indian + North Indian expertise preferred). Premium independent accommodation + excellent salary. Ref required. Apply via email and passport size pic. Contact: travel.companionship.2026@gmail.com", 15, ["WANTED:", "HOUSEKEEPER"])
]

# Grid search for best max width and baseline font size
best_matches = 0
best_width = 1400
best_scale = 1.0

# Remove the explicit hyphens from the samples to test the auto-hyphenation engine
cleaned_samples = []
for name, text, actual, bwords in hindu_samples:
    t = text.replace("- ", "")
    if name == "Hindu1":
        t = "I , Ishwari Abhijit Bhor D/o Abhijit Vasant Bhor W/o Naren Kumar, residing at B702 Navins Whiteberry, 70, Madhavaram Redhills Road, Moolakadai, Madhavaram, Tiruvallur, Tamil Nadu - 600060, Shall henceforth be known as ISHWARI NAREN Vide Affidavit No FD 735683 Dt 05-06-2026 for all Purposes"
    elif name == "Hindu3":
        t = "WANTED: HOUSEKEEPER Full-Time. (Male/Female) Trustworthy & energetic individual for daily chores (cleaning, organizing, maintenance). Full boarding + excellent salary & job security. Refs Required. Wanted: Brahmin Cook Full-Time, (Male/Female). Must be clean, hygienic & passionate about veg cooking (South Indian + North Indian expertise preferred). Premium independent accommodation + excellent salary. Ref required. Apply via email and passport size pic. Contact: travel.companionship.2026@gmail.com"
    cleaned_samples.append((name, t, actual, bwords))

for max_w in range(1300, 1600, 10):
    for u_scale in [0.8, 0.9, 0.95, 1.0, 1.05]:
        temp_widths = dict(base_widths)
        for k in temp_widths:
            if k.isupper():
                temp_widths[k] = int(temp_widths[k] * u_scale)

        matches = 0
        results = []
        for name, text, actual, bwords in cleaned_samples:
            calc = wrap_text_hindu(text, max_w, temp_widths, bwords)
            results.append((name, actual, calc))
            if calc == actual:
                matches += 1
        
        if matches > best_matches:
            best_matches = matches
            best_width = max_w
            best_scale = u_scale
        if matches == len(cleaned_samples):
            print(f"PERFECT MATCH FOUND! Max Width: {max_w}, Upper Scale: {u_scale}")
            for r in results:
                print(f"  {r[0]}: Expected {r[1]}, Got {r[2]}")
            break
    if best_matches == len(cleaned_samples):
        break

if best_matches < len(cleaned_samples):
    print(f"Best Max Width: {best_width}, Upper Scale: {best_scale} with {best_matches} matches")
    temp_widths = dict(base_widths)
    for k in temp_widths:
        if k.isupper():
            temp_widths[k] = int(temp_widths[k] * best_scale)
    for name, text, actual, bwords in cleaned_samples:
        calc = wrap_text_hindu(text, best_width, temp_widths, bwords)
        print(f"  {name}: Expected {actual}, Got {calc}")
