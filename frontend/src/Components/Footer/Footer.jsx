import Logo from '../Base/Logo/Logo';
import './Footer.scss'

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-wrapper">
                    <div className="footer-logo">
                        <Logo/>
                    </div>
                    {/* <button className="footer-about">ITMarket@gmail.com</button> */}
                    <a href="mailto:ITMarket@gmail.com" className="footer-about">ITMarket@gmail.com</a>
                </div>
            </div>
        </footer>
    );
}
 
export default Footer;