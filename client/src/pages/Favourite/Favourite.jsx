import MainTitle from "../../components/UI/MainTitle/MainTitle";
import FilesDashboard from "../../components/FilesDashboard/FilesDashboard";
import NoItems from "../../components/NoItems/NoItems";

function Favourite() {
  const files = [];

  return (
    <div>
      <MainTitle className="mx-12">Избранное</MainTitle>
      {files.length === 0 ? (
        <NoItems title="Самое важное" text="Добавьте файл в избранное, чтобы быстро найти его здесь" />
      ) : (
        <FilesDashboard files={files} />
      )}
    </div>
  );
}

export default Favourite;
