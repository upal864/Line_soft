def get_char_widths():
    # Relative widths for a typical sans-serif proportional font (like Arial)
    # Base width = 100
    widths = {}
    for c in "abcdefghijkmnopqrsuvwxyz":
        widths[c] = 55
    widths['l'] = 22
    widths['i'] = 22
    widths['t'] = 28
    widths['f'] = 28
    widths['j'] = 22
    widths['r'] = 33
    widths['m'] = 83
    widths['w'] = 72

    for c in "ABCDEFGHJKLMNOPQRSTUVXYZ":
        widths[c] = 72
    widths['I'] = 28
    widths['W'] = 94
    widths['M'] = 83

    for c in "0123456789":
        widths[c] = 55

    widths[' '] = 28
    widths['.'] = 28
    widths[','] = 28
    widths['-'] = 33
    widths['*'] = 39
    widths['&'] = 66
    widths['('] = 33
    widths[')'] = 33
    widths['='] = 55
    widths['+'] = 55
    widths['/'] = 28
    widths['|'] = 28
    widths['@'] = 100
    widths[':'] = 28
    widths['"'] = 33
    
    return widths

widths = get_char_widths()

def get_word_width(word, is_bold=False):
    width = 0
    for char in word:
        w = widths.get(char, 55)
        if is_bold:
            w = int(w * 1.2) # Bold is usually 20% wider
        width += w
    return width

def wrap_text_proportional(text, max_width, bold_words=[]):
    words = text.split(' ')
    lines = []
    current_line = []
    current_width = 0
    space_width = widths[' ']
    
    for word in words:
        # Check if word is bold
        clean_word = word.strip('.,()":')
        is_bold = clean_word in bold_words or word in bold_words
        
        w_width = get_word_width(word, is_bold)
        
        if current_width == 0:
            current_line.append(word)
            current_width += w_width
        elif current_width + space_width + w_width <= max_width:
            current_line.append(word)
            current_width += space_width + w_width
        else:
            lines.append(" ".join(current_line))
            current_line = [word]
            current_width = w_width
            
    if current_line:
        lines.append(" ".join(current_line))
    return len(lines)

texts = [
    ("ROL1", "LOCATION ivc road Ad matter Available sale of land 2400 sqft corner site at airport city 5 KMs from main airport road on IVC road in gated community for immediate sale ..only genuine buyer contact on 9342846707", 9, ["LOCATION"]),
    ("ROL2_1", "RMV II stage, near Club, 50*90, Bungalow for sale, Prime Location, Asking 25 Cr, Contact 9845687913", 4, ["RMV", "II"]),
    ("ROL2_2", "BDA Site at Arkavathi Layout for Sale First Block, Jakkur, Site No 1018 (North East Corner Site - very good for Vasthu) Measurement: (11.00 + 4.60)/2 (East to West) & 18 (North to South) = 140.40 Sq Mtrs. Total Area = 1511.27 Sq Ft. Site is 3 sides Surrounded by Roads with North 40ft East 40ft and South by 30ft 5 minutes approach to New Airport Road/up-coming Metro Station. Premier Locality with good infrastructure with Kaveri Water and surrounded by Sobha Academy, Opp to MSR Unicorn Heights. Contact No: 9845950789 & 9632577700", 19, ["BDA"]),
    ("ROL3_1", "IMMEDIATE JOINING Only Female GNM/BSc Nurses for reputed School Medical Rooms at Gunjur-Varthur Road, Hulimavu and near Nice Road, Bannerghatta Road. Good Salary and Day Shift Job. To apply, WhatsApp your CV to 9591990945 or email: hr@addresshealth.com", 10, ["IMMEDIATE", "JOINING"]),
    ("ROL3_2", "WE, Mr. Deepak Sugadan and Mrs. Anusri Deepak, residing at D-306, Vedant Vayun, Begur-Koppa Road, Bommanahalli, Bengaluru, Karnataka - 560068, parents of our minor son, hereby declare that the name of our son appearing as \"VIDYUT\" in Passport and as \"VIDYUT DEEPAK\" in Aadhaar and changing his name in the passport records from \"VIDYUT\" to \"VIDYUT DEEPAK\" for all future purposes", 15, ["WE,"]),
    ("ROL4", "WE Are Hiring Distributor Market Growth Representatives for a leading Beverage Company for Mumbai | Thane | Vashi | Raigad | Palghar locations Interested candidates with experience of 1-5 Years in field sales can walk in for interview. Candidates with 2 Wheeler Preferred Salary: 15,000 Incentives up to 18,000 Interview scheduled on 16th & 17th June Time: 10:00 AM to 3:00 PM Venue: Kanakia Wall Street, A Wing 814, Chakala, Above KFC/Starbucks, Andheri (E), Mumbai", 18, ["WE", "Are", "Hiring"]),
    ("ROL5", "MATH & Physics one to one Tuitions JEE (Main & Adv), NEET, MHCET, 11 th, 12 th. 99.50 Percentile in JEE 2026 Kapil Sir (B.tech) 7276767718", 5, ["MATH", "&", "Physics"])
]

import random

def optimize():
    global widths
    best_matches = 4
    best_widths = widths.copy()
    
    # Try random perturbations
    for i in range(10000):
        # randomly tweak a few characters
        temp_widths = best_widths.copy()
        for _ in range(3):
            char = random.choice(list(temp_widths.keys()))
            temp_widths[char] += random.randint(-5, 5)
            if temp_widths[char] < 10: temp_widths[char] = 10
            
        widths = temp_widths
        
        # Test all widths from 1200 to 1800
        for max_w in range(1300, 1600, 20):
            matches = 0
            for name, text, actual, bold_words in texts:
                calc = wrap_text_proportional(text, max_w, bold_words)
                if calc == actual:
                    matches += 1
            if matches > best_matches:
                best_matches = matches
                best_widths = temp_widths.copy()
                print(f"New best: {matches}/7 at width {max_w}")
                if matches == 7:
                    print("Found perfect match!")
                    return best_widths, max_w
                    
    return best_widths, 1400

best_widths, best_width = optimize()
widths = best_widths

print(f"Final best width: {best_width}")
print("Final matches:")
for name, text, actual, bold_words in texts:
    calc = wrap_text_proportional(text, best_width, bold_words)
    print(f"{name}: actual={actual}, calc={calc}")
print("Final widths:", widths)
