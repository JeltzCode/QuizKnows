import { useState, useEffect } from 'react'
import QuizContainer from './components/QuizContainer'
import RandomShape from './assets/RandomShape'

export default function App() {
  const [quizState, setQuizState] = useState('')

  return (
      <QuizContainer
        quizState={quizState}
        setQuizState={setQuizState}
      />
  )
}