import Select from 'react-select'
import { useEffect, useState } from 'react';
import UpdatePerson from './UpdatePerson';


const PersonModalData = ({ setIsOpen }) => {

    const [FirstName, setFirstName] = useState(null);
    const [LastName, setLastName] = useState(null);
    const [BirthDate, setBirthDate] = useState(null);
    const [BirthPlace, setBirthPlace] = useState(null);
    const [PersonImageURL, setPersonImageURL] = useState(null);
 
    useEffect(() =>
    {
        setPersonImageURL("dsds")
    }, []);


    const handleSubmit = async e => {
        e.preventDefault();
        setIsOpen(false);
        await UpdatePerson({
            FirstName,
            LastName,
            BirthDate,
            BirthPlace,
            PersonImageURL
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
                   <input type="file" className="form-control" />
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