import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../constants/Constants";
import { X } from "lucide-react";

export default function ReminderForm(props) {

  const { daily, setShowReminderForm, planId } = props
  const navigate = useNavigate()

  const [title, setTitle] = useState(daily?.workout_name || "");
  const [remindAt, setRemindAt] = useState("");
  const [errors, setErrors] = useState("")
  const [futurePlans, setFuturePlans] = useState("")

  const token = localStorage.getItem('token');

  useEffect(()=> {
    getDailyPlans()
  },[])

 const getDailyPlans = async () =>{
        try{
          const response = await fetch(`${API_URL}/plans/${planId}/daily_plans`,{
            headers: {
              "Authorization": `Bearer ${token}`,
            }
          });
          if (response.ok) {
            const json = await response.json()
            setFuturePlans(json.future)
          } else {
            throw response
          }
        } catch (error) {
          console.error("Fetch error:", error);
        }
      }



  const handleSubmit = async (e) => {
    e.preventDefault();

for (const daily of futurePlans){
    const reminderData = {
      title,
      remind_at: `${daily.workout_date} ${remindAt}:00`,
    }
    try {
      const response = await fetch(`${API_URL}/plans/${daily.plan_id}/daily_plans/${daily.id}/reminders`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reminderData),
      });

      if(response.ok){
        const { id } = await response.json();
        setShowReminderForm(false)
      } else {
        const errorData = await response.json();
        setErrors(errorData.errors)
      }

    }catch (error){
      console.error("Error submitting daily plan:", error);
      setErrors(["Something went wrong. Please try again later."]);
    }
  }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/70">
      <div className="relative bg-neutral-card rounded-2xl shadow-lg p-6 w-full max-w-sm">
        <form onSubmit={handleSubmit}>
          <label for="exercise-name" className="block text-white text-md mb-1 font-sans">Title</label>
          <input
            type="text"
            placeholder="Reminder title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-neutral-hover text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent-green"
          />
          <label for="exercise-name" className="mt-4 block text-white text-md mb-1 font-sans">Time</label>
          <input
            type="time"
            value={remindAt}
            onChange={(e) => setRemindAt(e.target.value)}
            className="w-full bg-neutral-hover text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent-green"
            required
          />
          <button type="submit" className="mt-4 w-full bg-accent-green hover:bg-green-600 text-white font-semibold py-2 rounded-xl shadow">Set Reminder</button>
        </form>
      
        <div className="absolute top-2 right-2 flex flex-row justify-evenly">
          <button onClick={() => setShowReminderForm(false)}>
            <X className="w-4 h-4 text-gray-500 hover:cursor-pointer hover:text-neutral-subtext" />
          </button>
        </div>
      </div>
    </div>
  );
}
