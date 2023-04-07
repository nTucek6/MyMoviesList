import GetDiscussions from "../../js/Discussions/GetDiscussions";
import ShowModal from '../../js/modal/modal';
import customStyles from "../../js/MoviesAdmin/customStyles";
import DiscussionModalData from "../../js/Discussions/DiscussionModalData";
import { useState } from "react";

export default function Discussions() {

    const [modalIsOpen, setIsOpen] = useState(false);

    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
    }

    return (
        <>
            <div className="container">
                <div className="text-center">
                    <button className="btn btn-info" onClick={openModal}>Add discussion</button>
                </div>
                <hr />
                <div className="row row-cols-3 text-center mt-5">
                    <GetDiscussions />
                </div>
            </div>

            <ShowModal modalIsOpen={modalIsOpen} closeModal={closeModal} customStyles={customStyles} ModalData={() => DiscussionModalData({ setIsOpen })} text={"Create discussion"} />
        </>
    );
}