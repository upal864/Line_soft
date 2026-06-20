import re
from find_mt_width import tokenize_mt, base_widths, samples

def calculate_lines_with_scales(tokens, bold_words, max_width, caps_scale, digit_scale):
    lines = 1
    current_line_width = 0
    space_width = base_widths.get(' ', 28)
    
    for word_text, has_space in tokens:
        clean_word = re.sub(r'[.,()":|+&@/-]', '', word_text)
        is_bold = clean_word in bold_words or word_text in bold_words
        
        word_width = 0
        for c in word_text:
            w = base_widths.get(c, 55)
            if c.isupper():
                w = int(w * caps_scale)
            elif c.isdigit():
                w = int(w * digit_scale)
            if is_bold:
                w = int(w * 1.2)
            word_width += w
            
        spacing = space_width if has_space and current_line_width > 0 else 0
        
        if current_line_width == 0:
            current_line_width += word_width
        elif current_line_width + spacing + word_width <= max_width:
            current_line_width += spacing + word_width
        else:
            lines += 1
            current_line_width = word_width
            
    return lines

for max_w in range(1200, 1600, 10):
    for c_scale in [0.7, 0.8, 0.9, 1.0, 1.1, 1.2, 1.3, 1.4, 1.5]:
        for d_scale in [0.7, 0.8, 0.9, 1.0, 1.1, 1.2]:
            matches = 0
            for s in samples:
                calc = calculate_lines_with_scales(s["tokens"], s["bold_words"], max_w, c_scale, d_scale)
                if calc == s["expected"]:
                    matches += 1
            if matches == 5:
                print(f"FOUND! Max_W={max_w}, Caps_Scale={c_scale}, Digit_Scale={d_scale}")
