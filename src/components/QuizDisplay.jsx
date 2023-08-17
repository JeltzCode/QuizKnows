import '../styles/quizDisplay.css'
import {decode} from 'html-entities'

export default function QuizDisplay({
  quizDisplay,
  showAnswers,
  quizCurrentSet,
  quizLastSet,
  handleSubmit,
  handleClick
}) {
  const displayCurrentSet = `
    Questions ${quizCurrentSet.current + 1}-${quizCurrentSet.current + 5}
    of ${quizCurrentSet.total}
  `
  const answerStyles = {
    correct: {
      backgroundColor: '#68ca96',
      border: '2px solid #8ed7b0'
    },
    incorrect: {
      backgroundColor: '#F8BCBC',
      border: '2px solid #fde8e8',
      color: '#666'
    },
    unanswered: {
      backgroundColor: '#b4e4c3',
      border: '2px solid #c7ebd2'
    }
  }

  const displayAnswers = ({id, allAnswers, correctAnswer, selectedAnswer}) =>
    allAnswers.map((answer, index) => (
      <div
        key={`${id}-${index}`}
        className='answer'
      >
        <input
          key={`${id}-${index}`}
          type='radio'
          id={`${id}-${index}`}
          name={id}
          value={answer}
          onClick={() => handleClick(id, answer)}
        />
        <label
          htmlFor={!showAnswers ? `${id}-${index}` : null}
          className='label'
          style={
            !showAnswers ?
            null :
              !selectedAnswer &&
              answer === correctAnswer ?
              answerStyles.unanswered :
                answer === correctAnswer ?
                answerStyles.correct :
                    answer === selectedAnswer ?
                    answerStyles.incorrect :
                      null
          }
        >
          {decode(answer)}
        </label>
      </div>
    ))

  const displayQuiz = () =>
    quizDisplay
      .slice(quizCurrentSet.current, quizCurrentSet.current + 5)
      .map(quiz => (
        <div
          key={quiz.id}
          className='quiz-container'
        >
          <h2 className='question'>{decode(quiz.question)}</h2>
          <div className='answer-container'>
            {displayAnswers(quiz)}
          </div>
          <hr />
        </div>
      ))

  return (
    <div className='display-container'>
      <form onSubmit={handleSubmit}>
        {displayQuiz()}
        <div className='btn-container'>
          <button className='button submit-btn'>
            {
              !showAnswers ?
              'Submit Answers' :
                quizLastSet ?
                'Show scores' :
                  'Next'
            }
          </button>
          <p className='quiz-num'>{displayCurrentSet}</p>
        </div>
      </form>
    </div>
  )
}
