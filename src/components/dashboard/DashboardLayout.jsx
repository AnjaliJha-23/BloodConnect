import Sidebar from "./Sidebar";
import SummaryCards from "./SummaryCards";
import QuickActions from "./QuickActions";
import RecentRequests from "./RecentRequests";
import "./DashboardLayout.css";

function DashboardLayout({ user, profileComplete }) {
  return (
    <div className="dashboard-layout">

      <Sidebar user={user} />

      <div className="dashboard-main">

        <SummaryCards user={user} />

        <QuickActions
          profileComplete={profileComplete}
        />

        <RecentRequests />

      </div>

    </div>
  );
}

export default DashboardLayout;