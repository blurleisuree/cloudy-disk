import MainTitle from "../Files/components/FilesTitle/FilesTitle";
import FilesDashboard from "../../modules/Dashboard/components/Dashboard/Dashboard";
import NoItems from "../Files/components/NoItems/NoItems";

function Favourite() {
  const files = [];

  return (
    <div>
      <MainTitle className="mx-12">Избранное</MainTitle>
      {files.length === 0 ? (
        <NoItems
          title="Самое важное"
          text="Добавьте файл в избранное, чтобы быстро найти его здесь"
        />
      ) : (
        <FilesDashboard files={files} />
      )}
    </div>
  );
}

export default Favourite;
