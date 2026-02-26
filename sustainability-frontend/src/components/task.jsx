const TaskForm = ({ addTask, handleTaskChange, newTask }) => (
	<form onSubmit={addTask}>
		<div className="title">
			Task title:
			<input
				type="text"
				value={newTask.title}
				name="title"
				onChange={handleTaskChange}
				placeholder="title"
				data-testid="title"
			/>
		</div>
		<div>
			Task author:
			<input
				type="text"
				value={newTask.author}
				name="author"
				onChange={handleTaskChange}
				placeholder="author"
				data-testid="author"
			/>
		</div>
		<div>
			url:
			<input
				type="text"
				value={newTask.url}
				name="url"
				onChange={handleTaskChange}
				placeholder="url"
				data-testid="url"
			/>
		</div>
		<button type="submit">create</button>
	</form>
)
export default BlogForm