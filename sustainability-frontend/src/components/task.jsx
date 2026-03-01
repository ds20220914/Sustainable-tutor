const TaskForm = ({ addTask, handleTaskChange, newTasks }) => (
	<form onSubmit={addTask} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
		<div className="title" style={{ display: 'flex', alignItems: 'center' }}>
			<label style={{ width: '150px' }}>Topic name:</label>
			<input
				type="text"
				value={newTasks.topic}
				name="topic"
				onChange={handleTaskChange}
				placeholder="topic"
				data-testid="topic"
			/>
		</div>
		<div style={{ display: 'flex', alignItems: 'center' }}>
			<label style={{ width: '150px' }}>Current taxonomy level:</label>

			<select
    			value={newTasks.currentlevel}
    			name="currentlevel"
    			onChange={handleTaskChange}
    			data-testid="currentlevel"
  			>
    			<option value="">-- Select level --</option>
				<option value="Remembering">Remembering</option>
				<option value="Understanding">Understanding</option>
				<option value="Applying">Applying</option>
				<option value="Analyzing">Analyzing</option>
				<option value="Evaluating">Evaluating</option>
				<option value="Creating">Creating</option>
  			</select>
		</div>
		<div style={{ display: 'flex', alignItems: 'center' }}>
			<label style={{ width: '150px' }}>Target taxonomy level:</label>
			<select
    			value={newTasks.targetlevel}
    			name="targetlevel"
    			onChange={handleTaskChange}
    			data-testid="targetlevel"
  			>
    			<option value="">-- Select level --</option>
				<option value="Remembering">Remembering</option>
				<option value="Understanding">Understanding</option>
				<option value="Applying">Applying</option>
				<option value="Analyzing">Analyzing</option>
				<option value="Evaluating">Evaluating</option>
				<option value="Creating">Creating</option>
  			</select>
		</div>
		<div style={{ display: 'flex', alignItems: 'center' }}>
			<label style={{ width: '150px' }}>Description:</label>
			<input
				type="text"
				value={newTasks.description}
				name="description"
				onChange={handleTaskChange}
				placeholder="description"
				data-testid="description"
			/>
		</div>
		<button type="submit" style={{ width: '100px', alignSelf: 'flex-start', marginTop: '8px' }}>create</button>
	</form>
)
export default TaskForm