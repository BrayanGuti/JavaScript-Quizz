import { Container, Stack, Typography } from '@mui/material'
import { JavaScriptLogo } from './Components/Icons/JavaScriptLogo'
import { Start } from './Components/Start'
import { Game } from './Components/Game'
import { useQuestionsStore } from './store/Questions'
import './App.css'


function App() {
  const questions = useQuestionsStore(state => state.questions)
  console.log(questions)

  return (
    <main>
      <Container maxWidth='sm'>
        <Stack direction='row' gap={2} alignItems='center' justifyContent='center'>
          <JavaScriptLogo />
          <Typography variant='h2' component='h1'>
              JavaScript Quizz
          </Typography>
        </Stack>
        
        {questions.length == 0 
          ? <Start /> : <Game/>}
      </Container>
    </main>
  )
}

export default App
