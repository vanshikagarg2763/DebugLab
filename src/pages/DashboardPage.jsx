import { useDispatch, useSelector } from "react-redux";
import { Challenges } from "../data/Challenges";
import { Link } from "react-router-dom";
import './DashboardPage.css'
import { useEffect } from "react";
import { refreshStreak } from "../features/progress/progressSlice";

const DashboardPage = ()=>{

    const {completedChallengeIds, currentStreak, bookmarkedChallengeIds} = useSelector(state=>state.progress)

    const completedChallenges = Challenges.filter(challenge=>completedChallengeIds.includes(challenge.id))
    const remainingChallenges = Challenges.filter(
        challenge => !completedChallengeIds.includes(challenge.id)
    );
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(refreshStreak())
    },[dispatch])

    return(
        <main className="dashboard-page">
            <header className="dashboard-header">
                <h1>Your Progress</h1>
                <p>Track your learning and keep sharpening your skills.</p>
            </header>
            <div className="dashboard-stats">
                <div className="stats-card">
                    <h3>Completed Challenges</h3>
                    <p className="stats-number">
                        {completedChallengeIds.length}
                    </p>
                </div>
                <div className="streak-card">
                    <h3>Current Streak</h3>
                    <p className="stats-number">{currentStreak}</p>
                </div>
                <div className="bookmark-card">
                    <h3>Bookmarked Challenges</h3>
                    <p className="stats-number">
                        {bookmarkedChallengeIds.length}
                    </p>
                </div>
            </div>
            <section className="recent-challenges">
                <h2>Completed Challenges</h2>

                {completedChallenges.length === 0 ? (
                    <p>You haven't completed any challenges yet.</p>
                ) : (
                    completedChallenges.map(challenge => (
                        <div key={challenge.id} className="challenge-item">
                            <h3>{challenge.title}</h3>
                            <span>{challenge.topic}</span>
                            <span>{challenge.difficulty}</span>
                        </div>
                    ))
                )}
            </section>
            <section className="continue-solving">
                <h2>Continue Solving</h2>

                {remainingChallenges.length === 0 ? (
                    <p>You've completed all challenges! 🎉</p>
                ) : (
                    remainingChallenges.map(challenge => (
                        <Link to={`/challenge/${challenge.id}`} key={challenge.id} className="challenge-item">
                            <h3>{challenge.title}</h3>
                            <span>{challenge.difficulty}</span>
                        </Link>
                    ))
                )}
            </section>
            <div className="browse-challenges">
                <h2>Want to practise more?</h2>
                <Link to="/challenges">
                    Browse All Challenges →
                </Link>
            </div>
        </main>
    )
}

export default DashboardPage