import React, { useEffect, useId, useRef, useState } from "react";
import { DEPARTMENTS, DEPARTMENT_LIST } from "./doctor/cards/data.js";
import { submitAppointment } from "./appointmentapi.js";
import styles from "./styles/Appointment.module.css";

const EMPTY = { name: "", phone: "", email: "", age: "", gender: "", date: "", timeSlot: "", reason: "" };

function todayISO() {
  const now = new Date();
  return new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
}

function formatDate(iso) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-IN", {
    day: "numeric", month: "long", year: "numeric",
  });
}

// Returns an object of error messages. Keys are in page order.
function validate(v, department, doctorId) {
  const errors = {};
  const age = Number(v.age);

  if (!department) errors.department = "Choose a department.";
  if (!doctorId) errors.doctor = "Choose a doctor.";
  if (v.name.trim().length < 2) errors.name = "Enter the patient's full name.";
  if (!/^\d{10}$/.test(v.phone.replace(/[\s-]/g, ""))) errors.phone = "Enter a 10-digit mobile number.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) errors.email = "Enter a valid email address.";
  if (v.age === "" || age < 0 || age > 120 || !Number.isInteger(age)) errors.age = "Enter an age between 0 and 120.";
  if (!v.gender) errors.gender = "Choose a gender.";
  if (!v.date) errors.date = "Choose a date.";
  else if (v.date < todayISO()) errors.date = "Choose today or a later date.";
  if (!v.timeSlot) errors.timeSlot = "Choose a time slot.";

  return errors;
}

// Label + input + error message.
function Field({ id, label, error, full, children }) {
  return (
    <div className={`${styles.field} ${full ? styles.fieldFull : ""}`}>
      <label htmlFor={id} className={styles.label}>{label}</label>
      {children}
      {error && <p className={styles.error} role="alert">{error}</p>}
    </div>
  );
}

