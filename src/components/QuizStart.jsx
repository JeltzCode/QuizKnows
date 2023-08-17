import '../styles/quizOptions.css'
import QuizOptions from './QuizOptions'

export default function QuizStart({
  quizState,
  handleQuizStart,
  quizApiOptions,
  setApiOptions
}) {
  return (
    <div className='start-container'>
      <h1 className='title'>QuizKnows</h1>
      <h2 className='instructions'>
        To start quiz, please select a Category, Difficulty, and Number of
        questions
      </h2>
      <form onSubmit={handleQuizStart}>
        <QuizOptions
          quizState={quizState}
          quizApiOptions={quizApiOptions}
          setApiOptions={setApiOptions}
          handleQuizStart={handleQuizStart}
        />
      </form>
    </div>
  )
}
