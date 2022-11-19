import Nav from "react-bootstrap/Nav";

const Header = () => {
  return (
    <Nav variant="pills" defaultActiveKey="/home">
      <Nav.Item>
        <Nav.Link href="/">Home</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/income-report">Income</Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default Header;
