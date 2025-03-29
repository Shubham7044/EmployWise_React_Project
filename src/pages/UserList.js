import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Container, Row, Col, Form } from "react-bootstrap";
import axios from "axios";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`https://reqres.in/api/users?page=${page}`);
      setUsers(response.data.data);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`https://reqres.in/api/users/${id}`);
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const filteredUsers = users.filter(user =>
    user.first_name.toLowerCase().includes(search.toLowerCase()) ||
    user.last_name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container>
      <h2 className="mt-3">User List</h2>
      <Form.Control
        type="text"
        placeholder="Search Users..."
        className="mb-3"
        onChange={(e) => setSearch(e.target.value)}
      />
      <Row>
        {filteredUsers.map(user => (
          <Col key={user.id} md={4} className="mb-3">
            <Card>
              <Card.Img variant="top" src={user.avatar} />
              <Card.Body>
                <Card.Title>{user.first_name} {user.last_name}</Card.Title>
                <Card.Text>{user.email}</Card.Text>
                <Link to={`/edit/${user.id}`} className="btn btn-warning me-2">Edit</Link>
                <Button variant="danger" onClick={() => deleteUser(user.id)}>Delete</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <div className="d-flex justify-content-between mt-3">
        <Button disabled={page === 1} onClick={() => setPage(page - 1)}>Prev</Button>
        <span>Page {page} of {totalPages}</span>
        <Button disabled={page >= totalPages} onClick={() => setPage(page + 1)}>Next</Button>
      </div>
    </Container>
  );
};

export default UserList;
