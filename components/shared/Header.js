import React, { Component, Fragment } from 'react';
import Link from 'next/link';

// export default class Header extends Component {
//   render() {
//     return (
//       <Fragment>

//         <Link href="/blogs">
//           <a>Blogs</a>
//         </Link>
//         <Link href="/portfolios">
//           <a>Porfolio</a>
//         </Link>
//         <Link href="/cv">
//           <a>CV</a>
//         </Link>
//         <style jsx>
//           {`
//             a {
//               font-size: 20px;
//               margin: 0 5px;
//             }
//           `}
//         </style>
//       </Fragment>
//     );
//   }
// }

// import React from 'react';
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
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
