import { useEffect, useState } from 'react';
import UpdatePerson from './UpdatePerson';
import previewImage from '../../img/preview.jpg';


const PersonModalData = ({ setIsOpen }) => {

    const [FirstName, setFirstName] = useState(null);
    const [LastName, setLastName] = useState(null);
    const [BirthDate, setBirthDate] = useState(null);
    const [BirthPlace, setBirthPlace] = useState(null);

    const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState()

    const imageStyle = {
        height:"400px",
        width:"300px",
    }

  

    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])


    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }
        setSelectedFile(e.target.files[0])
    }

    const handleSubmit = async e => {
        e.preventDefault();
        setIsOpen(false);
        await UpdatePerson({
            FirstName,
            LastName,
            BirthDate,
            BirthPlace,
            selectedFile
        }).then(function (response) {
        });
    }


    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-2">
                    <input type="text" placeholder="FirstName" className="form-control" onChange={d => setFirstName(d.target.value)} />
                </div>

                <div className="form-group mb-2">
                    <input type="text" className="form-control" placeholder="LastName" onChange={d => setLastName(d.target.value)} />
                </div>

                <div className="form-group mb-2">
                    <input type="date" className="form-control" placeholder="Birth date" onChange={d => setBirthDate(d.target.value)} />
                </div>

                <div className="form-group mb-2">
                    <input type="text" className="form-control" placeholder="Birth place" onChange={d => setBirthPlace(d.target.value)} />
                </div>

                <div className="form-group mb-2">
                   <input type="file" className="form-control" onChange={onSelectFile} />
                </div>

                <div className='d-flex justify-content-center'>
                  {(preview !== undefined) ?   <img src={preview} style={imageStyle} alt='preview' /> : <img src={previewImage} style={imageStyle} alt='preview' />}
                </div>


                <div className="mt-2 d-flex flex-row-reverse">
                    <button type="submit" className="btn btn-outline-info mt-3 p-2">Add person</button>
                    <button className="btn btn-outline-danger mt-3 p-2" onClick={() => setIsOpen(false)}>Close</button>
                </div>
            </form>
          
        </>
    );
}

    export default PersonModalData