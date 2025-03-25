function FilesDashboardElem({ elem }) {
  return (
    <div className="grid grid-cols-[5fr_1fr_1fr] gap-2 min-w-[600px] cursor-pointer hover:bg-blue-50 transition py-5 px-12">
      <div className="flex-row items-center">
        <img src={elem.preview} alt="file_preview" className="inline" />
        <p className="inline">{elem.name + "." + elem.type}</p>
      </div>
      <p>{elem.size}</p>
      <p>{elem.date}</p>
    </div>
  );
}

export default FilesDashboardElem;
