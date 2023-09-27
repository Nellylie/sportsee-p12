function Cards (props) {

  return (
    <div>
      <div>
        <img src={props.icon} alt="icon" />
      </div>
      <div>
        <div>
          {props.number}
          {props.unit}
        </div>
        <div>{props.type}</div>
      </div>

    </div>
  );
}
export default Cards;