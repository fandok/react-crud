import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const UserForm = () => {
  const params = useParams();
  const id = params.id;
  const navigation = useNavigate();
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });

  const { first_name, last_name, email } = userData;

  useEffect(() => {
    const fetchUserById = () => {
      fetch(`https://reqres.in/api/users/${id}`)
        .then((response) => response.json())
        .then((dataResponse) => {
          setUserData({ ...dataResponse.data });
        });
    };

    if (id) {
      fetchUserById();
    }
  }, [id]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    let method = "POST";
    let url = "https://reqres.in/api/users";
    if (id) {
      method = "PUT";
      url += `/${id}`;
    }

    fetch(url, { method, body: JSON.stringify(userData) })
      .then((response) => response.json)
      .then(() => {
        console.log("Data berhasil diubah");
        navigation("/");
      });
  };

  return (
    <Container fluid className="p-4">
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            name="first_name"
            value={first_name}
            placeholder="Masukkan first name"
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="last_name"
            value={last_name}
            placeholder="Masukkan last name"
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={email}
            placeholder="Masukkan email"
            onChange={onChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default UserForm;
