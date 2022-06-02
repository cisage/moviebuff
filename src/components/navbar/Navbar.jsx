import { Notifications, Search } from '@mui/icons-material'
import './navbar.scss'

const Navbar = () =>{
    return(
        <div className='navbar'>
            <div className="container">
                <div className="left">
                    <img 
                        src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png'
                        alt=""
                    />
                    <span>Homepage</span>
                    <span>Series</span>
                    <span>Movies</span>
                </div>

                <div className='right'>
                    <Search className='icon'/>
                    <span>KID</span>
                    <Notifications className='icon'/>
                </div>
            </div>
        </div>
    )
}

export default Navbar