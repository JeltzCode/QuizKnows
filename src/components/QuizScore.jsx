import '../styles/quizOptions.css'
import QuizOptions from './QuizOptions'

export default function QuizScore({quizState, handleQuizStart, quizApiOptions, setApiOptions, quizScore, resetQuizScore}) {

  const {correct, total} = quizScore

  return(
    <div className='score-container'>
    <div className='show-scores'>
      <h1 className='title'>Total quiz score:</h1>
      <h2 className='score'>{`Correct answers: ${correct} out of ${total} answered (${total > 0 ? Math.round((correct / total)*100) : 0}%)`}</h2>
      <h2 className='instructions'>If you would like to take another QuizKnow to add to your score, please select a Category, Difficulty, and Number of questions</h2>
      <form
        onSubmit={handleQuizStart}
      >
        <QuizOptions
          quizState={quizState}
          quizApiOptions={quizApiOptions}
          setApiOptions={setApiOptions}
          handleQuizStart={handleQuizStart}
          resetQuizScore={resetQuizScore}
        />
      </form>    
    </div>
    </div>
  )
}
