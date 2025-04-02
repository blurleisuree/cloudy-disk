import {Dashboard} from "../../modules/Dashboard/index";
import NoItems from "./components/NoItems/NoItems";
import FilesTitle from "./components/FilesTitle/FilesTitle";

function Files() {
  // const files = [
  //   {
  //     name: "резюме",
  //     type: "pdf",
  //     preview: "/",
  //     size: "92.78 Кб",
  //     date: "14.02.2025",
  //     favourite: false,
  //   },
  // ];

  const files = [];

  return (
    <div>
      {/* FilesTitle */}
      <FilesTitle>Файлы</FilesTitle>
      {files.length === 0 ? (
        <NoItems title="Пока здесь пусто" text="Добавьте сюда файлы" />
      ) : (
        <Dashboard files={files} />
      )}
    </div>
  );
}

export default Files;
