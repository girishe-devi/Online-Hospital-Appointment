const API_URL = "http://localhost:5000/api/appointments";

export async function submitAppointment(payload) {
  let response;
  try {
    response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error("Could not reach the server. Check your connection and try again.");
  }

  if (!response.ok) {
    let message = "The appointment could not be booked. Please try again.";
    try {
      const data = await response.json();
      if (data && data.message) message = data.message;
    } catch {
      /* the server sent no JSON body, so keep the default message */
    }
    throw new Error(message);
  }

  try {
    return await response.json();
  } catch {
    return null;
  }
}