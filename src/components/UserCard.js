import React from "react";
import { Card, Button } from "react-bootstrap";

const UserCard = ({ user }) => {
  return (
    <Card className="mb-3 shadow-lg">
      <Card.Img variant="top" src={user.avatar} alt={`${user.first_name} ${user.last_name}`} />
      <Card.Body>
        <Card.Title>{user.first_name} {user.last_name}</Card.Title>
        <Card.Text>{user.email}</Card.Text>
        <Button variant="primary">Edit</Button>
        <Button variant="danger" className="ms-2">Delete</Button>
      </Card.Body>
    </Card>
  );
};

export default UserCard;
