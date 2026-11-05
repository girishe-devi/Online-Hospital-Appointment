import React from "react";
import SpecialtySection from "../Specialty";
import { DEPARTMENTS } from "./data";

const { title, description, accent, doctors } = DEPARTMENTS.neurology;

export default function Neurology({ onBook }) {
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