import { useEffect, useState } from 'react';
import UpdatePerson from './UpdatePerson';
import previewImage from '../../img/preview.jpg';
import { useNavigate } from 'react-router-dom';

const PersonModalData = ({ setIsOpen }) => {

    const [FirstName, setFirstName] = useState(null);
    const [LastName, setLastName] = useState(null);
    const [BirthDate, setBirthDate] = useState(null);
    const [BirthPlace, setBirthPlace] = useState(null);

    const [personImage, setPersonImage] = useState();
    const [preview, setPreview] = useState();

    const navigate = useNavigate();

    const imageStyle = {
        height:"400px",
        width:"300px",
    }

  
    useEffect(() => {
        if (!personImage) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(personImage)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [personImage])


    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setPersonImage(undefined)
            return
        }
        setPersonImage(e.target.files[0])
    }

    const handleSubmit = async e => {
        e.preventDefault();
        setIsOpen(false);

        const Person = new FormData();
        Person.append("FirstName", FirstName);
        Person.append("LastName", LastName);
        Person.append("BirthDate", BirthDate);
        Person.append("BirthPlace", BirthPlace);
        Person.append("PersonImage", personImage);

        await UpdatePerson({Person}).then(function (response) {
            navigate(0);
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