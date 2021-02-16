import React from 'react';
import './style.css'
import { Row } from 'reactstrap';

export default function Header() {
    return (
        <div>
            <Row className="justify-content-center mt-4 mb-3">
                <span className="badge badge-primary p-2" style={{ backgroundColor: "#ee4d2d" }}>Pokemon List</span>
            </Row>
            <div className="mb-2">
                <hr style={{ border: "1px solid #ee4d2d" }} />
            </div>
        </div>
    )
}
