from app.models.schemas import GenerateRequest

# Map Bloom's levels to cognitive verbs (evidence-based framing)
BLOOM_VERBS = {
    "remember":   "recall and identify",
    "understand": "explain and summarize",
    "apply":      "apply and demonstrate",
    "analyze":    "analyze and differentiate",
    "evaluate":   "evaluate and justify",
    "create":     "design and construct",
}

EXERCISE_INSTRUCTIONS = {
    "multiple_choice": "Generate {n} multiple-choice questions with 4 options each (A–D) and indicate the correct answer.",
    "short_answer":    "Generate {n} short-answer questions with model answers (2–3 sentences each).",
    "summarization":   "Generate {n} summarization prompts that ask the learner to restate key concepts in their own words.",
    "practice_test":   "Generate a mini practice test with {n} mixed questions (include question type labels).",
}

def build_prompt(req: GenerateRequest) -> str:
    exercise_type = req.exercise_types[0]  # primary type; extend as needed
    instruction = EXERCISE_INSTRUCTIONS[exercise_type].format(n=req.num_questions)
    current_verbs = BLOOM_VERBS[req.current_level]
    target_verbs  = BLOOM_VERBS[req.target_level]

    return f"""You are an expert educational content designer applying evidence-based learning techniques 
(practice testing, spaced retrieval, self-explanation, and interleaving where appropriate).

Topic: {req.topic}
Learner's current cognitive level (Bloom's Taxonomy): {req.current_level} — they can currently {current_verbs}.
Target cognitive level: {req.target_level} — exercises should push them to {target_verbs}.

Task: {instruction}

Guidelines:
- Calibrate difficulty to bridge the gap from {req.current_level} to {req.target_level}.
- Use clear, unambiguous language.
- Where possible, promote self-explanation by asking learners to justify their answers.
- Format output cleanly using markdown (numbered list for questions, bold for answer labels).
"""