import re

samples = [
    {
        "id": "LOK1",
        "text": "पाहिजेत, प्लंबर पार्ट/ फुलटाइम टेक्निशियन, ॲक्वा गार्ड, SS/ MS वेल्डर/ हेल्पर, सेल्स एक्झिक्युटिव्हज M/F, ड्रायव्हर ऑफिस कामासाठी. संपर्क: ॲक्वाटेक, बिबवेवाडी, पुणे: 9075009400/ 9975235665 (726706)",
        "expected": 8
    },
    {
        "id": "LOK2",
        "text": "वॉर्डबॉय व सुपरवायझर कल्याणीनगर, पुणे येथील हॉस्पिटलसाठी पाहिजे. 8 तास ड्युटी, Over Time मिळेल पगार- 16,000/- ते 20,000 हातात. PF, ESIC, साप्ताहिक सुट्टी. संपर्क- 9552504513, 9552504520, 9552504510. (726823)",
        "expected": 9
    },
    {
        "id": "LOK3",
        "text": "महिला अकाऊंट्स असिस्टंट आवश्यक- कंपनीसाठी तात्काळ महिला Accounts Assistant आवश्यक आहे. Tally चे मूलभूत ज्ञान आवश्यक असून चिखली, मोशी, देहू- आळंदी रोड व जवळच्या परिसरातील विवाहित महिला उमेदवारांना प्राधान्य. इच्छुक उमेदवारांनी आपला Resume neha@injotech.co.in वर पाठवावा किंवा 8975936600 या क्रमांकावर संपर्क साधा. कामाचे ठिकाण: चिखली, देहू- आळंदी रोड, पुणे. (726347)",
        "expected": 15
    },
    {
        "id": "LOK4",
        "text": "ओल्डएज होम्स करिता बाणेर/ सिंहगड रोड करिता 12/ 24 तास राहणारे सेवाभावी, लेडीज सुपरवायझर, लेडीज टेली कॉलर, अकाऊंटंट लेडीज पाहिजेत. राहण्याची सोय अर्जासह भेटा: 9960115367 (726317)",
        "expected": 7
    }
]

# Baseline proportional widths (from TOI) for English/Symbols
eng_widths = {
    'A': 72, 'B': 71, 'C': 72, 'D': 72, 'E': 72, 'F': 72, 'G': 72, 'H': 72, 'I': 33, 'J': 72, 'K': 73, 'L': 72, 'M': 83, 'N': 72, 'O': 72, 'P': 72, 'Q': 72, 'R': 72, 'S': 72, 'T': 72, 'U': 72, 'V': 72, 'W': 94, 'X': 72, 'Y': 72, 'Z': 72,
    'a': 55, 'b': 55, 'c': 55, 'd': 55, 'e': 55, 'f': 28, 'g': 55, 'h': 55, 'i': 19, 'j': 22, 'k': 55, 'l': 22, 'm': 83, 'n': 55, 'o': 55, 'p': 49, 'q': 55, 'r': 33, 's': 50, 't': 28, 'u': 55, 'v': 55, 'w': 72, 'x': 55, 'y': 55, 'z': 55,
    '0': 58, '1': 52, '2': 55, '3': 55, '4': 55, '5': 55, '6': 55, '7': 55, '8': 55, '9': 55,
    ' ': 28, '.': 28, ',': 28, '-': 33, '*': 39, '&': 66, '(': 37, ')': 34, '=': 55, '+': 55, '/': 28, '|': 28, '@': 100, ':': 28, '"': 30
}

def get_word_width(w, devanagari_width, eng_scale=1.0):
    width = 0
    for char in w:
        if '\u0900' <= char <= '\u097F':
            # Devanagari character block
            # In Unicode, matras and half-letters are distinct chars
            width += devanagari_width
        else:
            width += int(eng_widths.get(char, 55) * eng_scale)
    return width

def calc_lines(text, max_w, dev_w, eng_scale, space_w):
    words = text.split(' ')
    lines = 1
    curr_w = 0
    for i, w in enumerate(words):
        w_len = get_word_width(w, dev_w, eng_scale)
        sp = space_w if curr_w > 0 else 0
        if curr_w + sp + w_len <= max_w:
            curr_w += sp + w_len
        else:
            lines += 1
            curr_w = w_len
    return lines

for w in range(1200, 1600, 20):
    for dev_w in range(30, 65, 2):
        for eng_scale in [0.8, 0.9, 1.0, 1.1]:
            for space_w in [20, 28, 35]:
                matches = 0
                for s in samples:
                    if calc_lines(s['text'], w, dev_w, eng_scale, space_w) == s['expected']:
                        matches += 1
                if matches == 4:
                    print(f"Max Width: {w}, Dev Width: {dev_w}, Eng Scale: {eng_scale}, Space: {space_w}")

