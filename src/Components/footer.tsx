import { Button } from "@mui/material"
import { useQuestionsStore } from "../store/Questions"

const useQuestionData = () => {
    const questions = useQuestionsStore(state => state.questions)
    
    let correct = 0
    let incorrect = 0
    let unanswered = 0

    questions.forEach(question => {
        const { userSelectedAnswer, correctAnswer } = question
        if(userSelectedAnswer == null) unanswered++
        else if(userSelectedAnswer === correctAnswer) correct++
        else incorrect++
    })

    return { correct, incorrect, unanswered}
}

export const Footer = () => {
    const { correct, incorrect, unanswered } = useQuestionData() 
    const reset = useQuestionsStore(state => state.reset)
    return (
        <footer style={{ margin: '16px'}}>
            <strong>{`✅ ${correct} corrects -  ❌ ${incorrect} incorrect - ❓ ${unanswered} unanswered`}</strong>
        <div style={{marginTop: '16px'}}>
            <Button onClick={() => reset()}>
                Reset test
            </Button>
        </div>
        </footer>
    )
}