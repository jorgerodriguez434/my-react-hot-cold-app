import React from "react";
import { render } from "react-dom";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      guesses: [],
      feedback: "no feedback yet",
      luckyNumber: 7,
      mostRecent: 0,
      userInput: "No user input"
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log("submit button has been clicked!");
    const guesses = this.state.guesses;
    const input = this.refs.guess.value;
    console.log(input);
    const recent = guesses[guesses.length - 1];
    guesses.push(input);

    this.setState({
      userInput: input,
      mostRecent: recent
    });
    console.log(guesses);

    if (input < 7) {
      this.setState({
        feedback: "cold!"
      });
    } else if (input > 7) {
      this.setState({
        feedback: "hot!"
      });
    } else if (input === 7) {
      this.setState({
        feedback: "You won!"
      });
    }
  }

  render() {
    return (
      <div>
        <h1> The guessing game</h1>
        <h2> {this.state.userInput}</h2>
        <form onSubmit={e => this.handleSubmit(e)}>
          <input
            id="user-input"
            placeholder="Enter something"
            type="text"
            required
            ref="guess"
          />
        </form>
        <FeedBack feedback={this.state.feedback}> </FeedBack>
        <Guesses guesses={this.state.guesses}> </Guesses>
      </div>
    );
  } //render
} //class

/*function SubmitButton(props) {
  return (
    <button className="submit-button" type="submit" onClick={props.onClick}>
      Submit
    </button>
  );
}*/

function FeedBack(props) {
  return (
    <div className="feedback">
      <h2> {props.feedback} </h2>
    </div>
  );
}

function Guesses(props) {
  const { guesses } = props;
  const guess = guesses.map((guess, index) => (
    <div key={index} className="guesses">
      <h3> {guess} </h3>
    </div>
  ));
  return <h1>{guess}</h1>;
}

const App = () => {
  return (
    <div>
      <Game />
    </div>
  );
};

render(<App />, document.getElementById("root"));
