import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import { router } from '../router';

function App() {
  return (
    <div className='wrapper' >
      <Header />
      <div className="content">
        {router()}
      </div>
      <div className="footer-bottom">
        <Footer/>
      </div>
    </div>
  );
}


export default App;