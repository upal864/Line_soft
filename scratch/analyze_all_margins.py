from PIL import Image
import numpy as np
import os

def analyze_margins(image_path):
    img = Image.open(image_path).convert('L')
    arr = np.array(img)
    
    bg = np.median(arr)
    if bg > 128:
        text_mask = arr < (bg - 20)
    else:
        text_mask = arr > (bg + 20)
        
    row_active = np.any(text_mask, axis=1)
    
    # Simple line splitter based on empty rows
    lines = []
    in_line = False
    start_row = 0
    for r in range(len(row_active)):
        if row_active[r] and not in_line:
            in_line = True
            start_row = r
        elif not row_active[r] and in_line:
            in_line = False
            lines.append((start_row, r))
    if in_line:
        lines.append((start_row, len(row_active)))
        
    print(f"\n--- {image_path} (Detected {len(lines)} blocks) ---")
    for idx, (start, end) in enumerate(lines):
        line_mask = text_mask[start:end, :]
        cols_active = np.any(line_mask, axis=0)
        active_indices = np.where(cols_active)[0]
        if len(active_indices) > 0:
            left = active_indices[0]
            right = active_indices[-1]
            width = right - left
            print(f"Block {idx+1} (rows {start}-{end}): left={left}, right={right}, width={width}")

for i in range(1, 6):
    analyze_margins(f"samples/MAH{i}.png")
