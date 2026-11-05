import { useNavigate } from "react-router-dom";
import style from "./styles/Hom.module.css";
import cardiologyIcon from "./assets/cardiology.png";
import neurologyIcon from "./assets/neurology.png";
import orthopedicsIcon from "./assets/orthopedics.png";
import gynecologyIcon from "./assets/gynecology.png";
import oncologyIcon from "./assets/oncology.png";
import generalMedicineIcon from "./assets/generalMedicine.png";

export default function Hom() {
  const navigate = useNavigate();

  const achievements = [
    { number: "25+", label: "Years of Service" },
    { number: "150+", label: "Expert Doctors" },
    { number: "50,000+", label: "Patients Treated" },
    { number: "15+", label: "Awards Won" },
  ];

  // "key" must match the keys in Doctorspage.jsx exactly.
  const departments = [
    {
      key: "cardiology",
      icon: cardiologyIcon,
      name: "Cardiology",
      description: "Complete heart care including diagnosis, treatment, and long-term management of cardiac conditions.",
    },
    {
      key: "neurology",
      icon: neurologyIcon,
      name: "Neurology",
      description: "Specialized care for disorders of the brain, spine, and nervous system.",
    },
    {
      key: "orthopedics",
      icon: orthopedicsIcon,
      name: "Orthopedics",
      description: "Treatment for bone, joint, and muscle problems, from fractures to joint replacement.",
    },
    {
      key: "gynecology",
      icon: gynecologyIcon,
      name: "Gynecology",
      description: "Women's health care, including pregnancy and delivery, periods, fertility and menopause.",
    },
    {
      key: "oncology",
      icon: oncologyIcon,
      name: "Oncology",
      description: "Advanced cancer diagnosis and treatment with compassionate patient support.",
    },
    {
      key: "generalMedicine",
      icon: generalMedicineIcon,
      name: "General Medicine",
      description: "Primary care for everyday illnesses, health checkups, and preventive care.",
    },
  ];

  return (
    <>
      <section className={style.about}>
        {/* Intro */}
        <div className={style.intro}>
          <h2>About Our Hospital</h2>
          <p>
            For over two decades, our hospital has been committed to delivering
            quality healthcare with compassion and trust. With modern facilities,
            experienced doctors, and a patient-first approach, we make sure every
            person receives the care they deserve. Our online appointment system
            makes healthcare simple, fast, and accessible for everyone.
          </p>
        </div>

        {/* Achievements */}
        <div className={style.achievements}>
          {achievements.map((item) => (
            <div className={style.achievementCard} key={item.label}>
              <h3>{item.number}</h3>
              <p>{item.label}</p>
            </div>
          ))}
        </div>

        {/* Departments */}
        <div className={style.departments}>
          <h2>Our Departments</h2>

          <div className={style.departmentGrid}>
            {departments.map((dept) => (
              <div className={style.departmentCard} key={dept.key}>
                <img
                  src={dept.icon}
                  alt=""
                  width="64"
                  height="64"
                  className={style.iconImg}
                />
                <h3>{dept.name}</h3>
                <p>{dept.description}</p>
                <button
                  type="button"
                  className={style.viewButton}
                  aria-label={`View ${dept.name} doctors`}
                  onClick={() => navigate(`/doctors?department=${dept.key}`)}
                >
                  View doctors
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}