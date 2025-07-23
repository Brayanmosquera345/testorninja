import { defineStore } from 'pinia'
import type { Question } from '~/types/Question'

export const useQuestionStore = defineStore('myQuestionStore', {
  state: () => ({
    topic: '',
    level: '',
    questions: [] as Question[],
    userAnswers: [] as (number | null)[],
    feedback: ''
  }),
  actions: {
    setQuestions(qs: Question[]) {
      this.questions = qs
      this.userAnswers = Array(qs.length).fill(null)
    },
    setUserAnswer(questionIndex: number, responseIndex: number) {
      this.userAnswers[questionIndex] = responseIndex
    }
  },
  persist: true
})
