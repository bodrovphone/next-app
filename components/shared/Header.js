import React, { Component, Fragment } from 'react';
import Link from 'next/link';
import auth0Client from '../../services/auth0';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

const BsNavLink = ({ href, title }) => (
  <NavItem className="port-navbar-item">
    <Link href={href}>
      <a className="nav-link port-navbar-link">{title}</a>
    </Link>
  </NavItem>
);

const Login = () => (
  <span
    onClick={auth0Client.Login}
    className="nav-link port-navbar-link clickable"
  >
    Login
  </span>
);
const Logout = () => (
  <span
    className="nav-link port-navbar-link clickable"
    onClick={() => logout()}
  >
    {' '}
    Logout{' '}
  </span>
);

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
  }
  render() {
    return (
      <div>
        <Navbar
          className="port-navbar port-default absolute"
          color="transparent"
          light
          expand="md"
        >
          <NavbarBrand className="port-navbar-brand" href="/">
            Oleksandr Bodrov
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <BsNavLink href="/" title="Home" />
              <BsNavLink href="/about" title="About" />
              <BsNavLink href="/portfolios" title="Portfolio" />
              <BsNavLink href="/cv" title="Blog" />
              {!isAuthenticated ? (
                <NavItem className="port-navbar-item">
                  <Login />
                </NavItem>
              ) : (
                <NavItem className="port-navbar-item">
                  <Logout />
                </NavItem>
              )}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
