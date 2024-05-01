import { Link } from 'react-router-dom';
import './Logo.scss'
import Logotype from '/logo.svg'

const Logo = () => {
    return (
        <Link to="http://localhost:3000/" >
             <div className="logo">
                 <img src={Logotype} alt="" />
                <span>ИТ Маркет</span>
              </div>
        </Link>
    );
}
 
export default Logo;