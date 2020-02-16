import React, { Component } from "react";
import { Form } from "react-bootstrap";

class QuestionsPage extends Component {
  state = {};
  render() {
    return (
      <div>
        <h1>Тестовые вопросы</h1>
        <Form>
          {this.props.questions.map(value => (
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
          ))}
        </Form>
      </div>
    );
  }
}

export default QuestionsPage;
