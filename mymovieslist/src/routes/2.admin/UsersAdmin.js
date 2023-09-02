import { useEffect, useRef, useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import LoadUsers from '../../js/UsersAdmin/loadUsers';
import GetUsersCount from '../../js/UsersAdmin/GetUsersCount';
import GetUsersRoles from '../../js/UsersAdmin/GetUsersRoles';
import ChangeUserRole from '../../js/UsersAdmin/ChangeUserRole';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UsersAdmin() {

    const [users, setUsers] = useState([]);
    const [usersCount, setUsersCount] = useState(null);
    const [usersRoles, setUsersRoles] = useState([]);

    const postPerPage = 5;
    const [search, setSearch] = useState(null);
    const [page, setPage] = useState(1);
    const [isCompleted, setIsCompleted] = useState(false);

    const shouldLoadData = useRef(true);

    useEffect(() => {
        if (shouldLoadData.current) {
            shouldLoadData.current = false;
            GetUsersCount({ setUsersCount });
            LoadUsers({ users, setUsers, setIsCompleted, postPerPage, page, search });
            GetUsersRoles({setUsersRoles});
        }
        else if (page > 1) {
            LoadUsers({ users, setUsers, setIsCompleted, postPerPage, page, search });
        }
        else if (search != null) {
            setTimeout(() => {
                LoadUsers({ users, setUsers, setIsCompleted, postPerPage, page, search });
            }, 400);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, search]);


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
        if (usersCount === users.length) {
            return (<button onClick={LoadMore} type="button" className="btn btn-danger" disabled>Load More</button>);
        }
        else {
            return (<button onClick={LoadMore} type="button" className="btn btn-danger">Load More</button>)
        }
    }

    const GetDefaultValue = (userRole) =>
    {
        let roleId = 0;
        usersRoles.map(role=> 
            {
                if(role.roleName === userRole)
                {
                    roleId = role.id;
                }

            });
        return roleId;
    }

    const handleRoleChange = (UserId,RoleId) =>
    {
        ChangeUserRole({UserId,RoleId,notify});
    }

    const notify = () => toast("User role changed");

    return (
        <>
            <div className="container">
            <div className="row" >
                    <div className="form-group col-xs-3 col-md-3">
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
                                        <td>
                                            <select className="form-select" 
                                                    defaultValue={GetDefaultValue(user.role)}
                                                    onChange={e =>handleRoleChange(user.id,e.target.value)} 
                                                    aria-label="Roles select">
                                               {usersRoles.map(role=>
                                                {
                                                    if(role.roleName === user.role)
                                                    {
                                                        return( <option key={role.id} value={role.id} >{role.roleName}</option>)
                                                    }
                                                    else
                                                    {
                                                        return( <option key={role.id} value={role.id}>{role.roleName}</option>)
                                                    }
                                                })}   
                                            </select>
                                        </td>
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
            <ToastContainer
               position="top-center"
               autoClose={1500}
               hideProgressBar={false}
               newestOnTop={true}
               rtl={false}
               pauseOnFocusLoss
               draggable = {false}
               pauseOnHover={false}
            />
        </>
    );
}