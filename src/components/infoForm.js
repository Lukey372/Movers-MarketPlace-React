import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';

const InfoForm = () => {
  return (
    <>
      <Row
        style={{ borderBottom: '3px dashed var(--p-color)' }}
        className="pb-4 mt-5"
      >
        <Col className="mb-4" md={4}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Special Requests & Instructions:</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="We want you to have the best moving experience. Let us know if there's anything we can do to make your move day seamless."
              rows={4}
            />
          </Form.Group>
        </Col>
        <Col md={{ span: 4, offset: 2 }} className="">
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            <Form.Label>Phone number</Form.Label>
            <Form.Control type="text" placeholder="+0123456789" />
          </Form.Group>
        </Col>
      </Row>
    </>
  );
};

export default InfoForm;
