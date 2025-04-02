import DashboardTitle from "../DashboardTitle/DashboardTitle";
import DashboardInner from '../DashboardInner/DashboardInner'

function Dashboard({ files }) {
  return (
    <div className="mt-12">
      <DashboardTitle />
      <DashboardInner files={files} />
    </div>
  );
}

export default Dashboard;
