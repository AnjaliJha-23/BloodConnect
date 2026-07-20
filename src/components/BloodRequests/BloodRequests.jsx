import { useEffect, useState } from "react";
import api from "../../services/api";
import "./BloodRequests.css";

function BloodRequests() {

    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch all active requests
    const fetchRequests = async () => {

        try {

            const res = await api.get("/requests");

            setRequests(res.data);

        } catch (err) {

            console.log(err);

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {

        fetchRequests();

    }, []);

    // Respond to a blood request
    const handleRespond = async (id) => {

        try {

            await api.put(
                `/requests/${id}/respond`,
                {},
                {
                    headers: {
                        Authorization:
                            `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            alert("Response Sent Successfully ❤️");

            // Refresh requests after responding
            fetchRequests();

        } catch (err) {

            alert(err.response?.data?.message || "Failed");

        }

    };

    if (loading) {

        return <h2>Loading Requests...</h2>;

    }

    return (

        <section className="blood-requests">

            <h2>🩸 Active Blood Requests</h2>

            <div className="request-grid">

                {requests.map((request) => (

                    <div className="request-card" key={request._id}>

                        <h3>{request.patientName}</h3>

                        <p><strong>Blood:</strong> {request.bloodGroup}</p>

                        <p><strong>Hospital:</strong> {request.hospital}</p>

                        <p><strong>City:</strong> {request.city}</p>

                        <p><strong>Units:</strong> {request.units}</p>

                        <p><strong>Urgency:</strong> {request.urgency}</p>

                        <p><strong>Contact:</strong> {request.contact}</p>

                        <p>
                            <strong>Responses:</strong> {request.responses.length}
                        </p>

                        <button
                            className="respond-btn"
                            onClick={() => handleRespond(request._id)}
                        >
                            ❤️ I Can Donate
                        </button>

                    </div>

                ))}

            </div>

        </section>

    );

}

export default BloodRequests;