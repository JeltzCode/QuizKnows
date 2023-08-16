export default function QuizSelect({quizState, quizApiOptions, setApiOptions, resetQuizScore}) {

    return(
        <div className="options-container">
            
              <div>
                {quizState === 'scoreQuiz' &&
                <button
                className='button reset-btn'
                type='button'
                onClick={() => resetQuizScore()}
                >
                  Reset Score
                </button>}
              </div>
              <div className="large-screen">
                <label
                    className='label'
                    htmlFor="category">
                    Category 
                </label>    
                <select
                    className='select'
                    id="category"
                    value={quizApiOptions.category}
                    onChange={(e) =>
                      setApiOptions(e.target.id, e.target.value)
                    }
                >
                    <option value="any">Any Category</option>
                    <option value="9">General Knowledge</option>
                    <option value="10">Entertainment: Books</option>
                    <option value="11">Entertainment: Film</option>
                    <option value="12">Entertainment: Music</option>
                    <option value="13">Entertainment: Musicals &amp; Theatres</option>
                    <option value="14">Entertainment: Television</option>
                    <option value="15">Entertainment: Video Games</option>
                    <option value="16">Entertainment: Board Games</option>
                    <option value="17">Science &amp; Nature</option>
                    <option value="18">Science: Computers</option>
                    <option value="19">Science: Mathematics</option>
                    <option value="20">Mythology</option>
                    <option value="21">Sports</option>
                    <option value="22">Geography</option>
                    <option value="23">History</option>
                    <option value="24">Politics</option>
                    <option value="25">Art</option>
                    <option value="26">Celebrities</option>
                    <option value="27">Animals</option>
                    <option value="28">Vehicles</option>
                    <option value="29">Entertainment: Comics</option>
                    <option value="30">Science: Gadgets</option>
                    <option value="31">Entertainment: Japanese Anime &amp; Manga</option>
                    <option value="32">Entertainment: Cartoon &amp; Animations</option>		
                </select>
            </div>
            <div className="large-screen">
                <label
                    className='label'
                    htmlFor="difficulty">
                    Difficulty
                </label>
                <select
                    className='select'
                    id="difficulty"
                    value={quizApiOptions.difficulty}
                    onChange={(e) =>
                      setApiOptions(e.target.id, e.target.value)
                    }
                >
                    <option value="any">Any Difficulty</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
            </div>
            <div className="large-screen">
                <label
                    className='label'
                    htmlFor="number">
                    Number
                </label>
                <select
                    className='select'
                    id="number"
                    value={quizApiOptions.number}
                    onChange={(e) =>
                      setApiOptions(e.target.id, e.target.value)
                    }
                >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                    <option value="25">25</option>
                    <option value="30">30</option>
                    <option value="35">35</option>
                    <option value="40">40</option>
                    <option value="45">45</option>
                    <option value="50">50</option>
                </select>
            </div>
            <div>
              <button className='button start-btn'>
                {!quizState ? 'Start quiz' : "Start another quiz"}
              </button>
            </div>
        </div>
    )
}