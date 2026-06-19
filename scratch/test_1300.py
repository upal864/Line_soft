from find_mt_width import calculate_lines, samples

print("At 1300:")
for s in samples:
    print(s["id"], "-> expected", s["expected"], "got", calculate_lines(s["tokens"], s["bold_words"], 1300))
