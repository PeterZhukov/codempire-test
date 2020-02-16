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
        validAnswerIds: [1]
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
    currentAnwsers: []
  };
  render() {
    return (
      <Container>
        <Switch>
          <Route
            path="/questions"
            render={props => (
              <QuestionsPage questions={this.state.questions} {...props} />
            )}
          />
          <Route
            path="/results"
            render={props => (
              <ResultsPage
                questions={this.state.questions}
                currentAnwsers={this.state.currentAnwsers}
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
