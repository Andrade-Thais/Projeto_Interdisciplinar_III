export default function PdfCard({
  pdf,
  title,
  onSelect,
  isSelected,
  userRole,
}) {
  return (
    <div
      className={`relative flex flex-col items-center justify-center p-4 m-2 bg-white rounded shadow-lg ${
        isSelected ? "border-2 border-blue-500" : ""
      }`}
    >
      <h4 className="mb-2 text-lg font-bold text-center">{title}</h4>
      <iframe
        src={pdf}
        width="100%"
        height="600px"
        style={{ border: "none" }}
        title={title}
      />
      {userRole === "admin" ? (
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onSelect}
          className="absolute w-6 h-6 top-2 right-2 rounded-full"
        />
      ) : null}
    </div>
  );
}
