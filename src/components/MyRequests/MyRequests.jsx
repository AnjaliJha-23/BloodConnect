import { useEffect, useState } from "react";
import api from "../../services/api";

function MyRequests() {

    const [requests, setRequests] = useState([]);

    useEffect(() => {

        const fetchMyRequests = async () => {

            try {

                const token = localStorage.getItem("token");

                const res = await api.get("/requests/mine", {

                    headers: {

                        Authorization: `Bearer ${token}`

                    }

                });

                setRequests(res.data);

            }

            catch(err){

                console.log(err);

            }

        };

        fetchMyRequests();

    }, []);

    return (

        <div>

            <h2>My Blood Requests</h2>

            {

                requests.length===0 ?

                <p>No Requests Found</p>

                :

                requests.map((r)=>(

                    <div key={r._id}>

                        <h4>{r.patientName}</h4>

                        <p>{r.bloodGroup}</p>

                        <p>{r.city}</p>

                        <p>Status : {r.status}</p>

                        <p>Responses : {r.responses.length}</p>

                    </div>

                ))

            }

        </div>

    );

}

export default MyRequests;