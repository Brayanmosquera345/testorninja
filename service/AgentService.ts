import type { FeedbackData } from "~/types/Question"

export async function generateTest(topic: string, level: string): Promise<{ result: string }> {
  let prompt = `Generate 10 multiple-choice questions about the following topic: ${topic}.

Return only a valid JSON and nothing else (no text before or after, no explanations, no comments).
The JSON must be an array with 10 objects.
Each object must strictly follow this schema:

[
  {
    "statement": "texto de la pregunta",
    "responses": [
      { "response": "texto de respuesta 1", "isCorrect": false },
      { "response": "texto de respuesta 2", "isCorrect": false },
      { "response": "texto de respuesta 3", "isCorrect": false },
      { "response": "texto de respuesta 4", "isCorrect": true }
    ]
  }
]

**Important instructions:**
- Use exactly the keys 'statement', 'responses', 'response', and 'isCorrect'.
- Include exactly 4 answers per question.
- In each question, exactly one of the answers must have "isCorrect": true and the other three "isCorrect": false.
- Return only the JSON. Do not include any additional text, explanations, or notes.
- If you cannot generate 10 questions, return a message "0".
- **All the text inside the JSON (questions and answers) must be in Spanish.**

Remember: the topic is "${topic}" and the level is "${level}".`

  return await $fetch('/api/generate', {
    method: 'POST',
    body: { prompt }
  })
}

export async function getFeedback(topic: string, feedbackData: FeedbackData[]): Promise<{ result: string }> {

  const prompt = `
You are an expert teacher who provides motivating and concrete feedback.

Test topic: ${topic}

Below is the list of questions, the student's answer, and the correct answer:

${JSON.stringify(feedbackData, null, 2)}

Tasks for you:
1. Analyze the incorrect answers to identify the concepts the student should review.
2. Provide a motivating message in Spanish.
3. The message must be brief (maximum 2 or 3 sentences).
4. Do not repeat the questions or the answers verbatim, just give a recommendation on what to study.
5. Return **only the feedback text**, with no additional explanations, no extra formatting, no JSON.
`

  return await $fetch('/api/generate', {
    method: 'POST',
    body: { prompt }
  })
}
