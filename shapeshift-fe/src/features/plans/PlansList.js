import React, {useState, useEffect } from "react";
import { API_URL } from "../../constants/Constants";
import { Link } from "react-router-dom";

function PlansList() {
  const [plans, setPlans] = useState()

  useEffect(() => {
      async function loadPlans(){
        try{
          const response = await fetch(`${API_URL}/users/1/plans`);
          if (response.ok) {
            const json = await response.json();
            setPlans(json);
            console.log(json)
          } else {
            throw response
          }
        } catch (e) {
          console.log("An error occured")
        }
      }
      loadPlans()
    }, [])

  if (!plans) return(<h1>Loading..</h1>)

  return (
    <div>
      <h2>Plans</h2>
      <Link to='/users/1/plans/new'>New Workout Plan</Link>
      { plans.map((plan) => [
        <div key={plan.id}>
          <h1>{plan.plan_name}</h1>
          <Link to={`/users/1/plans/${plan.id}/`}>Details</Link>
        </div>
      ])}
    </div>
  )
}

export default PlansList;
