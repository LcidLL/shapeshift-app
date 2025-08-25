import { useState } from "react";

export default function ReminderForm() {
  const [title, setTitle] = useState("");
  const [remindAt, setRemindAt] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3000/api/v1/reminders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        reminder: {
          title,
          remind_at: remindAt,
        },
      }),
    });

    const data = await response.json();
    if (data.success) {
      alert("Reminder set!");
    } else {
      alert("Error: " + data.errors.join(", "));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Reminder title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="datetime-local"
        value={remindAt}
        onChange={(e) => setRemindAt(e.target.value)}
      />
      <button type="submit">Set Reminder</button>
    </form>
  );
}
