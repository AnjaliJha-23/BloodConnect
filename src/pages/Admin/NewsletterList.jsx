import { useEffect, useState } from "react";
import api from "../../services/api";
import "./Newsletter.css";

function NewsletterList() {
  const [subscribers, setSubscribers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      const res = await api.get("/newsletter/subscribers");
      setSubscribers(res.data.subscribers);
    } catch (err) {
      console.log(err);
    }
  };

  const filteredSubscribers = subscribers.filter((subscriber) =>
    subscriber.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="newsletter-page">
      <div className="newsletter-header">
        <h2>📧 Newsletter Subscribers</h2>
      </div>

      <div className="newsletter-top">
        <div className="newsletter-card">
          <h1>{subscribers.length}</h1>
          <p>Total Subscribers</p>
        </div>

        <input
          type="text"
          placeholder="Search by email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="newsletter-search"
        />
      </div>

      <table className="newsletter-table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Subscribed On</th>
          </tr>
        </thead>

        <tbody>
          {filteredSubscribers.map((subscriber) => (
            <tr key={subscriber._id}>
              <td>{subscriber.email}</td>
              <td>
                {new Date(subscriber.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}

          {filteredSubscribers.length === 0 && (
            <tr>
              <td colSpan="2">No subscribers found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default NewsletterList;