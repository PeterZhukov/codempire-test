import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "icheck/skins/all.css";
import { Switch, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import QuestionsPage from "./pages/QuestionsPage";
import ResultsPage from "./pages/ResultsPage";
import { Container } from "react-bootstrap";

class App extends Component {
  state = {
    questions: [
      {
        id: 1,
        qestionText: "Select one",
        type: "text",
        answers: [
          {
            id: 1,
            value: "one"
          },
          {
            id: 2,
            value: "two"
          },
          {
            id: 3,
            value: "three"
          }
        ],
        validAnswerIds: ["one"]
      },
      {
        id: 2,
        qestionText: "Select two",
        type: "radio",
        answers: [
          {
            id: 1,
            value: "one"
          },
          {
            id: 2,
            value: "two"
          },
          {
            id: 3,
            value: "three"
          }
        ],
        validAnswerIds: [2]
      },
      {
        id: 3,
        qestionText: "Select two, three",
        type: "checkbox",
        answers: [
          {
            id: 1,
            value: "one"
          },
          {
            id: 2,
            value: "two"
          },
          {
            id: 3,
            value: "three"
          }
        ],
        validAnswerIds: [2, 3]
      },
      {
        id: 4,
        qestionText: "Select one",
        type: "select",
        answers: [
          {
            id: 1,
            value: "one"
          },
          {
            id: 2,
            value: "two"
          },
          {
            id: 3,
            value: "three"
          }
        ],
        validAnswerIds: [1]
      }
    ],
    currentAnswers: []
  };
  answerQuestion = (questionId, questionAnswer, checked) => {
    console.log(questionAnswer);
    console.log(checked);
    let currentAnswers = this.state.currentAnswers;
    let index = this.state.currentAnswers.findIndex(
      answer => answer.questionId === questionId
    );
    let currentAnswer;
    if (checked === true || checked === false) {
      if (index > -1) {
        currentAnswer = currentAnswers[index];
      } else {
        currentAnswer = { questionId, value: [] };
      }
      if (checked === false) {
        let valueIndex = currentAnswer.value.indexOf(questionAnswer);
        if (valueIndex > -1) {
          currentAnswer.value.splice(valueIndex, 1);
        }
      } else {
        currentAnswer.value.push(questionAnswer);
      }
      currentAnswer.value.sort();
    } else {
      currentAnswer = { questionId, value: questionAnswer };
    }

    if (index == -1) {
      currentAnswers.push(currentAnswer);
    } else {
      currentAnswers.splice(index, 1, currentAnswer);
    }
    currentAnswers.sort(
      (value1, value2) => value1.questionId - value2.questionId
    );
    this.setState({ currentAnswers });
  };
  validateAllAnswered = () => {
    let allAnswered =
      this.state.currentAnswers.length === this.state.questions.length;
    let allAnswers = true;
    this.state.currentAnswers.forEach(element => {
      if (element.value.length == 0) {
        allAnswers = false;
      }
    });
    return allAnswered && allAnswers;
  };
  getNumberOfRightQuestions = () => {
    var validAnswers = 0;
    this.state.questions.forEach(question => {
      var answerIndex = this.state.currentAnswers.findIndex(answer => {
        return answer.questionId == question.id;
      });
      if (answerIndex > -1) {
        let currentAnswer = this.state.currentAnswers[answerIndex];
        let isAllAnswersValid = true;
        question.validAnswerIds.forEach(rightAnswerId => {
          if (Array.isArray(currentAnswer.value)) {
            if (currentAnswer.value.indexOf(rightAnswerId.toString()) == -1) {
              isAllAnswersValid = false;
            }
          } else if (
            currentAnswer.value.toLowerCase() !==
            rightAnswerId.toString().toLowerCase()
          ) {
            isAllAnswersValid = false;
          }
        });
        if (isAllAnswersValid) {
          validAnswers++;
        }
      }
    });
    return validAnswers;
  };
  render() {
    return (
      <Container>
        <Switch>
          <Route
            path="/questions"
            render={props => (
              <QuestionsPage
                questions={this.state.questions}
                answerQuestion={this.answerQuestion}
                validateAllAnswered={this.validateAllAnswered}
                {...props}
              />
            )}
          />
          <Route
            path="/results"
            render={props => (
              <ResultsPage
                questions={this.state.questions}
                currentAnwsers={this.state.currentAnwsers}
                getNumberOfRightQuestions={this.getNumberOfRightQuestions}
                {...props}
              />
            )}
          />
          <Route path="/" component={HomePage} />
        </Switch>
      </Container>
    );
  }
}

export default App;
