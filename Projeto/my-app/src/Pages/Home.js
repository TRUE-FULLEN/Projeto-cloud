import Form from 'react-bootstrap/Form';

function Home() {
  return (
    <div class="home">
      <h1>Welcome to My App</h1>
      <p>This is the home page of my app.</p>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
      </Form>

    </div>
  );
}   

export default Home;    