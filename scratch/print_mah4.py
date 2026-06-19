import re
from find_mt_width import tokenize_mt, base_widths, calculate_lines, samples

for s in samples:
    if s["id"] == "MAH4":
        tokens = tokenize_mt(s["text"])
        
        lines = []
        current_line = []
        current_line_width = 0
        space_width = base_widths.get(' ', 28)
        
        for word_text, has_space in tokens:
            clean_word = re.sub(r'[.,()":|+&@/-]', '', word_text)
            is_bold = clean_word in s["bold_words"] or word_text in s["bold_words"]
            
            word_width = 0
            for c in word_text:
                w = base_widths.get(c, 55)
                if is_bold:
                    w = int(w * 1.2)
                word_width += w
                
            spacing = space_width if has_space and current_line_width > 0 else 0
            
            if current_line_width == 0:
                current_line_width += word_width
                current_line.append((word_text, word_width))
            elif current_line_width + spacing + word_width <= 1440:
                current_line_width += spacing + word_width
                current_line.append((word_text, word_width))
            else:
                lines.append((current_line, current_line_width))
                current_line = [(word_text, word_width)]
                current_line_width = word_width
                
        if current_line:
            lines.append((current_line, current_line_width))
            
        for i, (l, w) in enumerate(lines):
            words = " ".join([x[0] for x in l])
            print(f"Line {i+1}: {words} (Width: {w})")
