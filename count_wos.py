texts = [
    ("ROL1", "LOCATION ivc road Ad matter Available sale of land 2400 sqft corner site at airport city 5 KMs from main airport road on IVC road in gated community for immediate sale ..only genuine buyer contact on 9342846707", 9),
    ("ROL2_1", "RMV II stage, near Club, 50*90, Bungalow for sale, Prime Location, Asking 25 Cr, Contact 9845687913", 4),
    ("ROL2_2", "BDA Site at Arkavathi Layout for Sale First Block, Jakkur, Site No 1018 (North East Corner Site - very good for Vasthu) Measurement: (11.00 + 4.60)/2 (East to West) & 18 (North to South) = 140.40 Sq Mtrs. Total Area = 1511.27 Sq Ft. Site is 3 sides Surrounded by Roads with North 40ft East 40ft and South by 30ft 5 minutes approach to New Airport Road/up-coming Metro Station. Premier Locality with good infrastructure with Kaveri Water and surrounded by Sobha Academy, Opp to MSR Unicorn Heights. Contact No: 9845950789 & 9632577700", 19),
    ("ROL3_1", "IMMEDIATE JOINING Only Female GNM/BSc Nurses for reputed School Medical Rooms at Gunjur-Varthur Road, Hulimavu and near Nice Road, Bannerghatta Road. Good Salary and Day Shift Job. To apply, WhatsApp your CV to 9591990945 or email: hr@addresshealth.com", 10),
    ("ROL3_2", "WE, Mr. Deepak Sugadan and Mrs. Anusri Deepak, residing at D-306, Vedant Vayun, Begur-Koppa Road, Bommanahalli, Bengaluru, Karnataka - 560068, parents of our minor son, hereby declare that the name of our son appearing as \"VIDYUT\" in Passport and as \"VIDYUT DEEPAK\" in Aadhaar and changing his name in the passport records from \"VIDYUT\" to \"VIDYUT DEEPAK\" for all future purposes", 15),
    ("ROL4", "WE Are Hiring Distributor Market Growth Representatives for a leading Beverage Company for Mumbai | Thane | Vashi | Raigad | Palghar locations Interested candidates with experience of 1-5 Years in field sales can walk in for interview. Candidates with 2 Wheeler Preferred Salary: 15,000 Incentives up to 18,000 Interview scheduled on 16th & 17th June Time: 10:00 AM to 3:00 PM Venue: Kanakia Wall Street, A Wing 814, Chakala, Above KFC/Starbucks, Andheri (E), Mumbai", 18),
    ("ROL5", "MATH & Physics one to one Tuitions JEE (Main & Adv), NEET, MHCET, 11 th, 12 th. 99.50 Percentile in JEE 2026 Kapil Sir (B.tech) 7276767718", 5)
]
import math
for name, text, actual in texts:
    wos = len(text.replace(" ", ""))
    lines = math.ceil(wos / 24)
    print(f"{name}: chars_wos={wos}, /24={wos/24:.2f}, formula={lines}, actual={actual}")
