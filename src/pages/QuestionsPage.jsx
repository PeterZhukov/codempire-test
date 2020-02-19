import React, { Component } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { Checkbox, Radio, RadioGroup } from "react-icheck";

class QuestionsPage extends Component {
  state = {
    modalShow: false
  };
  handleEndTest = () => {
    if (!this.props.validateAllAnswered()) {
      this.setState({ modalShow: true });
    } else {
      this.props.history.push("/results");
    }
  };
  handleModalClose = () => {
    this.setState({ modalShow: false });
  };
  handleReallyEndTest = () => {
    this.props.history.push("/results");
  };
  render() {
    return (
      <div>
        <h1>Тестовые вопросы</h1>
        <Form>
          {this.props.questions.map(question => {
            if (question.type == "text") {
              return (
                <Form.Group controlId={"question_" + question.id}>
                  <Form.Label>{question.qestionText}</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={e => {
                      this.props.answerQuestion(question.id, e.target.value);
                    }}
                  />
                </Form.Group>
              );
            } else if (question.type == "radio") {
              return (
                <Form.Group controlId={"question_" + question.id}>
                  <Form.Label>{question.qestionText}</Form.Label>
                  <br />
                  <RadioGroup
                    name="radio"
                    onChange={e => {
                      this.props.answerQuestion(question.id, e.target.value);
                    }}
                  >
                    {question.answers.map(answer => {
                      return [
                        <Radio
                          value={answer.id.toString()}
                          radioClass="iradio_square-blue"
                          increaseArea="20%"
                          label={answer.value}
                        />,
                        <br />
                      ];
                    })}
                  </RadioGroup>
                </Form.Group>
              );
            } else if (question.type == "checkbox") {
              return (
                <Form.Group controlId={"question_" + question.id}>
                  <Form.Label>{question.qestionText}</Form.Label>
                  <br />
                  {question.answers.map(answer => {
                    return (
                      <React.Fragment>
                        <Checkbox
                          checkboxClass="icheckbox_square-blue"
                          increaseArea="20%"
                          label={answer.value}
                          value={answer.id}
                          onChange={e => {
                            this.props.answerQuestion(
                              question.id,
                              e.target.value,
                              e.target.checked
                            );
                          }}
                        />
                        <br />
                      </React.Fragment>
                    );
                  })}
                </Form.Group>
              );
            } else if (question.type == "select") {
              return (
                <Form.Group controlId={"question_" + question.id}>
                  <Form.Label>{question.qestionText}</Form.Label>
                  <Form.Control
                    as="select"
                    onChange={e => {
                      this.props.answerQuestion(question.id, e.target.value);
                    }}
                  >
                    <option value=""></option>
                    {question.answers.map(answer => {
                      return <option value={answer.id}>{answer.value}</option>;
                    })}
                  </Form.Control>
                </Form.Group>
              );
            }
            return null;
          })}
        </Form>
        <div style={{ textAlign: "right" }}>
          <Button variant="primary" onClick={this.handleEndTest}>
            Закончить тест
          </Button>
        </div>
        <Modal show={this.state.modalShow}>
          <Modal.Header closeButton>
            <Modal.Title>Внимание</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Все не отвеченные вопросы будут засчитаны как неверные!
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleModalClose}>
              Продолжить
            </Button>
            <Button variant="primary" onClick={this.handleReallyEndTest}>
              Завершить тест
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default QuestionsPage;
