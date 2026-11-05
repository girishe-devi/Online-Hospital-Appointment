import React from "react";
import SpecialtySection from "../Specialty";
import { DEPARTMENTS } from "./data";

const { title, description, accent, doctors } = DEPARTMENTS.cardiology;

export default function Cardiology({ onBook }) {
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