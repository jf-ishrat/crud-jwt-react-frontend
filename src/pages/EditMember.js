import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, FormGroup, Input, Label, Row, Col } from "reactstrap";
import CustomSpinner from "../component/CustomSpinner";
import useAuth from "../hooks/useAuth";
const axios = require("axios").default;

const EditMember = () => {
  const [data, setData] = useState(null);
  const [permissions, setPermissions] = useState(null);
  const [permissionArr, setPermissionArr] = useState(null);
  const [permissionNames, setPermissionNames] = useState(null);
  const [checkedState, setCheckedState] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [gender, setGender] = useState(null);
  const [role, setRole] = useState(null);
  const [status, setStatus] = useState(null);

  const { id } = useParams();
  const auth = useAuth();

  useEffect(() => {
    const a = id.split("/");

    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/employees/${a[0]}`,
          { headers: auth.authHeader() }
        );
        setData(res.data);

        const newarr = res.data.permissions.map((item) => {
          return item.name;
        });
        setPermissionArr(newarr);

        const per = await axios.get(`http://localhost:8080/api/permissions`, {
          headers: auth.authHeader(),
        });
        setPermissions(per.data);

        const checkedArr = per.data.map((item) => {
          if (newarr.includes(item.name)) {
            return true;
          } else return false;
        });

        setCheckedState(checkedArr);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

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

  const handleCheckbox = (pos) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === pos ? !item : item
    );

    console.log("updatedCheckedState", updatedCheckedState);

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
    const a = id.split("/");
    const body = {
      employeeId: parseInt(a[0]),
      firstName: firstName || data.firstName,
      lastName: lastName || data.lastName,
      gender: gender || data.gender,
      email: data.email,
      role: role || data.role,
      status: status || data.status,
      Permissions: data.permissions,
    };

    const username = data.email;

    const permissionBody = {
      username,
      permissionNames,
    };

    console.log("body", body);

    console.log("permissionBody", permissionBody);

    const updateEmployeeAndPermission = async () => {
      try {
        const res = await axios.put(
          `http://localhost:8080/api/employees/${a[0]}`,
          body,
          { headers: auth.authHeader() }
        );
        const res1 = await axios.post(
          `http://localhost:8080/api/permissions/addtoemployee`,
          permissionBody,
          { headers: auth.authHeader() }
        );
      } catch (error) {
        console.log(error);
      }
    };

    updateEmployeeAndPermission();
  };

  return (
    <div className="container-class">
      {data ? (
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
                  value={firstName || data.firstName}
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
                  placeholder="Doe"
                  type="text"
                  value={lastName || data.lastName}
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
                  value={gender || data.gender}
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
                  value={role || data.role}
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
                  value={status || data.status}
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
                        name={item.name}
                        defaultChecked={permissionArr.includes(item.name)}
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

          <FormGroup check row>
            <Col
              sm={{
                offset: 2,
                size: 10,
              }}
            >
              <Button color="success" outline>
                Save Changes
              </Button>
            </Col>
          </FormGroup>

          {/* <Button color='success' outline>
  Save Changes
</Button> */}
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

export default EditMember;
