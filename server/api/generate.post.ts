import Together from "together-ai"

const together = new Together({
  apiKey: process.env.TOGETHER_API_KEY!,
})

export default defineEventHandler(async (event) => {
  const { prompt } = await readBody<{ prompt: string }>(event)

  const response = await together.chat.completions.create({
    model: 'meta-llama/Llama-3.3-70B-Instruct-Turbo-Free',
    messages: [
      { role: 'user', content: prompt }
    ],
  })

  return { result: response.choices[0]?.message?.content ?? '' }
})

