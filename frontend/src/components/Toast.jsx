const Toast = ({ show, type = "success", children, onClose }) => {
  if (!show) return null;
  const color =
    type === "error"
      ? "bg-red-600"
      : type === "warning"
      ? "bg-yellow-600"
      : "bg-green-600";

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className={`flex items-center gap-3 rounded-lg px-4 py-3 text-white shadow-lg ${color}`}>
        <span className="text-sm">{children}</span>
        <button className="ml-2 rounded bg-black/20 px-2 py-1 text-xs cursor-pointer" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Toast;
