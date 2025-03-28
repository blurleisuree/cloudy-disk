import FileDashboardTitle from "../UI/FileDashboardTitle/FileDashboardTitle";
import FileDashboardInner from "../UI/FileDashboardInner/FileDashboardInner";

function FilesDashboard({files}) {

  return (
    <div className="mt-12">
      <FileDashboardTitle />
      <FileDashboardInner files={files} />
    </div>
  );
}

export default FilesDashboard;
