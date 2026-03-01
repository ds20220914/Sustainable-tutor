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
			<label style={{ width: '150px' }}>Preferred exercise type:</label>
			<select
    			value={newTasks.preferred}
    			name="preferred"
    			onChange={handleTaskChange}
    			data-testid="preferred"
  			>
    			<option value="">-- Select type --</option>
				<option value="multiple_choice">Multiple-choice questions</option>
				<option value="short_answer">Short-answer questions</option>
				<option value="summarization">Summarization tasks</option>
				<option value="practice_test">Practice tests</option>
  			</select>
		</div>

		<div style={{ display: 'flex', alignItems: 'center' }}>
			<label style={{ width: '150px' }}>Number of exercises:</label>
			<input
				type="number"
				min="1"
				max="50"
				value={newTasks.count}
				name="count"
				onChange={handleTaskChange}
				placeholder="e.g., 5"
				data-testid="count"
			/>
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
		<button type="submit" style={{ width: '140px', alignSelf: 'flex-start', marginTop: '8px' }}>Generate</button>
	</form>
)
export default TaskForm
