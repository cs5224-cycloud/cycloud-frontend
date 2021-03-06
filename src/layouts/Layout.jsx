import React, { useEffect, useState } from "react";
import {
  Route,
  Link,
  Redirect,
  Switch,
  useHistory,
  withRouter,
} from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Home } from "../pages";

export default function Layout() {
  return (
    <React.Fragment>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="/">Cycloud</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#link">Link</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Container fluid>
        <Route exact path="/" component={Home} />
      </Container>
    </React.Fragment>
  );
}
