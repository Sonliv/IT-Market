import './Empty.scss';
import { PATHS } from '../../../router';
import EmptyFavourites from '/empty__favourites2.webp'
import BaseBtn from '../Base/BaseBtn/BaseBtn';
import { Link } from 'react-router-dom';

const Empty = (props) => {
    return (
        <div className="container">
            <div className="favorite__empty">
            <img src={EmptyFavourites} alt="" />
            <p>{props.desc} <span>{props.spanText}</span></p>
            <Link to={props.url} >
                <BaseBtn BtnText={props.btnText} />
            </Link>
        </div>
        </div>
    );
}
 
export default Empty
