import { useEffect, useState } from "react";
import { Button, Form, FormGroup, Input, Label, Row, Col } from "reactstrap";
import useAuth from "../hooks/useAuth";
const axios = require("axios").default;

const AddMember = () => {
  const [permissions, setPermissions] = useState(null);
  const [permissionNames, setPermissionNames] = useState(null);
  const [checkedState, setCheckedState] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("Male");
  const [role, setRole] = useState("Member");
  const [status, setStatus] = useState("Full-time");

  const auth = useAuth();

  const onChangeFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const onChangeLastName = (e) => {
    setLastName(e.target.value);
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangeGender = (e) => {
    setGender(e.target.value);
  };
  const onChangeRole = (e) => {
    setRole(e.target.value);
  };

  const onChangeStatus = (e) => {
    setStatus(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const per = await axios.get(`http://localhost:8080/api/permissions`, {
          headers: auth.authHeader(),
        });
        setPermissions(per.data);
        setCheckedState(new Array(per?.data.length).fill(false));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleCheckbox = (pos) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === pos ? !item : item
    );

    setCheckedState(updatedCheckedState);

    const permissionArray = new Array();
    updatedCheckedState.map((currentState, index) => {
      if (currentState === true) {
        permissionArray.push(permissions[index].name);
      }
    });
    setPermissionNames(permissionArray);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      firstName: firstName,
      lastName: lastName,
      gender: gender,
      email: email,
      role: role,
      status: status,
      username: email,
      password: email,
      permissions: [],
    };
    const username = email;
    const permissionBody = {
      username,
      permissionNames,
    };

    const addEmployee = async () => {
      try {
        const res1 = await axios.post(
          "http://localhost:8080/api/employees",
          body,
          { headers: auth.authHeader() }
        );
        const res2 = await axios.post(
          `http://localhost:8080/api/permissions/addtoemployee`,
          permissionBody,
          { headers: auth.authHeader() }
        );
      } catch (error) {
        console.log(error);
      }
    };
    addEmployee();
  };

  return (
    <div className="container-class">
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="exampleFirstName">First Name</Label>
              <Input
                id="exampleFirstName"
                name="firstName"
                placeholder="John"
                type="text"
                required
                value={firstName}
                onChange={onChangeFirstName}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="exampleLastName">Last Name</Label>
              <Input
                id="exampleLastName"
                name="lastName"
                required
                placeholder="Doe"
                type="text"
                value={lastName}
                onChange={onChangeLastName}
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
                required
                value={email}
                onChange={onChangeEmail}
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
                value={gender}
                onChange={onChangeGender}
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
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
                value={role}
                onChange={onChangeRole}
              >
                <option>Member</option>
                <option>Moderator</option>
                <option>Admin</option>
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
                value={status}
                onChange={onChangeStatus}
              >
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Intern</option>
              </Input>
            </FormGroup>
          </Col>
        </Row>
        {permissions ? (
          <Row>
            <Label for="checkbox2" sm={2}>
              Set permissions
            </Label>
            {permissions.map((item, ind) => (
              <FormGroup row key={item.id}>
                <Col
                  sm={{
                    size: 10,
                  }}
                >
                  <FormGroup check>
                    <Input
                      id={`checkbox${item.id}`}
                      type="checkbox"
                      value={item.name}
                      onChange={(e) => handleCheckbox(ind)}
                    />
                    {""}
                    <Label check>{item.name}</Label>
                  </FormGroup>
                </Col>
              </FormGroup>
            ))}
          </Row>
        ) : null}
        <Button color="success" outline>
          Add New Employee
        </Button>
      </Form>
    </div>
  );
};

export default AddMember;
