import React, { useEffect, useState } from "react";
import { API_URL } from "../../constants/Constants";

function RemindersList(props) {

  const { daily } = props
  const [reminders, setReminders] = useState("")

  useEffect(()=> {
    async function getRemindersList(){
      try{
        const response = await fetch(`${API_URL}/users/1/plans/${daily.plan_id}/daily_plans/${daily.id}/reminders`)
        if (response.ok) {
          const json = await response.json();
          console.log(json)
          setReminders(json)
        } else {
          throw response
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    }
    getRemindersList()
  }, [daily])

  if (!reminders) return(<h1>None</h1>)

  return(
    <div>
      {reminders.map((reminder)=>[
        <div key={reminder.id}>
          {reminder.remind_at}
        </div>

      ])}
    </div>
  )
}

export default RemindersList;
