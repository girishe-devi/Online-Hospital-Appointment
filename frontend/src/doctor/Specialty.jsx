import React from "react";
import DoctorCard from "./Doctorcard"; // file must be named exactly Doctorcard.jsx
import styles from "./doctor_styles/Specialty.module.css";

export default function SpecialtySection({
  title,
  description,
  accent,
  doctors = [],
  onBook,
}) {
  const headingId = `${title.toLowerCase().replace(/\s+/g, "-")}-heading`;

  return (
    <section
      className={styles.section}
      style={{ "--accent": accent }}
      aria-labelledby={headingId}
    >
      <header className={styles.header}>
        <h2 id={headingId} className={styles.title}>
          {title}
        </h2>
        <p className={styles.description}>{description}</p>
      </header>

      {doctors.length === 0 ? (
        <p className={styles.empty}>
          No doctors are listed for {title} right now. Check back soon.
        </p>
      ) : (
        <div className={styles.grid}>
          {doctors.map((d) => (
            <DoctorCard key={d.id} doctor={d} accent={accent} onBook={onBook} />
          ))}
        </div>
      )}
    </section>
  );
}