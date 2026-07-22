import "./styles/UserTable.css";

const UserTable = ({ users }) => {
  return (
    <div className="admin-table-container">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Blood Group</th>
            <th>State</th>
            <th>Role</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.bloodGroup || "-"}</td>
              <td>{user.state || "-"}</td>
              <td>
                <span
                  className={
                    user.role === "admin" ? "role-admin" : "role-user"
                  }>
                  {user.role}
                </span>
              </td>
              <td>
                <span
                  className={
                    user.available ? "status-active" : "status-inactive"
                  }>
                  {user.available ? "Available" : "Unavailable"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
