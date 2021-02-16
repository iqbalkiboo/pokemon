import React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

export default function ModalDetail(props) {
    const { modal, toggle, data } = props

    return (
        <div>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Evolutions</ModalHeader>
                <ModalBody>
                    <img src={`https://pokeres.bastionbot.org/images/pokemon/${data}.png`} className="img-fluid" alt="Show Detail Images" />
                </ModalBody>
            </Modal>
        </div>
    )
}
