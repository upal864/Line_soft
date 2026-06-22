lines = [
    "बोरीवली (वे) स्टेशन के पास गार्डभर्ती",
    "12 घंटा ड्यूटी- वेतन गार्ड- 22,000,",
    "सुपरवाईजर- 26,000/- (आयु- 45",
    "वर्ष के अंदर) (महिने का 4 छुट्टी) संपर्क",
    ": 9324254338/ 8169833371"
]
for i, l in enumerate(lines):
    print(f"Line {i+1} length: {len(l)} -> {l}")
text = " ".join(lines)
print(f"Total length: {len(text)}")

