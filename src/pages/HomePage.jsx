
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./HomePage.css";

function HomePage() {
    const { completedChallengeIds, currentStreak } = useSelector(
        (state) => state.progress
    );

    return (
        <main className="home-page">
            <section className="home-hero">
                <span className="hero-label">YOUR FRONTEND PRACTICE SPACE</span>

                <h1>
                    Write code. Predict the output.
                    <span> Understand the why.</span>
                </h1>

                <p>
                    Strengthen your JavaScript and React fundamentals with
                    hands-on challenges that test how well you understand
                    the code you write.
                </p>

                <div className="hero-actions">
                    <Link to="/challenges" className="primary-button">
                        Start Practising <span>→</span>
                    </Link>

                    <Link to="/dashboard" className="secondary-button">
                        View My Progress
                    </Link>
                </div>

                <div className="hero-stats">
                    <div>
                        <strong>{completedChallengeIds.length}</strong>
                        <span>Challenges completed</span>
                    </div>

                    <div>
                        <strong>{currentStreak}</strong>
                        <span>Day streak</span>
                    </div>
                </div>
            </section>

            <section className="home-topics">
                <div className="section-heading">
                    <div>
                        <h2>What do you want to practise?</h2>
                        <p>Build stronger fundamentals, one concept at a time.</p>
                    </div>

                    <Link to="/challenges">View all challenges →</Link>
                </div>

                <div className="topic-grid">
                    <Link to="/challenges" className="topic-card">
                        <span className="topic-icon">JS</span>
                        <h3>Closures</h3>
                        <p>Understand scope, lexical environments, and how
                            functions remember variables.</p>
                        <span className="topic-link">Explore challenges →</span>
                    </Link>

                    <Link to="/challenges" className="topic-card">
                        <span className="topic-icon">{`{ }`}</span>
                        <h3>Event Loop</h3>
                        <p>Predict execution order with promises,
                            callbacks, and asynchronous JavaScript.</p>
                        <span className="topic-link">Explore challenges →</span>
                    </Link>

                    <Link to="/challenges" className="topic-card">
                        <span className="topic-icon">⚛</span>
                        <h3>React State Updates</h3>
                        <p>Explore state changes, rendering behaviour,
                            and common React gotchas.</p>
                        <span className="topic-link">Explore challenges →</span>
                    </Link>
                </div>
            </section>

            <section className="home-bottom-cta">
                <div>
                    <h2>Think you know JavaScript?</h2>
                    <p>Put your understanding to the test. The output
                        might surprise you.</p>
                </div>

                <Link to="/challenges" className="primary-button">
                    Take a Challenge →
                </Link>
            </section>
        </main>
    );
}

export default HomePage;
