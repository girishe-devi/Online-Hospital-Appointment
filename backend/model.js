import fs from "fs";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";

const DATA_FILE = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "appointments.json"
);

function readAll() {
  if (!fs.existsSync(DATA_FILE)) return [];
  const text = fs.readFileSync(DATA_FILE, "utf8").trim();
  return text ? JSON.parse(text) : [];
}

// Writes to a temporary file first, so a crash can't leave a half-written data file.
function writeAll(list) {
  const temp = `${DATA_FILE}.tmp`;
  fs.writeFileSync(temp, JSON.stringify(list, null, 2));
  fs.renameSync(temp, DATA_FILE);
}

export function getAll() {
  return readAll().sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function create(data) {
  const list = readAll();

  const taken = list.some(
    (a) =>
      a.doctorId === data.doctorId &&
      a.date === data.date &&
      a.timeSlot === data.timeSlot
  );
  if (taken) return { duplicate: true };

  const appointment = {
    id: crypto.randomUUID(),
    ...data,
    createdAt: new Date().toISOString(),
  };

  list.push(appointment);
  writeAll(list);
  return { appointment };
}