export default function Appointment({ bookingRequest }) {
  const uid = useId();
  const sectionRef = useRef(null);
  const headingRef = useRef(null);

  const [department, setDepartment] = useState(""); // empty = "Select a department"
  const [doctorId, setDoctorId] = useState("");
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [confirmation, setConfirmation] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  const doctors = DEPARTMENTS[department]?.doctors ?? [];
  const doctor = doctors.find((d) => d.id === doctorId);
  const accent = DEPARTMENTS[department]?.accent ?? "#0F6E78";

  // The doctor's availability windows, for example ["1 pm – 4 pm", "7 pm – 10 pm"].
  const timeSlots = doctor?.slots ?? [];

  // A new doctor has different hours, so clear the previously chosen time.
  useEffect(() => {
    setValues((prev) => ({ ...prev, timeSlot: "" }));
  }, [doctorId]);

  const id = (key) => `${uid}-${key}`;
  const inputClass = (key) => `${styles.control} ${errors[key] ? styles.controlError : ""}`;

  // "Book appointment" on a doctor card: select that doctor and scroll to the form.
  useEffect(() => {
    if (!bookingRequest) return;
    setDepartment(bookingRequest.doctor.department);
    setDoctorId(bookingRequest.doctor.id);
    setConfirmation(null);
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    headingRef.current?.focus({ preventScroll: true });
  }, [bookingRequest]);

  function clearError(...keys) {
    setErrors((prev) => {
      const next = { ...prev };
      keys.forEach((k) => delete next[k]);
      return next;
    });
  }

  // onChange handler for any field stored in `values`.
  const change = (key) => (e) => {
    setValues((prev) => ({ ...prev, [key]: e.target.value }));
    clearError(key);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (submitting) return;

    const found = validate(values, department, doctorId);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      document.getElementById(id(first))?.focus();
      return;
    }

    const payload = {
      doctorId: doctor.id,
      doctorName: doctor.name,
      department: DEPARTMENTS[department].title,
      patient: {
        name: values.name.trim(),
        phone: values.phone.replace(/[\s-]/g, ""),
        email: values.email.trim(),
        age: Number(values.age),
        gender: values.gender,
      },
      date: values.date,
      timeSlot: values.timeSlot,
      reason: values.reason.trim(),
    };

    setSubmitting(true);
    setServerError("");
    try {
      await submitAppointment(payload);
      setConfirmation({
        doctorName: payload.doctorName,
        department: payload.department,
        patientName: payload.patient.name,
        date: payload.date,
        timeSlot: payload.timeSlot,
      });
      setValues(EMPTY);
    } catch (err) {
      setServerError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div ref={sectionRef} className={styles.section} style={{ "--accent": accent }}>
      <h2 ref={headingRef} tabIndex={-1} className={styles.heading}>
        Book an appointment
      </h2>

      {confirmation ? (
        <div role="status" className={styles.success}>
          <h3 className={styles.successTitle}>Appointment confirmed</h3>
          <p className={styles.successText}>
            {confirmation.patientName}, you have an appointment with {confirmation.doctorName} (
            {confirmation.department}) on {formatDate(confirmation.date)}, during {confirmation.timeSlot}.
          </p>
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={() => { setConfirmation(null); setDepartment(""); setDoctorId(""); }}
          >
            Book another appointment
          </button>
        </div>
      ) : (
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <p className={styles.intro}>
            Choose a doctor from the list above, or pick a department and doctor here.
          </p>

          {/* Doctor */}
          <div className={styles.fieldset}>
            <div className={styles.legend}>Doctor</div>
            <div className={styles.grid}>
              <Field id={id("department")} label="Department" error={errors.department}>
                <select
                  id={id("department")}
                  className={inputClass("department")}
                  value={department}
                  onChange={(e) => { setDepartment(e.target.value); setDoctorId(""); clearError("department", "doctor"); }}
                >
                  <option value="">Select a department</option>
                  {DEPARTMENT_LIST.map((d) => (
                    <option key={d.key} value={d.key}>{d.title}</option>
                  ))}
                </select>
              </Field>

              <Field id={id("doctor")} label="Doctor" error={errors.doctor}>
                <select
                  id={id("doctor")}
                  className={inputClass("doctor")}
                  value={doctorId}
                  onChange={(e) => { setDoctorId(e.target.value); clearError("doctor"); }}
                  disabled={!department}
                >
                  <option value="">{department ? "Select a doctor" : "Select a department first"}</option>
                  {doctors.map((d) => (
                    <option key={d.id} value={d.id}>{d.name}</option>
                  ))}
                </select>
              </Field>

              {doctor && (
                <p className={`${styles.doctorInfo} ${styles.fieldFull}`}>
                  {doctor.qualification}. Available {doctor.availability}. Consultation fee ₹{doctor.fee}.
                </p>
              )}
            </div>
          </div>

          {/* Patient */}
          <div className={styles.fieldset}>
            <div className={styles.legend}>Patient details</div>
            <div className={styles.grid}>
              <Field id={id("name")} label="Full name" error={errors.name}>
                <input id={id("name")} className={inputClass("name")} type="text" autoComplete="name"
                  value={values.name} onChange={change("name")} />
              </Field>

              <Field id={id("phone")} label="Mobile number" error={errors.phone}>
                <input id={id("phone")} className={inputClass("phone")} type="tel" inputMode="numeric"
                  autoComplete="tel" placeholder="10 digits" value={values.phone} onChange={change("phone")} />
              </Field>

              <Field id={id("email")} label="Email" error={errors.email}>
                <input id={id("email")} className={inputClass("email")} type="email" autoComplete="email"
                  value={values.email} onChange={change("email")} />
              </Field>

              <Field id={id("age")} label="Age" error={errors.age}>
                <input id={id("age")} className={inputClass("age")} type="number" inputMode="numeric"
                  min="0" max="120" value={values.age} onChange={change("age")} />
              </Field>

              <Field id={id("gender")} label="Gender" error={errors.gender}>
                <select id={id("gender")} className={inputClass("gender")} value={values.gender} onChange={change("gender")}>
                  <option value="">Select gender</option>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Other">Other</option>
                </select>
              </Field>
            </div>
          </div>

          {/* Date and time */}
          <div className={styles.fieldset}>
            <div className={styles.legend}>Date and time</div>
            <div className={styles.grid}>
              <Field id={id("date")} label="Date" error={errors.date}>
                <input id={id("date")} className={inputClass("date")} type="date" min={todayISO()}
                  value={values.date} onChange={change("date")} />
              </Field>

              <Field id={id("timeSlot")} label="Preferred time" error={errors.timeSlot}>
                <select
                  id={id("timeSlot")}
                  className={inputClass("timeSlot")}
                  value={values.timeSlot}
                  onChange={change("timeSlot")}
                  disabled={!doctor}
                >
                  <option value="">{doctor ? "Select a time" : "Select a doctor first"}</option>
                  {timeSlots.map((t, i) => (
                    <option key={t} value={t}> {t}</option>
                  ))}
                </select>
              </Field>

              <Field id={id("reason")} label="Reason for visit (optional)" full>
                <textarea id={id("reason")} className={styles.control} rows={3}
                  value={values.reason} onChange={change("reason")} />
              </Field>
            </div>
          </div>

          <div>
            {serverError && <p role="alert" className={styles.serverError}>{serverError}</p>}
            <button type="submit" className={styles.submit} disabled={submitting}>
              {submitting ? "Booking…" : "Confirm appointment"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}