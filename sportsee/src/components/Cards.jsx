function Cards ({icon, number, unit, type, color}) {

  return (
    <div className="cards-container">
      <div className="cards-img" style={{ backgroundColor: color }}>        
        <img src={icon} alt="icon" />
      </div>
      <div className="cards-description">
        <div className="description-unit">
          {number}
          {unit}
        </div>
        <div className="description-type">{type}</div>
      </div>

    </div>
  );
}
export default Cards;