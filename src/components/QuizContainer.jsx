import '../styles/quizContainer.css'
import QuizStart from './QuizStart'
import QuizDisplay from './QuizDisplay'
import QuizScore from './QuizScore'
import React, {useState, useEffect} from 'react'
import {nanoid} from 'nanoid'
import RandomShape from '../assets/RandomShape'
import AlertAnswerAll from '../components/Alerts'

export default function QuizContainer({quizState, setQuizState}) {
	const [quizApi, setQuizApi] = useState([])
	const [quizDisplay, setQuizDisplay] = useState([])
	const [quizApiOptions, setQuizApiOptions] = useState(
    {number: '10', category: '9',	difficulty: 'easy'})
	const [quizScore, setQuizScore] = useState({correct: 0, total: 0})
	const [quizCurrentSet, setQuizCurrentSet] = useState({current: 0, total: 0})
	const [quizLastSet, setQuizLastSet] = useState(false)
	const [showAnswers, setShowAnswers] = useState(false)
	const [answerAllAlert, setAnswerAllAlert] = useState('')

	useEffect(() => {
		const fetchData = async () => {
			try {
				const {number, category, difficulty} = quizApiOptions
				let url = `https://opentdb.com/api.php?amount=${number}`
				if (category && category !== 'any') {
					url += `&category=${category}`
				}
				if (difficulty && difficulty !== 'any') {
					url += `&difficulty=${difficulty}`
				}
				const responce = await fetch(url)
				const data = await responce.json()
				setQuizApi(data.results)
			} catch (error) {
				console.error('Error fetching data:', error)
			}
		}
		if (quizState === 'startQuiz') {
			fetchData()
		}
	}, [quizState])

	useEffect(() => {
		const updateQuizDisplay = () => {
			setQuizDisplay(formatQuizDisplay())
		}

		const updateQuizCurrentSet = () => {
			const copiedCurrentSet = {...quizCurrentSet}
			copiedCurrentSet.total = quizApi.length
			setQuizCurrentSet(copiedCurrentSet)
		}

		if (quizApi.length > 0) {
			updateQuizDisplay()
			updateQuizCurrentSet()
			handleQuizDisplay()
		}
	}, [quizApi])

	useEffect(() => {
		const lastSet = quizCurrentSet.current === quizCurrentSet.total - 5
		setQuizLastSet(lastSet)
	}, [quizCurrentSet])

	// console.log(answerAllAlert)
	// console.log('quizState: ', quizState)
	// console.log(quizDisplay)
	// console.log(quizApiOptions)
	// console.log(quizApi)
	// console.log('showAnswers: ', showAnswers)
	// console.log(`quizCurrenSet: ${quizCurrentSet.current} of ${quizCurrentSet.total}`)
	// console.log('quizLastSet', quizLastSet)
	// console.log('quizScore', quizScore)
	// console.log('quizApi: ', quizApi.length)
	// console.log('quizDisplay: ', quizDisplay.length)
	// console.log('quizApiOptions: ', Object.keys(quizApiOptions).length)
	// console.log(quizCurrentSet.current === quizCurrentSet.total - 5)
	// console.log(sampleApi)

	const setApiOptions = (key, value) => {
		const copiedObject = {...quizApiOptions}
		copiedObject[key] = value
		setQuizApiOptions(copiedObject)
	}

	function formatQuizDisplay() {
		const quizArray = []
		for (let i = 0; i < quizApi.length; i++) {
			const randomizeAnswers = () => {
				const currentQuiz = quizApi[i]
				const {incorrect_answers, correct_answer} = currentQuiz
				const allAnswers = [...incorrect_answers, correct_answer]
				const shuffledAnswers = allAnswers.sort(() => Math.random() - 0.5)
				return shuffledAnswers
			}
			quizArray.push({
				id: nanoid(),
				question: quizApi[i].question,
				correctAnswer: quizApi[i].correct_answer,
				allAnswers: randomizeAnswers(),
				selectedAnswer: ''
			})
		}
		return quizArray
	}

	const setAnswers = (answerId, answer) => {
		setQuizDisplay(prevQuizDisplay =>
			prevQuizDisplay.map(quiz =>
				answerId === quiz.id ?
        {...quiz, selectedAnswer: answer} :
        quiz
			)
		)
	}

	const toggleShowAnswers = () => {
		setShowAnswers(prevShowAnswers =>
      (prevShowAnswers = !prevShowAnswers)
    )
	}

	function everyAnswer() {
		if (
			quizDisplay
				.slice(quizCurrentSet.current, quizCurrentSet.current + 4)
				.every(quiz => quiz.selectedAnswer) ||
			answerAllAlert === 'continue') {
			toggleShowAnswers()
		} else if (answerAllAlert === '') {
			setAnswerAllAlert('alert')
		} else {
			setAnswerAllAlert('continue')
			toggleShowAnswers()
		}
	}

	const advanceCurrentSet = () => {
		const copiedCurrentSet = {...quizCurrentSet}
		copiedCurrentSet.current = copiedCurrentSet.current + 5
		setQuizCurrentSet(copiedCurrentSet)
	}

	function updateScore() {
		let correctCount = 0
		let answeredCount = 0

		quizDisplay.forEach(quizObject => {
			if (quizObject.correctAnswer === quizObject.selectedAnswer) {
				correctCount++
			}
			if (quizObject.selectedAnswer) {
				answeredCount++
			}
		})

		const copiedQuizScore = {...quizScore}
		copiedQuizScore.correct = copiedQuizScore.correct + correctCount
		copiedQuizScore.total = copiedQuizScore.total + answeredCount
		setQuizScore(copiedQuizScore)
	}

	const resetQuizScore = () => {
		setQuizScore({correct: 0, total: 0})
	}

	function handleSubmit(event) {
		event.preventDefault()
		if (quizLastSet) {
			if (!showAnswers) {
				everyAnswer()
			} else {
				handleQuizScore()
			}
		} else if (showAnswers) {
			toggleShowAnswers()
			advanceCurrentSet()
		} else {
			everyAnswer()
		}
	}

	const handleQuizStart = event => {
		event.preventDefault()
		setQuizState('startQuiz')
	}

	const handleQuizDisplay = () => {
		setQuizState('displayQuiz')
	}

	const handleQuizScore = () => {
		updateScore()
		setQuizCurrentSet({current: 0, total: 0})
		setShowAnswers(false)
		setQuizState('scoreQuiz')
	}

	return (
		<div className='app'>
			{!quizState && (
				<div className='container'>
					<QuizStart
						quizState={quizState}
						quizApiOptions={quizApiOptions}
						setApiOptions={setApiOptions}
						handleQuizStart={handleQuizStart}
					/>
					<RandomShape />
				</div>
			)}
			{quizState === 'displayQuiz' && (
				<div className='container'>
					{answerAllAlert === 'alert' && (
						<AlertAnswerAll
							setAnswerAllAlert={setAnswerAllAlert}
							toggleShowAnswers={toggleShowAnswers}
						/>
					)}
					<QuizDisplay
						quizState={quizState}
						quizDisplay={quizDisplay}
						quizCurrentSet={quizCurrentSet}
						quizLastSet={quizLastSet}
						showAnswers={showAnswers}
						handleSubmit={handleSubmit}
						handleClick={setAnswers}
					/>
				</div>
			)}
			{quizState === 'scoreQuiz' && (
				<div className='container'>
					<QuizScore
						quizState={quizState}
						quizApiOptions={quizApiOptions}
						setApiOptions={setApiOptions}
						handleQuizStart={handleQuizStart}
						quizScore={quizScore}
						resetQuizScore={resetQuizScore}
					/>
					<RandomShape />
				</div>
			)}
		</div>
	)
}
