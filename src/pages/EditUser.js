import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import axios from "axios";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({ first_name: "", last_name: "", email: "", avatar: "" });

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await axios.get(`https://reqres.in/api/users/${id}`);
      setUser(response.data.data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://reqres.in/api/users/${id}`, user);
      navigate("/users");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <Container>
      <h2>Edit User</h2>
      <img src={user.avatar} alt="User Avatar" width="100" className="mb-3" />
      <Form onSubmit={handleSubmit}>
        <Form.Control name="first_name" value={user.first_name} onChange={handleChange} />
        <Form.Control name="last_name" value={user.last_name} onChange={handleChange} />
        <Form.Control name="email" value={user.email} onChange={handleChange} />
        <Button type="submit" className="mt-3">Save</Button>
      </Form>
    </Container>
  );
};

export default EditUser;
