const TaskForm = ({ addTask, handleTaskChange, newTask }) => (
	<form onSubmit={addTask}>
		<div className="title">
			Task name:
			<input
				type="text"
				value={newTask.name}
				name="name"
				onChange={handleTaskChange}
				placeholder="title"
				data-testid="title"
			/>
		</div>
		<div>
			Task level:
			<input
				type="text"
				value={newTask.level}
				name="level"
				onChange={handleTaskChange}
				placeholder="level"
				data-testid="level"
			/>
		</div>
		<div>
			Description:
			<input
				type="text"
				value={newTask.description}
				name="description"
				onChange={handleTaskChange}
				placeholder="description"
				data-testid="description"
			/>
		</div>
		<button type="submit">create</button>
	</form>
)
export default TaskForm