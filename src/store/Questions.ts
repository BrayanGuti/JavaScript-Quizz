import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { type Question } from '../types';
import confetti from 'canvas-confetti'

interface State {
    questions: Question[];
    currentQuestion: number;
    fetchQuestions: (limit: number) => Promise<void>;  
    selectAnswer: (questionId: number, answerIndex: number) => void
    goToNextQuestion: () => void
    goToPreviousQuestion: () => void
    reset: () => void
}

export const useQuestionsStore = create<State>()(persist((set, get) => {
    // set stament is used to update the store state and get is used to access the store state.
    
    return {
        questions: [],
        currentQuestion: 0,

        fetchQuestions: async (limit: number) => {
            const res = await fetch('http://localhost:5173/public/data.json');
            const json = await res.json()

            const questions = json.sort(() => Math.random() - 0.5).slice(0, limit)
            set({ questions })
        },

        selectAnswer: (questionId: number, answerIndex: number) => {
            const { questions } = get()

            // Clone the old questions state
            const newQuestions = structuredClone(questions)
            const questionIndex = newQuestions.findIndex(q => q.id === questionId)
            const questionInfo = newQuestions[questionIndex]
            const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex

            if(isCorrectUserAnswer) confetti()

            // Change the information in the NewQuetions copy
            newQuestions[questionIndex] = {
                ...questionInfo,
                isCorrectUserAnswer,
                userSelectedAnswer: answerIndex
            }

            // Update state
            set({ questions: newQuestions}) 
        },

        goToNextQuestion: () =>  {
            const { currentQuestion, questions } = get()
            const nextQuestion = currentQuestion + 1 

            if(nextQuestion < questions.length){
                set({ currentQuestion: nextQuestion })
            }
        },

        goToPreviousQuestion: () => {
            const { currentQuestion } = get()
            const previousQuestion = currentQuestion - 1
            
            if(previousQuestion >= 0){
                set({ currentQuestion: previousQuestion })
            }
        },
        
        reset: () => {
            set({
                currentQuestion: 0,
                questions: []
            })
        }
    }
}, {
    name: 'questions'
    
}))


