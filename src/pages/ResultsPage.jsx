import React, { Component } from "react";

class ResultsPage extends Component {
  state = {};
  render() {
    return (
      <div>
        Вы ответили правильно на {this.props.getNumberOfRightQuestions()}{" "}
        вопросов из {this.props.questions.length}
      </div>
    );
  }
}

export default ResultsPage;
