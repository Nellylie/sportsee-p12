import yoga from "../icones/yoga.svg";
import swim from "../icones/swim.svg";
import bike from "../icones/bike.svg";
import barbell from "../icones/barbell.svg";

// retourne la barre de navigation latérale
function Sidebar () {
  return (
    <div className = "side-bar__main"> <div className="main__icones-container">
      <img className ="svg" src = {yoga} />
      <img className ="svg" src = {swim} />
      <img className ="svg" src = {bike} />
      <img className ="svg" src = {barbell} />
    </div>
    <div className="main__copyright-container">
      <p>Copyright, SportSee 2023</p>
    </div>
    </div>
  );
}
    
export default Sidebar;