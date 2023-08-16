import {useState} from 'react'
import '../styles/alerts.css'

function AlertAnswerAll({toggleShowAnswers, setAnswerAllAlert}) {
  const [isOpen, setIsOpen] = useState(true)

  const handleOptionClick = (choice) => {
    setAnswerAllAlert(choice)
    setIsOpen(false)

    if (choice === 'continue') {
      toggleShowAnswers()
    }
  }

  return (
    <div className={`alert ${isOpen ? 'display' : ''}`}>
      <div className='alert-content'>
        <p className='instructions'>Unanswered questions will not be scored</p>
        <button className='button' onClick={() => handleOptionClick('continue')}>Continue with unanswered questions</button>
        <button className='button' onClick={() => handleOptionClick('goBack')}>Answer skipped questions</button>
      </div>

    </div>
  )
}

export default AlertAnswerAll