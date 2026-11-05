import React from "react";
import styles from "./doctor_styles/Doctorcard.module.css";

export default function DoctorCard({ doctor, accent = "#0F6E78", onBook }) {
  const initials = doctor.name
    .replace(/^Dr\.?\s*/i, "")
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

  return (
    <article className={styles.card} style={{ "--accent": accent }}>
      <div className={styles.header}>
        <div className={styles.avatar} aria-hidden="true">
          {initials}
        </div>
        <div>
          <h3 className={styles.name}>{doctor.name}</h3>
          <p className={styles.qualification}>{doctor.qualification}</p>
        </div>
      </div>

      <dl className={styles.details}>
        <div>
          <dt>Experience</dt>
          <dd>{doctor.experience} years</dd>
        </div>
        <div>
          <dt>Consultation fee</dt>
          <dd>₹{doctor.fee}</dd>
        </div>
        <div>
          <dt>Available</dt>
          <dd>{doctor.availability}</dd>
        </div>
        <div>
          <dt>Languages</dt>
          <dd>{doctor.languages.join(", ")}</dd>
        </div>
      </dl>

      <button
        type="button"
        className={styles.bookButton}
        onClick={() => onBook?.(doctor)}
      >
        Book appointment
      </button>
    </article>
  );
}