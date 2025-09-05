function ConfirmationModal (props) {

  const { open, onClose, onConfirm, workout, exercise, daily} = props

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/70">
      <div className="bg-neutral-card rounded-2xl shadow-lg p-6 w-full max-w-sm">
        {/* Title */}
        <h2 className="text-2xl font-heading text-white mb-2">
          Confirm Deletion
        </h2>
        <div className="text-md text-gray-300 mb-6 font-sans">
          <p>Are you sure you want to delete this {workout || daily ? "workout" : "exercise"}?</p>
          <br />
          { workout && <>
            <p><strong>Workout date:</strong>  {`${workout?.workout_date}`}</p>
            <p><strong>Workout Type:</strong>  {`${workout?.workout_type}`}</p>
            <p><strong>Execises logged:</strong>  {`${workout?.exercises_count}`}</p>
            <br />
            All exercises logged under this workout will also be deleted. This action cannot be undone.
            </>
          }
          { exercise &&
            <p><strong>Exercise name:</strong>  {`${exercise?.exercise_name}`}</p>
          }
          { daily && <>
            <p><strong>Workout Name:</strong>  {`${daily?.workout_name}`}</p>
            <p><strong>Workout Date:</strong>  {`${daily?.workout_date}`}</p>
            <p><strong>Day of Week:</strong>  {`${daily?.day_of_week}`}</p>
            <br />
            All exercises logged under this workout will also be deleted. This action cannot be undone.
            </>
          }
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-neutral-hover text-white hover:bg-neutral-hover/70"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationModal
