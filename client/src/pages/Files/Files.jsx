import FilesDashboard from "../../components/FilesDashboard/FilesDashboard";
import NoItems from "../../components/NoItems/NoItems";
import MainTitle from "../../components/UI/MainTitle/MainTitle";

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
      <MainTitle>Файлы</MainTitle>
      {files.length === 0 ? <NoItems title="Пока здесь пусто" text="Добавьте сюда файлы"/> : <FilesDashboard files={files} />}
    </div>
  );
}

export default Files;
