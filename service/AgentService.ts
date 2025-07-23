import type { FeedbackData } from "~/types/Question"

export async function generateTest(topic: string, level: string): Promise<{ result: string }> {
  let prompt = `Genera 10 preguntas de opción múltiple sobre el siguiente tema: ${topic}.

Devuelve únicamente un JSON válido y nada más (sin texto antes ni después, sin explicaciones, sin comentarios). 
El JSON debe ser un array con 10 objetos. 
Cada objeto debe seguir estrictamente el siguiente esquema:

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

**Instrucciones importantes:**
- Usa exactamente las claves 'statement', responses, response e isCorrect.
- Incluye exactamente 4 respuestas por pregunta.
- En cada pregunta, exactamente una de las respuestas debe tener "isCorrect": true y las otras tres "isCorrect": false.
- Devuelve solamente el JSON. No incluyas texto adicional, ni explicaciones, ni notas.
- En caso de que no puedas generar 10 preguntas, devuelve un mensaje un "0".

Recuerda: el tema es "${topic}". y el nivel es "${level}".`
  return await $fetch('/api/generate', {
    method: 'POST',
    body: { prompt }
  })
}

export async function getFeedback(topic: string, feedbackData: FeedbackData[]): Promise<{ result: string }> {

  const prompt = `
Eres un profesor experto que da retroalimentación motivadora y concreta.

Tema de la prueba: ${topic}

A continuación tienes la lista de preguntas, la respuesta del estudiante y la respuesta correcta:

${JSON.stringify(feedbackData, null, 2)}

Tareas para ti:
1. Analiza las respuestas incorrectas para identificar los conceptos que debe repasar.
2. Da un mensaje motivador en español.
3. El mensaje debe ser breve (máximo 2 o 3 frases).
4. No repitas las preguntas ni las respuestas textualmente, solo da una recomendación de estudio.
5. Devuelve **únicamente el texto de retroalimentación**, sin explicaciones adicionales, sin formato extra, sin JSON.
`

  return await $fetch('/api/generate', {
    method: 'POST',
    body: { prompt }
  })
}

