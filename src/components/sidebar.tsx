import '../App.scss';
import '../styles/sidebar.scss';
import HOOPOW from '../assets/hoopow.svg';
import MUSLIM_SHOW from '../assets/MUSLIM_SHOW.svg';
import burger_menu from '../assets/burger_menu.svg';
import man1 from '../assets/man1.svg';
import home from '../assets/home.svg';
import open_fullscreen from '../assets/open_fullscreen.svg';
import share from '../assets/share.svg';
import { getImageLink } from './helpers';
import { Link } from 'react-router-dom';

interface Props {
  name: string;
  publicationDate: string;
  selectedImage: number;
  changeFullscreen: (fullscreen: boolean) => void;
  imageHomepage: string;
}
BDSideBar.defaultProps = {
  name: '',
  publicationDate: '',
  imageHomepage: '',
  selectedImage: 0,
  changeFullscreen: () => null,
};
export function BDSideBar(props: Props) {
  return (
    <div className="Sidebar">
      <div className="hoopow_menu">
        <img className="menu" alt="menu" src={burger_menu} />
        <img src={HOOPOW} className="logo" alt="logo" />
      </div>
      <div className="BD-sidebar">
        <img alt="BD phot" src={getImageLink(props.imageHomepage)} />
        <span>{props.name.toLowerCase()}</span>
      </div>

      {!props.selectedImage ? (
        <div className="subscribe_container">
          <span>
            SOUTENEZ
            <br />
            LA PRODUCTION EN
            <br />
            VOUS ABONNANT !
          </span>
          <br />
          <span className="subscribe_button">S’ABONNER</span>
          <div className="image_container">
            <img src={man1} alt="subscribe man" className="subscribe_man" />
            <span className="already_subscribed">
              DÉJÀ ABONNÉ ?<br />
              <u>CONNECTEZ-VOUS</u>
            </span>
          </div>
        </div>
      ) : (
        <div className="buttons_container">
          <div className="share_button">
            <img src={share} alt="share BD" />
            <span>PARTAGER</span>
          </div>
          <div
            className="button"
            onClick={() => {
              props.changeFullscreen(true);
            }}
          >
            <img src={open_fullscreen} alt="open full screen" />
            <span>PLEIN ÉCRAN</span>
          </div>
          <Link to="/" className="button">
            <img src={home} alt="go to home" />
            <span>ACCUEIL</span>
          </Link>
        </div>
      )}
    </div>
  );
}

export function HomeSideBar() {
  return (
    <div className="Sidebar">
      <div className="hoopow_menu">
        <img className="menu" alt="menu" src={burger_menu} />
        <img src={HOOPOW} className="logo" alt="logo" />
      </div>
      <div className="pd10 bluebox">
        <span>Disponible gratuitement :</span>
        <span className="bold fs20">LA BD DU JOUR</span>
      </div>
      <div className="muslim_show">
        <img src={MUSLIM_SHOW} alt="muslim show" />
      </div>
      <div className="subscribe_container">
        <span>
          SOUTENEZ
          <br />
          LA PRODUCTION EN
          <br />
          VOUS ABONNANT !
        </span>
        <br />
        <span className="subscribe_button">S’ABONNER</span>
        <div className="image_container">
          <img src={man1} alt="subscribe man" className="subscribe_man" />
          <span className="already_subscribed">
            DÉJÀ ABONNÉ ?<br />
            <u>CONNECTEZ-VOUS</u>
          </span>
        </div>
      </div>
    </div>
  );
}
