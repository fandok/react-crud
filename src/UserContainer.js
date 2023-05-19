import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import User from "./User";
import { Link } from "react-router-dom";

const UserContainer = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://reqres.in/api/users")
      .then((response) => response.json())
      .then((dataResponse) => {
        setUsers(dataResponse.data);
      });
  }, []);

  const createCard = (userProps) => (
    <Col xs={4}>
      <User {...userProps} />
    </Col>
  );

  const createRow = (rows) => (
    <Row key={`${Math.random()}+${Date.now()}`}>
      {rows.map((i) => createCard(Object.assign(i, { key: i.id })))}
    </Row>
  );

  const contents = [];
  for (let i = 0; i < users.length; i += 3) {
    contents.push(users.slice(i, i + 3));
  }

  return (
    <Container fluid className="p-4">
      <Row className="text-end mb-1">
        <Col>
          <Link to="/add">
            <Button variant="light">+ Tambah</Button>
          </Link>
        </Col>
      </Row>
      {contents.map((i) => createRow(i))}
    </Container>
  );
};

export default UserContainer;
