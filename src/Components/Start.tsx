import { Button } from "@mui/material";
import { useQuestionsStore } from "../store/Questions";


const AMOUNT_OF_QUESTIONS = 5
export function Start () {
    const fetchQuestions = useQuestionsStore(state => state.fetchQuestions)

    const handleClick = () => {
        fetchQuestions(AMOUNT_OF_QUESTIONS)
    }

    return (
        <Button onClick={handleClick} variant='contained'>
            Start
        </Button>
    )
}