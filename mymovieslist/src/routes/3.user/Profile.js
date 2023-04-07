import GetUserBio from "../../js/Profile/UserBio";

export default function Profile() {
    const UserId = sessionStorage.getItem('ProfileId');
    
    return (
        <div className="container">
            <div className="row container m-0 p-0">
                <div className="col-3  border border-start-0 border-top-0 border-bottom-0 d-flex align-items-stretch">
                    <img src={null} />
                </div>

                <div className="col-9 ">
                 
                    <GetUserBio Id={UserId} />

                    <h6>Statistics</h6>
                    <hr className="mt-0" />
                    <div className="row">
                        <div className="col-6">
                            <h6 className="">Movies stats</h6>
                            <hr className="mt-0" />

                        </div>

                        <div className="col-6  ">
                            <h6 className="">Last update</h6>
                            <hr className="mt-0" />
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}