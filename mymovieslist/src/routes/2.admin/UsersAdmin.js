import { useEffect, useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import LoadUsers from '../../js/UsersAdmin/loadUsers';
import GetUsersCount from '../../js/UsersAdmin/GetUsersCount';

export default function UsersAdmin() {

    const [users, setUsers] = useState([]);
    const [usersCount, setUsersCount] = useState(null);
    const postPerPage = 10;
    const [search, setSearch] = useState(null);
    const [page, setPage] = useState(1);
    const [isCompleted, setIsCompleted] = useState(false);

    useEffect(() => {
        GetUsersCount({setUsersCount});
       // setUsersCount(GetUsersCount());
        LoadUsers({ users, setUsers, setIsCompleted, postPerPage, page, search });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        LoadUsers({ users, setUsers, setIsCompleted, postPerPage, page, search });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    useEffect(() => {
        setTimeout(() => {
            LoadUsers({ users, setUsers, setIsCompleted, postPerPage, page, search });
        }, 400);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    const LoadMore = () => {
       
            setIsCompleted(false);
            setPage(page + 1);
        
    
    }

    const Search = (data) => {
        setUsers([]);
        setSearch(data);
        setPage(1);
    }

    const LoadMoreButton = () => {
        if(usersCount === users.length)
        {
            return (<button onClick={LoadMore} type="button" className="btn btn-danger" disabled>Load More</button>);
        }
        else
        {
            return (<button onClick={LoadMore} type="button" className="btn btn-danger">Load More</button>)
        }
    }

    return (
        <>
            <div className="container">
                <input type="search" className="form-control w-25 mb-2 d-flex justify-content-center" placeholder="Search..." onChange={s => Search(s.target.value)} />
                <div className="table-responsive">
                    <table className="table table-bordered table-hover table-condensed table-striped">
                        <thead>
                            <tr>
                                <th>Rbr.</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Change role</th>
                            </tr>
                        </thead>

                        <tbody>
                            {users.map((user, index) => {
                                return (
                                    <tr key={user.id}>
                                        <td>{index + 1}</td>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td><button className="btn">{user.role}</button></td>
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
            </div>
        </>
    );
}