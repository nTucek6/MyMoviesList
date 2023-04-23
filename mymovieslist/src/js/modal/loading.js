import Modal from 'react-modal';
import { ThreeDots } from 'react-loader-spinner';

export default function CRUDLoading({loadingBar})
{
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: "20%",
        } 
}
   
    return(
        <Modal
        isOpen={loadingBar}
        style={customStyles}
        ariaHideApp={false}
         >
        <h2 className="text-center ">Adding to database</h2>
        <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="#4fa94d"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
            />
       
    </Modal>
    )


}