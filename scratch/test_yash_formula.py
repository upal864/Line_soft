import math

lengths = [106, 153, 169, 93, 184]
expected = [4, 5, 6, 3, 6]

print("Testing pure char division:")
for k in range(25, 40):
    lines = [math.ceil(l / k) for l in lengths]
    if lines == expected:
        print(f"Match found for exact division by K={k}")
        
lengths_without_spaces = [94, 131, 141, 77, 159]
print("\nTesting char division (without spaces):")
for k in range(20, 35):
    lines = [math.ceil(l / k) for l in lengths_without_spaces]
    if lines == expected:
        print(f"Match found for exact division without spaces by K={k}")

