// "13:00" -> "1 pm", "07:30" -> "7:30 am"
function shortTime(hhmm) {
  const [h, m] = hhmm.split(":").map(Number);
  const suffix = h >= 12 ? "pm" : "am";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}${m ? `:${String(m).padStart(2, "0")}` : ""} ${suffix}`;
}

// ["13:00", "16:00"] -> "1 pm – 4 pm"
const windowLabel = ([start, end]) => `${shortTime(start)} – ${shortTime(end)}`;

const makeDepartment = (key, title, description, accent, doctors) => ({
  key,
  title,
  description,
  accent,
  doctors: doctors.map((d) => {
    const slots = d.windows.map(windowLabel); // the options shown in the booking form
    return {
      ...d,
      department: key,
      slots,
      availability: `${d.days}, ${slots.join(" & ")}`,
    };
  }),
});

export const DEPARTMENTS = {
  general: makeDepartment(
    "general",
    "General Medicine",
    "First point of contact for fever, infections, diabetes, blood pressure and everyday health concerns.",
    "#2E7D5B",
    [
      { id: "g1", name: "Dr. Ramesh Babu", qualification: "MD (General Medicine)", experience: 14, fee: 400, days: "Mon–Sat", windows: [["07:00", "10:00"]], languages: ["English", "Tamil"] },
      { id: "g2", name: "Dr. Fathima Beevi", qualification: "MBBS, DNB (General Medicine)", experience: 9, fee: 400, days: "Mon–Sat", windows: [["08:00", "11:00"], ["13:00", "16:00"], ["19:00", "22:00"]], languages: ["English", "Tamil", "Malayalam"] },
      { id: "g3", name: "Dr. Thomas George", qualification: "MD (General Medicine)", experience: 20, fee: 500, days: "Mon–Fri", windows: [["13:00", "16:00"], ["19:00", "22:00"]], languages: ["English", "Malayalam", "Hindi"] },
    ]
  ),
  cardiology: makeDepartment(
    "cardiology",
    "Cardiology",
    "Care for the heart and blood vessels, from chest pain and blood pressure to rhythm problems and heart surgery.",
    "#B3261E",
    [
      { id: "c1", name: "Dr. Arvind Menon", qualification: "MD, DM (Cardiology)", experience: 18, fee: 800, days: "Mon–Fri", windows: [["09:00", "12:00"], ["17:00", "20:00"]], languages: ["English", "Tamil", "Malayalam"] },
      { id: "c2", name: "Dr. Priya Raghavan", qualification: "MD, DNB (Cardiology)", experience: 12, fee: 700, days: "Tue–Sat", windows: [["07:00", "09:00"], ["12:00", "15:00"], ["19:00", "22:00"]], languages: ["English", "Tamil"] },
      { id: "c3", name: "Dr. Suresh Kumar", qualification: "MS, MCh (Cardiothoracic Surgery)", experience: 22, fee: 1000, days: "Mon, Wed, Fri", windows: [["10:00", "14:00"]], languages: ["English", "Tamil", "Hindi"] },
    ]
  ),
  neurology: makeDepartment(
    "neurology",
    "Neurology",
    "Care for the brain, spine and nerves, including headaches, seizures, stroke recovery and movement disorders.",
    "#5B3FA6",
    [
      { id: "n1", name: "Dr. Meera Nair", qualification: "MD, DM (Neurology)", experience: 15, fee: 800, days: "Mon–Fri", windows: [["13:00", "16:00"], ["19:00", "22:00"]], languages: ["English", "Malayalam", "Tamil"] },
      { id: "n2", name: "Dr. Karthik Subramanian", qualification: "MD, DNB (Neurology)", experience: 10, fee: 700, days: "Mon–Sat", windows: [["08:00", "12:00"]], languages: ["English", "Tamil"] },
      { id: "n3", name: "Dr. Anita Joseph", qualification: "MS, MCh (Neurosurgery)", experience: 20, fee: 1000, days: "Tue, Thu", windows: [["13:00", "16:00"], ["19:00", "22:00"]], languages: ["English", "Hindi", "Tamil"] },
    ]
  ),
  orthopedics: makeDepartment(
    "orthopedics",
    "Orthopedics",
    "Care for bones, joints, muscles and ligaments, including fractures, arthritis, sports injuries and joint replacement.",
    "#1D6FA5",
    [
      { id: "o1", name: "Dr. Rajesh Pillai", qualification: "MS (Orthopaedics)", experience: 16, fee: 600, days: "Mon–Sat", windows: [["07:00", "09:00"], ["11:00", "14:00"], ["18:00", "21:00"]], languages: ["English", "Tamil", "Malayalam"] },
      { id: "o2", name: "Dr. Lakshmi Devi", qualification: "MS, DNB (Orthopaedics)", experience: 11, fee: 600, days: "Mon–Fri", windows: [["15:00", "19:00"]], languages: ["English", "Tamil"] },
      { id: "o3", name: "Dr. Vikram Shetty", qualification: "MS, MCh (Joint Replacement)", experience: 19, fee: 900, days: "Wed, Fri, Sat", windows: [["09:00", "12:00"], ["20:00", "22:00"]], languages: ["English", "Hindi", "Kannada"] },
    ]
  ),
  oncology: makeDepartment(
    "oncology",
    "Oncology",
    "Diagnosis and treatment of cancer through chemotherapy, radiation and surgery, with follow-up care.",
    "#A14A76",
    [
      { id: "on1", name: "Dr. Sunil Varghese", qualification: "MD, DM (Medical Oncology)", experience: 17, fee: 900, days: "Mon–Fri", windows: [["08:00", "11:00"], ["16:00", "19:00"]], languages: ["English", "Malayalam", "Tamil"] },
      { id: "on2", name: "Dr. Deepa Krishnan", qualification: "MD, DNB (Radiation Oncology)", experience: 13, fee: 900, days: "Tue–Sat", windows: [["07:30", "10:00"], ["12:00", "15:00"], ["19:00", "22:00"]], languages: ["English", "Tamil"] },
      { id: "on3", name: "Dr. Mohan Iyer", qualification: "MS, MCh (Surgical Oncology)", experience: 21, fee: 1100, days: "Mon, Wed, Thu", windows: [["14:00", "18:00"]], languages: ["English", "Tamil", "Hindi"] },
    ]
  ),
  gynecology: makeDepartment(
    "gynecology",
    "Gynecology",
    "Women's health care, including pregnancy and delivery, periods, fertility and menopause.",
    "#C2570C",
    [
      { id: "gy1", name: "Dr. Revathi Chandran", qualification: "MD, DGO (Obstetrics & Gynaecology)", experience: 19, fee: 700, days: "Mon–Sat", windows: [["10:00", "13:00"]], languages: ["English", "Tamil", "Malayalam"] },
      { id: "gy2", name: "Dr. Shalini Mathew", qualification: "MS (Obstetrics & Gynaecology)", experience: 12, fee: 700, days: "Mon–Fri", windows: [["07:00", "10:00"], ["17:00", "20:00"]], languages: ["English", "Malayalam"] },
      { id: "gy3", name: "Dr. Nisha Ahmed", qualification: "MD, DNB, Fellowship in Reproductive Medicine", experience: 15, fee: 900, days: "Tue, Thu, Sat", windows: [["07:00", "10:00"], ["17:00", "20:00"]], languages: ["English", "Tamil", "Hindi"] },
    ]
  ),
};

export const DEPARTMENT_LIST = Object.values(DEPARTMENTS);