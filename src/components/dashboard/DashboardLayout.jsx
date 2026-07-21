import Sidebar from "./Sidebar";
import SummaryCards from "./SummaryCards";
import QuickActions from "./QuickActions";
import DonationTip from "./DonationTip";
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

        <DonationTip />

      </div>

    </div>
  );
}

export default DashboardLayout;