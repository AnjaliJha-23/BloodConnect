import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { isProfileComplete } from "../../utils/profileComplete";
import "./RequestBlood.css";

function RequestBlood() {

    const [formData,setFormData] = useState({

        patientName:"",
        bloodGroup:"",
        hospital:"",
        city:"",
        units:"",
        contact:"",
        urgency:"Normal",
        message:""

    });
    useEffect(() => {

    const fetchProfile = async () => {

        const token = localStorage.getItem("token");

        const res = await api.get("/users/profile", {
            headers:{
                Authorization:`Bearer ${token}`
            }
        });

        setUser(res.data);

        if (!isProfileComplete(res.data)) {

    alert("Please complete your profile first.");

    navigate("/profile");

    return;

}

    };

    fetchProfile();

}, []);

    const handleChange=(e)=>{

        setFormData({

            ...formData,

            [e.target.name]:e.target.value

        });

    };

    const handleSubmit = async(e)=>{

        e.preventDefault();

        try{

            const token = localStorage.getItem("token");

            await api.post(

                "/requests",

                formData,

                {

                    headers:{

                        Authorization:`Bearer ${token}`

                    }

                }

            );

            alert("Blood Request Submitted Successfully!");

            setFormData({

                patientName:"",
                bloodGroup:"",
                hospital:"",
                city:"",
                units:"",
                contact:"",
                urgency:"Normal",
                message:""

            });

        }

        catch(err){

            alert("Error Submitting Request");

        }

    };

    return(

        <div className="request-container">

            <div className="request-card">

                <h2>Emergency Blood Request</h2>

                <form onSubmit={handleSubmit}>

                    <input
                    name="patientName"
                    placeholder="Patient Name"
                    value={formData.patientName}
                    onChange={handleChange}
                    />

                    <select
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                    >

                        <option value="">Blood Group</option>

                        <option>A+</option>
                        <option>A-</option>
                        <option>B+</option>
                        <option>B-</option>
                        <option>AB+</option>
                        <option>AB-</option>
                        <option>O+</option>
                        <option>O-</option>

                    </select>

                    <input
                    name="hospital"
                    placeholder="Hospital"
                    value={formData.hospital}
                    onChange={handleChange}
                    />

                    <input
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                    />

                    <input
                    type="number"
                    name="units"
                    placeholder="Units Required"
                    value={formData.units}
                    onChange={handleChange}
                    />

                    <input
    type="tel"
    name="contact"
    placeholder="Contact Number"
    value={formData.contact}
    onChange={(e) => {
        const value = e.target.value.replace(/\D/g, "");
        if (value.length <= 10) {
            setFormData({
                ...formData,
                contact: value,
            });
        }
    }}
    maxLength={10}
    inputMode="numeric"
    pattern="[0-9]{10}"
    required
/>

                    <select
                    name="urgency"
                    value={formData.urgency}
                    onChange={handleChange}
                    >

                        <option>Normal</option>
                        <option>Urgent</option>
                        <option>Critical</option>

                    </select>

                    <textarea

                    name="message"

                    placeholder="Additional Details"

                    value={formData.message}

                    onChange={handleChange}

                    />
                    

                    <button>

                        Submit Request

                    </button>

                </form>

            </div>

        </div>

    );

}

export default RequestBlood;