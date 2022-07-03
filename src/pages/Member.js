import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, FormGroup, Input, Label, Row, Col } from "reactstrap";
import CustomSpinner from "../component/CustomSpinner";
import useAuth from "../hooks/useAuth";
const axios = require("axios").default;

const Member = () => {
  const [data, setData] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    const user = auth.user;
    if (user) {
      let employee_id;

      if (user.permissions.includes("view-profile")) {
        employee_id = user.employee_id;
      } else if (user.permissions.includes("view-member")) {
        employee_id = id.split("/");
      }

      const fetchData = async () => {
        try {
          const res = await axios.get(
            `http://localhost:8080/api/employees/${employee_id}`,
            { headers: auth.authHeader() }
          );

          const resData = await res.data;
          setData(resData);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }
  }, []);

  return (
    <div className="container-class">
      {data ? (
        <Form>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="exampleEmployeeId">Employee ID</Label>
                <Input
                  id="exampleEmployeeId"
                  name="firstName"
                  placeholder="John"
                  type="text"
                  value={data.employeeId}
                  readOnly
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="exampleFirstName">First Name</Label>
                <Input
                  id="exampleFirstName"
                  name="firstName"
                  placeholder="John"
                  type="text"
                  value={data.firstName}
                  readOnly
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="exampleLastName">Last Name</Label>
                <Input
                  id="exampleLastName"
                  name="lastName"
                  placeholder="Doe"
                  type="text"
                  value={data.lastName}
                  readOnly
                />
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="exampleEmail">Email</Label>
                <Input
                  id="exampleEmail"
                  name="email"
                  type="email"
                  value={data.email}
                  readOnly
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="exampleState">Gender</Label>
                <Input
                  id="exampleGender"
                  name="select"
                  type="select"
                  value={data.gender}
                  readOnly
                >
                  <option>{data.gender}</option>
                </Input>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="exampleRole">Role</Label>
                <Input
                  id="exampleRole"
                  name="select"
                  type="select"
                  value={data.role}
                  readOnly
                >
                  <option>{data.role}</option>
                </Input>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="exampleStatus">Status</Label>
                <Input
                  id="exampleStatus"
                  name="select"
                  type="select"
                  value={data.status}
                  readOnly
                >
                  <option>{data.status}</option>
                </Input>
              </FormGroup>
            </Col>
          </Row>
        </Form>
      ) : (
        <div>
          {" "}
          <CustomSpinner />{" "}
        </div>
      )}
    </div>
  );
};

export default Member;
