from PIL import Image
import numpy as np

def measure_line_height(image_path):
    img = Image.open(image_path).convert('L')
    arr = np.array(img)
    
    bg = np.median(arr)
    if bg > 128:
        text_mask = arr < (bg - 20)
    else:
        text_mask = arr > (bg + 20)
        
    row_active = np.any(text_mask, axis=1)
    
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
        
    heights = [end - start for start, end in lines]
    avg_height = np.mean(heights) if heights else 0
    print(f"{image_path}: Average line height = {avg_height:.2f} pixels (Individual heights: {heights})")

for i in range(1, 6):
    measure_line_height(f"samples/MAH{i}.png")
