import { useState } from 'react'
import {Challenges} from '../data/Challenges'
import './Pages.css'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";

const ChallengePage = ()=>{

    const[selectedTopic, setSelectedTopic] = useState("All")
    const [selectedDifficulty, setSelectedDifficulty] = useState("All")
    const [searchQuery, setSearchQuery] = useState("")
 
    const filteredChallenges = Challenges.filter((item) => {
        const matchesTopic =
            selectedTopic === "All" || item.topic === selectedTopic;

        const matchesDifficulty =
            selectedDifficulty === "All" || item.difficulty === selectedDifficulty;

        const matchesSearch =
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.topic.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesTopic && matchesDifficulty && matchesSearch;
    });

    const completedChallengeIds = useSelector(
        state => state.progress.completedChallengeIds
    )

    return(
        <main className="challenge-page">
            <header className="challenge-header">
                <h1>Explore Challenges</h1>
                <p>Practice your frontend skills, one challenge at a time.</p>
            </header>

            <div className="filters">
                <div className="filter">
                    <label htmlFor="challenge-search">Search challenges</label>
                    <input
                        id="challenge-search"
                        type="text"
                        placeholder="Search by title or topic..."
                        value={searchQuery}
                        onChange={(event) => setSearchQuery(event.target.value)}
                    />
                </div>
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
                        <option value="React Hooks">React Hooks</option>
                        <option value="Debouncing">Debouncing</option>
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

            <p className="challenge-count">
                Showing {filteredChallenges.length} of {Challenges.length} challenges
            </p>

            <div className="challenge-list">
                {filteredChallenges.length > 0 ? (
                filteredChallenges.map((challenge) => {
                    const isCompleted = completedChallengeIds.includes(challenge.id);
                    return(
                        <Link
                        to={`/challenge/${challenge.id}`}
                        key={challenge.id}
                        className="challenge-link"
                        >
                            <article className="challenge-card">
                                <div className="challenge-card-content">
                                    <span className="challenge-topic">
                                        {challenge.topic}
                                    </span>
                                    <h2>{challenge.title}</h2>
                                    <span className={`difficulty-badge ${challenge.difficulty.toLowerCase()}`}>
                                        {challenge.difficulty}
                                    </span>
                                </div>
                                <div>
                                    <span className={isCompleted ? "completed-status" : "pending-status"}>
                                        {isCompleted ? "✓ Completed" : "Not completed"}
                                    </span>
                                </div>
                            </article>
                        </Link>
                    )
                })
                ) : (
                    <p className="no-challenges">No challenges found.</p>
                    )}
            </div>
        </main>
    )
}

export default ChallengePage