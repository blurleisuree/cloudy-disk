import FileDashboardTitle from "../UI/FileDashboardTitle/FileDashboardTitle";
import FileDashboardInner from "../UI/FileDashboardInner/FileDashboardInner";

function FilesDashboard() {
  const files = [
    {
      name: "резюме",
      type: "pdf",
      preview: "/",
      size: "92.78 Кб",
      date: "14.02.2025",
      favourite: false,
    },
  ];

  if (files.length === 0)
    return <h2 className="text-lg mt-6  mx-12">У вас пока нет файлов.</h2>;

  return (
    <div className="mt-12">
      <FileDashboardTitle />
      <FileDashboardInner files={files} />
    </div>
  );
}

export default FilesDashboard;
