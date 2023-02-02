import "./Cat.css";

function Cat(props) {
    return (
      <div>
        <p> Daily Motivation </p>
        <img class = "kitten" src = {"https://placekitten.com/" + props.id + "/300" } />
        <p> Quote of the Day: {props.name} </p>
      </div>
    );
  }
  
  export default Cat;
  