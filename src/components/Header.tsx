import Nav from 'react-bootstrap/Nav';

const Header = () => {
  return (
     <Nav variant="pills" defaultActiveKey="/home">
      <Nav.Item>
        <Nav.Link href="/">Home</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/income-report">Income</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/daily-report">Daily Report</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/monthly-report">Monthly Report</Nav.Link>
      </Nav.Item>
    </Nav>
  )
}

export default Header