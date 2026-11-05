import React from "react";
import SpecialtySection from "../Specialty";
import { DEPARTMENTS } from "./data";

const { title, description, accent, doctors } = DEPARTMENTS.general;

export default function GeneralMedicine({ onBook }) {
  return (
    <SpecialtySection
      title={title}
      description={description}
      accent={accent}
      doctors={doctors}
      onBook={onBook}
    />
  );
}