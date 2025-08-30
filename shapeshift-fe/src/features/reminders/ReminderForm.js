import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../constants/Constants";

export default function ReminderForm(props) {

  const { daily, setShowReminderForm } = props
  const navigate = useNavigate()

  const [title, setTitle] = useState(daily?.workout_name || "");
  const [remindAt, setRemindAt] = useState("");
  const [errors, setErrors] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reminderData = {
      title,
      remind_at: `${daily.workout_date} ${remindAt}:00`,
    }

    try {
      const response = await fetch(`${API_URL}/users/1/plans/${daily.plan_id}/daily_plans/${daily.id}/reminders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reminderData),
      });

      if(response.ok){
        const { id } = await response.json();
        alert("Reminder set!");
        setShowReminderForm(false)
        navigate(`/users/1/plans/${daily.plan_id}`);
      } else {
        const errorData = await response.json();
        setErrors(errorData.errors)
      }

    }catch (error){
      console.error("Error submitting daily plan:", error);
      setErrors(["Something went wrong. Please try again later."]);
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
        type="time"
        value={remindAt}
        onChange={(e) => setRemindAt(e.target.value)}
        required
      />
      <button type="submit">Set Reminder</button>
    </form>
  );
}
