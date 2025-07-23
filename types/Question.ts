export interface Question {
  statement: string
  responses: Response[]
}

export interface Response {
  response: string
  isCorrect: boolean
}

export interface FeedbackData {
  statement: string
  userAnswer: string
  correctAnswer: string
}