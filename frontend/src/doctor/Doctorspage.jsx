import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Cardiology from "./cards/cardiology.jsx";
import Neurology from "./cards/neurology";
import Orthopedics from "./cards/orthopedics";
import Oncology from "./cards/oncology";
import GeneralMedicine from "./cards/generalmedicine";
import Gynecology from "./cards/gynecology";
import Appointment from "../Appointment";
import styles from "./doctor_styles/Doctorspage.module.css";

// The keys must match the keys in data.js and in the Hom.jsx departments list.
const SPECIALTIES = [
  { key: "generalMedicine", label: "General Medicine", Component: GeneralMedicine },
  { key: "cardiology", label: "Cardiology", Component: Cardiology },
  { key: "neurology", label: "Neurology", Component: Neurology },
  { key: "orthopedics", label: "Orthopedics", Component: Orthopedics },
  { key: "oncology", label: "Oncology", Component: Oncology },
  { key: "gynecology", label: "Gynecology", Component: Gynecology },
];

export default function DoctorsPage() {
  // Reads the department from the address, for example /doctors?department=cardiology
  const [searchParams] = useSearchParams();
  const requested = searchParams.get("department");
  const requestedIsValid = SPECIALTIES.some((s) => s.key === requested);

  const [active, setActive] = useState(requestedIsValid ? requested : "generalMedicine");
  // A new object on every click, so booking the same doctor twice still scrolls to the form.
  const [bookingRequest, setBookingRequest] = useState(null);
  const { Component } = SPECIALTIES.find((s) => s.key === active);

  // Start at the top of the page when arriving from the home page.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // If the address changes while this page is open (for example the browser Back button), follow it.
  useEffect(() => {
    if (requestedIsValid) {
      setActive(requested);
      setBookingRequest(null);
    }
  }, [requested, requestedIsValid]);

  function handleTabClick(key) {
    if (key === active) return;
    setActive(key);
    setBookingRequest(null);
  }

  function handleBook(doctor) {
    setBookingRequest({ doctor });
  }

  return (
    <main className={styles.page}>
      <h1 className={styles.heading}></h1>

      <nav className={styles.tabs} aria-label="Specialties">
        {SPECIALTIES.map((s) => (
          <button
            key={s.key}
            type="button"
            aria-pressed={active === s.key}
            className={`${styles.tab} ${active === s.key ? styles.tabActive : ""}`}
            onClick={() => handleTabClick(s.key)}
          >
            {s.label}
          </button>
        ))}
      </nav>

      <Component onBook={handleBook} />

      <Appointment activeDepartment={active} bookingRequest={bookingRequest} />
    </main>
  );
}