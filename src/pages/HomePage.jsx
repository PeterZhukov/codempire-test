import React, { Component } from "react";
import { Row, Col, Button } from "react-bootstrap";

class HomePage extends Component {
  beginTest = () => {
    this.props.history.push("/questions");
  };
  render() {
    return (
      <Row className="min-vh-100">
        <Col className="flex-grow-1 align-self-center ta-center">
          <Button variant="primary" onClick={this.beginTest}>
            Начать тест
          </Button>
        </Col>
      </Row>
    );
  }
}

export default HomePage;
