import { Container, Row, Col } from "react-bootstrap"

function HomePage() {
    return (
        <Container className="text-center">
            <Row>
                <Col>
                    <h1 className="display-4 shadow rounded-3 p-3">Welcome to the E-commerce API App</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <p className="m-4 bg-light p-5 rounded-3">Explore the app by creating customers, products, and even an order for a specific customer!</p>
                </Col>
            </Row>
        </Container>
    )
}

export default HomePage