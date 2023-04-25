import ShowModal from '../../js/modal/modal';
import PersonModalData from '../../js/PersonAdmin/addPersonData';
import { useEffect, useState, useRef } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import customStyles from '../../js/PersonAdmin/customStyles';
import LoadPeople from '../../js/PersonAdmin/LoadPeople';
import GetPeopleCount from '../../js/PersonAdmin/GetPeopleCount';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { format } from 'date-fns'
import CRUDLoading from '../../js/modal/loading';

export default function PersonAdmin() {
    const [people, setPeople] = useState([]);
    const [peopleCount, setPeopleCount] = useState(null);

    const [person, setPerson] = useState(null);

    const postPerPage = 5;
    const [search, setSearch] = useState(null);
    const [page, setPage] = useState(1);
    const [isCompleted, setIsCompleted] = useState(false);

    const [modalIsOpen, setIsOpen] = useState(false);
    const [loadingBar, setLoadingBar] = useState(false);

    const shouldLoadData = useRef(true);

    const [text, setText] = useState(null);

    useEffect(() => {
        if (shouldLoadData.current) {
            shouldLoadData.current = false;
            GetPeopleCount({ setPeopleCount });
            LoadPeople({ people, setPeople, setIsCompleted, postPerPage, page, search });
        }
        else if (page > 1) {
            LoadPeople({ people, setPeople, setIsCompleted, postPerPage, page, search });
        }
        else if (search !== null) {
             setTimeout(() => {
                  LoadPeople({ people, setPeople, setIsCompleted, postPerPage, page, search });
                }, 400); 

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, search]);

    /* useEffect(() => {
        // LoadPeople({ people, setPeople, setIsCompleted, postPerPage, page, search });
         // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [page]);
 
     useEffect(() => {
 
         setTimeout(() => {
          // LoadPeople({ people, setPeople, setIsCompleted, postPerPage, page, search });
         }, 400);
         // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [search]); */

    const Search = (data) => {
        setPeople([]);
        setSearch(data);
        setPage(1);
    }

    const LoadMore = () => {
        setIsCompleted(false);
        setPage(page + 1);
    }

    function closeModal() {
        setIsOpen(false);
    }


    function openModal() {
        setText("Add new person");
        setPerson(null)
        setIsOpen(true);
    }

    const LoadMoreButton = () => {
        console.log(peopleCount);
        if (peopleCount === people.length) {
            return <button type="button" className="btn btn-danger" disabled>Load More</button>;
        }
        else {
            return <button onClick={LoadMore} type="button" className="btn btn-danger" >Load More</button>;
        }
    }

    function UpdatePersonModal(person) {
        setText("Update person");
        setPerson(person);
        setIsOpen(true);
    }


    return (
        <>
            <div className="container">

                <div className="row" >
                    <div className="form-group col-xs-3 col-md-3">
                        <button className="btn btn-primary " onClick={openModal}>Add person</button>
                    </div>
                    <div className="col-sm-1"></div>
                    <div className="form-group col-xs-3 col-md-4">
                        <input type="search" className="form-control mb-2" placeholder="Search..." onChange={s => Search(s.target.value)} />
                    </div>

                </div>

                <div className="table-responsive">
                    <table className="table table-bordered table-hover table-condensed table-striped">
                        <thead>
                            <tr>
                                <th>Rbr.</th>
                                <th>FirstName</th>
                                <th>LastName</th>
                                <th>Birth date</th>
                                <th>Birth place</th>
                                <th>Image</th>
                                <th>Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {people.map((p, index) => {
                                return (
                                    <tr key={p.id}>
                                        <td>{index + 1}</td>
                                        <td>{p.firstName}</td>
                                        <td>{p.lastName}</td>
                                        <td>{format(new Date(p.birthDate), 'dd/MM/yyyy')}</td>
                                        <td>{p.birthPlace}</td>
                                        <td><img alt='' height={50} width={50} src={"data:image/png;base64," + p.personImageData} /></td>
                                        <td><button className='btn' onClick={() => UpdatePersonModal(p)}><FontAwesomeIcon icon={faPenToSquare} /></button></td>
                                    </tr>
                                )
                            })
                            }
                        </tbody>
                    </table>
                </div>
                <div className="d-flex justify-content-center">
                    {isCompleted ? (
                        <LoadMoreButton />
                    ) : (
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
                    )}
                </div>
                <ShowModal modalIsOpen={modalIsOpen} closeModal={closeModal} customStyles={customStyles} ModalData={() => PersonModalData({ setIsOpen, setLoadingBar, person })} text={text} />
                <CRUDLoading loadingBar={loadingBar} />

            </div>
        </>
    );
}