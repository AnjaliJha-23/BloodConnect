import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../../services/api";
import Loader from "../../components/Common/Loader";

function ProfileProtectedRoute({ children }) {

  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {

    const checkProfile = async () => {

      try {

        const token = localStorage.getItem("token");

        if (!token) {
          setAllowed(false);
          setLoading(false);
          return;
        }

        const res = await api.get("/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const user = res.data;

        const profileComplete =
          user.bloodGroup &&
          user.phone &&
          user.city &&
          user.state &&
          user.age &&
          user.gender;

        setAllowed(profileComplete);

      } catch (err) {

        console.log(err);
        setAllowed(false);

      } finally {

        setLoading(false);

      }

    };

    checkProfile();

  }, []);

  if (loading) {
  return <Loader text="Loading..." />;
}

  if (!allowed) {
    return <Navigate to="/profile" />;
  }

  return children;
}

export default ProfileProtectedRoute;