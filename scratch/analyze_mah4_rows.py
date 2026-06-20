from PIL import Image
import numpy as np

img = Image.open("samples/MAH4.png").convert('L')
arr = np.array(img)

# Invert image (assuming white background)
bg = np.median(arr)
text_mask = arr < (bg - 20)

# Print vertical profile (number of text pixels per row)
row_pixels = np.sum(text_mask, axis=1)

# Let's find local minima in row_pixels to find line breaks
# We can smooth it a bit first
window_size = 5
smoothed = np.convolve(row_pixels, np.ones(window_size)/window_size, mode='same')

# Print row index and pixel count to find splits manually
print("Row pixel counts (smoothed):")
for r in range(len(smoothed)):
    print(f"Row {r}: pixels={smoothed[r]:.1f}")
