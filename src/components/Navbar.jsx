import { Link, NavLink } from "react-router-dom"
import './Navbar.css'

const Navbar = ()=>{

    const getLinkClass = ({isActive})=>{
       return isActive ? 'nav-link active' : 'nav-link'
    }

    return(
        <nav className="navbar">
            <Link to="/" className="navbar-brand">
                Debug<span>Lab</span>
            </Link>

            <div className="navbar-links">
                <NavLink to="/" end className={getLinkClass}>Home</NavLink>
                <NavLink to="/challenges" className={getLinkClass}>Challenges</NavLink>
                <NavLink to="/dashboard" className={getLinkClass}>Dashboard</NavLink>
            </div>
        </nav>
    )
}

export default Navbar