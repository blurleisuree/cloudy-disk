import DashboardElem from '../DashboardElem/DashboardElem'

function DashboardInner({ files }) {
  return (
    <div className="mt-4">
      {files.map((elem) => (
        <DashboardElem elem={elem} key={elem.size + elem.name} />
      ))}
    </div>
  );
}

export default DashboardInner;
