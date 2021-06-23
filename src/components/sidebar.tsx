import '../App.scss';
import HOOPOW from '../assets/hoopow.svg';
import MUSLIM_SHOW from '../assets/MUSLIM_SHOW.svg';
import burger_menu from '../assets/burger_menu.svg';
import man1 from '../assets/man1.svg';
function SideBar() {
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

export default SideBar;
