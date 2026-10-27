import { Link, useParams } from "react-router-dom"
import { Challenges } from "../data/Challenges"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { bookmarkChallenge, markChallengeCompleted } from "../features/progress/progressSlice";
import './ChallengeDetailsPage.css'

const ChallengeDetailsPage = ()=>{

    const {challengeId} = useParams()
    const challenge = Challenges.find(item=>item?.id===challengeId)
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [showHint, setShowHint] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const dispatch = useDispatch()

    if (!challenge) {
        return (
        <div>
            <p>Challenge not found.</p>
            <Link to="/challenges">Back to challenges</Link>
        </div>
        );
    }

    const handleTryAgain = ()=>{
        setSelectedAnswer("");
        setIsSubmitted(false);
        setShowHint(false);
    }

    const handleSubmit = ()=>{
        setIsSubmitted(true)
        if(selectedAnswer===challenge?.correctAnswer){
            dispatch(markChallengeCompleted(challenge?.id))
        }
    }

    const completedChallengeIds = useSelector(state=>state?.progress?.completedChallengeIds)
    const isCompleted = completedChallengeIds?.includes(challenge?.id)
    const bookmarkedChallengeIds = useSelector(state=>state?.progress?.bookmarkedChallengeIds)
    const isBookmarked = bookmarkedChallengeIds?.includes(challenge?.id)

    const handleBookmark = ()=>{
        dispatch(bookmarkChallenge(challenge?.id))
    }

    return(
        <main className="challenge-details">
            <Link className="back-link" to="/challenges">← Back to challenges</Link>

            <h1 style={{display:"flex", gap:"12px", alignItems:"baseline"}}>
                {challenge.title}
                {isCompleted && <span style={{fontSize:"24px", color:"green"}}>{'✓ Completed'}</span>}
                <button onClick={handleBookmark}>{isBookmarked? '★ Bookmarked' : '☆ Bookmark'}</button>
            </h1>

            <div className="challenge-meta">
                <span className="badge">{challenge.topic}</span>
                <span className="badge difficulty-badge">
                    {challenge.difficulty}
                </span>
            </div>

            <pre className="code-block">
                <code>{challenge?.code}</code>
            </pre>

            <h2 className="question">{challenge?.question}</h2>

            <fieldset className="answer-section">
                <legend>Select your answer</legend>

                <div className="answer-list">
                    {challenge?.options.map(option=>(
                        <label 
                            className={`answer-option ${
                                selectedAnswer === option.id ? "selected" : ""
                            }`}
                            key={option.id}
                        >
                            <input 
                                type="radio" 
                                name="answer"
                                value={option?.id}
                                disabled={isSubmitted}
                                checked={selectedAnswer===option?.id}
                                onChange={event=>setSelectedAnswer(event.target.value)}
                            />
                            <span>{option?.text}</span>
                        </label>
                    ))}
                </div>
            </fieldset>
            
            <div className="challenge-actions">
                <button 
                    className="secondary-button"
                    type="button" 
                    onClick={() => setShowHint((previous) => !previous)}
                >
                    {showHint ? "Hide hint" : "Show hint"}
                </button>
                <button 
                    className="primary-button"
                    type="button" 
                    onClick={handleSubmit} 
                    disabled={!selectedAnswer || isSubmitted}
                >
                    Submit Answer
                </button>
            </div>
            {showHint && (
                <div className="hint-box">
                    <strong>Hint:</strong> {challenge.hint}
                </div>
            )}
            {isSubmitted && (
                <div
                    className={`feedback ${
                        selectedAnswer === challenge?.correctAnswer
                        ? "correct"
                        : "incorrect"
                    }`}
                >
                    <h3>
                        {selectedAnswer === challenge?.correctAnswer
                        ? "Correct answer!"
                        : "Incorrect answer."}
                    </h3>

                    <p>{challenge?.explanation}</p>

                    <button type="button" onClick={handleTryAgain}>
                        Try again
                    </button>
                </div>
            )}
        </main>
    )
}

export default ChallengeDetailsPage