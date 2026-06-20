from PIL import Image
import numpy as np

img = Image.open("samples/MAH4.png").convert('L')
arr = np.array(img)

# Invert so text is > 0
bg = np.median(arr)
text_mask = arr < (bg - 20)

line_bounds = [
    (20, 53),
    (59, 87),
    (92, 120),
    (123, 151),
    (156, 184)
]

print("MAH4.png Line Margins Analysis:")
for idx, (start, end) in enumerate(line_bounds):
    line_mask = text_mask[start:end, :]
    cols_active = np.any(line_mask, axis=0)
    active_indices = np.where(cols_active)[0]
    if len(active_indices) > 0:
        left = active_indices[0]
        right = active_indices[-1]
        width = right - left
        print(f"Line {idx+1}: left={left}, right={right}, width={width} pixels")
