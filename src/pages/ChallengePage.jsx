import { useState } from 'react'
import {Challenges} from '../data/Challenges'
import './Pages.css'
import { Link } from 'react-router-dom'

const ChallengePage = ()=>{

    const[selectedTopic, setSelectedTopic] = useState("All")
    const [selectedDifficulty, setSelectedDifficulty] = useState("All")
 
    const filteredChallenges =
        Challenges.filter((item,id)=>{
            return(
            (selectedTopic==="All" || item?.topic===selectedTopic) &&
            (selectedDifficulty==="All" || item?.difficulty===selectedDifficulty)
            )
        })

    return(
        <main className="challenge-page">
            <header className="challenge-header">
                <h1>Explore Challenges</h1>
                <p>Practice your frontend skills, one challenge at a time.</p>
            </header>

            <div className="filters">
                <div className="filter">
                    <label htmlFor="topic-filter">Topic</label>
                    <select
                    value={selectedTopic}
                    onChange={(event) => setSelectedTopic(event.target.value)}
                    >
                        <option value="All">All topics</option>
                        <option value="Closures">Closures</option>
                        <option value="Event Loop">Event Loop</option>
                        <option value="React State Updates">React State Updates</option>
                    </select>
                </div>

                <div className="filter">
                    <label htmlFor="difficulty-filter">Difficulty</label>
                    <select
                    value={selectedDifficulty}
                    onChange={(event) => setSelectedDifficulty(event.target.value)}
                    >
                        <option value="All">All difficulties</option>
                        <option value="Medium">Medium</option>
                        <option value="Easy">Easy</option>
                    </select>
                </div>
            </div>

            <div className="challenge-list">
                {filteredChallenges.length > 0 ? (
                filteredChallenges.map((challenge) => (
                    <Link
                    to={`/challenge/${challenge.id}`}
                    key={challenge.id}
                    className="challenge-link"
                    >
                        <article className="challenge-card" key={challenge.id}>
                            <div className="challenge-card-content">
                                <span className="challenge-topic">
                                    {challenge.topic}
                                </span>
                                <h2>{challenge.title}</h2>
                                <span className={`difficulty-badge ${challenge.difficulty.toLowerCase()}`}>
                                    {challenge.difficulty}
                                </span>
                            </div>
                        </article>
                    </Link>
                ))
                ) : (
                    <p>No challenges found.</p>
                    )}
            </div>
        </main>
    )
}

export default ChallengePage