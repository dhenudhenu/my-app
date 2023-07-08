import React from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { Container, Row, Col, Pagination, Card, Form, Button } from 'react-bootstrap';

export default function Search() {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        defaultValues: {
            searchBy: "title",
            geoLocation: "",
            medium: "",
            isOnView: false,
            isHighlight: false,
            q: ""
        }
    });

    const onSubmit = (data) => {
        let queryString = "";
        queryString += `${data.searchBy}=true`;
        queryString += data.geoLocation && `&geoLocation=${encodeURIComponent(data.geoLocation)}`;
        queryString += data.medium && `&medium=${encodeURIComponent(data.medium)}`;
        queryString += `&isOnView=${encodeURIComponent(data.isOnView)}`;
        queryString += `&isHighlight=${encodeURIComponent(data.isHighlight)}`;
        queryString += `&q=${encodeURIComponent(data.q)}`;

        router.push(`artwork?${queryString}`);
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: '20px' }}>
            <Row>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Label>Search Query</Form.Label>
                        <Form.Control type="text" placeholder="" name="q" {...register("q", { required: true })} />
                        {errors.q && <span className="is-invalid">This field is required</span>}
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col md={4}>
                    <Form.Label>Search By</Form.Label>
                    <Form.Select name="searchBy" className="mb-3" {...register("searchBy")}>
                        <option value="title">Title</option>
                        <option value="tags">Tags</option>
                        <option value="artistOrCulture">Artist or Culture</option>
                    </Form.Select>
                </Col>
                <Col md={4}>
                    <Form.Group className="mb-3">
                        <Form.Label>Geo Location</Form.Label>
                        <Form.Control type="text" placeholder="" name="geoLocation" {...register("geoLocation")} />
                        <Form.Text className="text-muted">
                            Case Sensitive String (e.g., "Europe", "France", "Paris", "China", "New York", etc.), with multiple values separated by the | operator
                        </Form.Text>
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group className="mb-3">
                        <Form.Label>Medium</Form.Label>
                        <Form.Control type="text" placeholder="" name="medium" {...register("medium")} />
                        <Form.Text className="text-muted">
                            Case Sensitive String (e.g., "Ceramics", "Furniture", "Paintings", "Sculpture", "Textiles", etc.), with multiple values separated by the | operator
                        </Form.Text>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Check
                        type="checkbox"
                        label="Highlighted"
                        name="isHighlight"
                        {...register("isHighlight")}
                    />
                    <Form.Check
                        type="checkbox"
                        label="Currently on View"
                        name="isOnView"
                        {...register("isOnView")}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <br />
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Col>
            </Row>
        </Form>
    )
}
