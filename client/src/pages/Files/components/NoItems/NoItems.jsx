import noItemSvg from "../../../../assets/noItem.svg";

function NoItems({ title, text }) {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="-mt-36 flex flex-col items-center">
        <img src={noItemSvg} alt="noItemSvg" className="max-w-fit" />
        <h3 className="mt-7 text-lg font-medium text-center">{title}</h3>
        <p className="mt-2 text-gray-400 text-center">{text}</p>
      </div>
    </div>
  );
}

export default NoItems;
