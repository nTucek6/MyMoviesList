import Modal from 'react-modal';

export default function ShowModal({ modalIsOpen, closeModal, customStyles, ModalData, text }) {
    return (<Modal
        isOpen={modalIsOpen}
        //onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
        contentLabel={text}>
        <h2 className="text-center ">{text}</h2>
        <ModalData />
    </Modal>)
}