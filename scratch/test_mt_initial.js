const TimesOfIndiaLineCalculator = require('../lineCalculator');

const calculator = new TimesOfIndiaLineCalculator();

const samples = [
    {
        id: "MAH1",
        text: "SHAYONA CORPORATION, a Government Contracting Firm, invites applications for: 1) CIVIL ENGINEER (Female) – 4-5 years of experience in estimation, project quantity surveying and billing roles 2) CIVIL ENGINEER (Male) – 4-5 years exp. primarily for site supervision and execution work. Location: Thane | Job Type: Permanent. Email: dhanashree.shayona@gmail.com / 8976221639 / 9324956699",
        boldWords: ["SHAYONA"],
        expected: 14
    },
    {
        id: "MAH2",
        text: "OPENINGS at CA Office – Dadar. CA Firm invites applications for Accounts, GST & Taxation positions. Freshers and experienced candidates welcome. Email Resume: caashokchheda@gmail.com",
        boldWords: ["OPENINGS"],
        expected: 7
    },
    {
        id: "MAH3",
        text: "BUSINESS Dev Exec: To promote imp packaging M/C. Pref: Dip in Marketing with or without exp. Full/Part time. Extensive travel for MUM, Pune,AHD . age < 30 WA: + 91 9820541416",
        boldWords: ["BUSINESS"],
        expected: 7
    },
    {
        id: "MAH4",
        text: "FEMALE Medical Typist / Transcriptionist with speed 40wpm for MRI CT Scan Centre , Contact 8850927330",
        boldWords: ["FEMALE"],
        expected: 5
    },
    {
        id: "MAH5",
        text: "VACANCIES for receptionists, sister,Wordboy in Borivali based Hospital. Computer knowledge is must [Receptionist]. Payment negotiable . Send resume on WhatsApp:- 9820550730. Please do not call",
        boldWords: ["VACANCIES"],
        expected: 8
    }
];

console.log("=== Running Maharashtra Times samples on TOI Engine ===");
samples.forEach(s => {
    const res = calculator.calculatePhysicalLines(s.text, s.boldWords);
    const billed = calculator.calculateBilledLines(s.text);
    console.log(`${s.id}: expected=${s.expected}, gotPhysical=${res}, gotBilled=${billed}`);
});
