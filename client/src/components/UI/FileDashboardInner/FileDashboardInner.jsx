import FilesDashboardElem from "../FilesDashboardElem/FilesDashboardElem";

function FileDashboardInner({ files }) {
  return (
    <div className="mt-4">
      {files.map((elem) => (
        <FilesDashboardElem elem={elem} key={elem.size + elem.name} />
      ))}
    </div>
  );
}

export default FileDashboardInner;
