import Modal from 'react-modal';

export default function YesNoDialog({ isOpen, onRequestClose, onYesClick, onNoClick })  {

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: "40%",
        } 
}

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Yes or No Dialog"
            ariaHideApp={false}
            style={customStyles}
        >
            <h2>There is a movie with same name. Do you wish to continue?</h2>
            <div className='row mt-2'>
            <button className='btn btn-info col' onClick={onYesClick}>Yes</button>
            <button className='btn btn-danger col' onClick={onNoClick}>No</button>  
            </div>
            
        </Modal>
    );
};
