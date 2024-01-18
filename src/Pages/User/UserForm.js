import { useState, useEffect } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "../../ReduxToolkit/Store/Store";
import { postUser } from "../UserAuth/UserAuth";
import { useNavigate, useLocation, useHistory } from "react-router-dom";
import Table from "../component/Table/Table";

function BasicExample() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [formData, setForm] = useState({ email: "", password: "" });
  const handleInput = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const formSubmission = (event) => {
    event.preventDefault();
    dispatch(postUser(formData));
    console.log(formData);
  };
  const token = localStorage.getItem("jwt_Token");
  
  useEffect(() => {
    if (token) {
      return navigate("/Table");
    }
  }, []);

  // if (token) {
  //   return navigate("/Table");
  // }

  return (
    <Container
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#EAE6DF",
      }}
    >
      <Container style={{ borderRadius: "5px", backgroundColor: "white" }}>
        <Form
          onSubmit={formSubmission}
          style={{
            backgroundColor: "white",
            borderRadius: "5px",
            margin: "10px",
          }}
        >
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Row>
                  <Form.Label>Email address</Form.Label>
                </Row>
                <Row>
                  <Form.Control
                    onChange={handleInput}
                    type="email"
                    name="email"
                    placeholder="Enter email"
                  />
                </Row>
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Row>
                  <Form.Label>Password</Form.Label>
                </Row>
                <Form.Control
                  onChange={handleInput}
                  type="password"
                  name="password"
                  placeholder="Password"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </Container>
  );
}

export default BasicExample;
