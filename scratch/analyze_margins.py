from PIL import Image
import numpy as np

def analyze_margins(image_path):
    img = Image.open(image_path).convert('L')
    arr = np.array(img)
    
    # Invert so text is > 0 (assuming light background and dark text)
    # Let's find background color (most common value)
    bg = np.median(arr)
    if bg > 128:
        # Light background, dark text
        text_mask = arr < (bg - 30)
    else:
        # Dark background, light text
        text_mask = arr > (bg + 30)
        
    # Find active rows (rows containing text)
    row_active = np.any(text_mask, axis=1)
    
    # Group active rows into lines
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
        
    print(f"\n--- Margins for {image_path} (Detected {len(lines)} lines) ---")
    for idx, (start, end) in enumerate(lines):
        line_mask = text_mask[start:end, :]
        cols_active = np.any(line_mask, axis=0)
        active_indices = np.where(cols_active)[0]
        if len(active_indices) > 0:
            left = active_indices[0]
            right = active_indices[-1]
            width = right - left
            print(f"Line {idx+1} (rows {start}-{end}): left={left}, right={right}, width={width} pixels")

analyze_margins("samples/MAH4.png")
analyze_margins("samples/MAH5.png")
analyze_margins("samples/MAH1.png")
