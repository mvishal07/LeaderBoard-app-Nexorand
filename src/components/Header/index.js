import './index.css' 
import {Link} from 'react-router-dom'

const Header = () =>{

    return(
        <nav className='nav-bar'>
            <ul className='nav-list'>
                <Link to="/" className='link'><li className='item'>Home</li></Link>
                <Link to="/leaderboard" className='link'><li className='item'>LeaderBoard</li></Link>
            </ul>
            
        </nav>
    )

}
export default Header