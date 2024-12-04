export const ConfirmDeleteModal = ({
  isOpen,
  onClose,
  onConfirm,
  children,
}) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={onClose} >
      <div onClick={(e) => e.stopPropagation()} className="relative w-58 p-6 rounded-lg bg-slate-200">
        <button className="absolute top-0.5 right-2 text-slate-800 font-semibold text-lg hover:text-2xl" onClick={onClose}>x</button>
        {children}
        <div className="flex justify-around mt-4">
          <button className="w-20 h-8 p-0.5 rounded-full bg-lime-600 hover:bg-lime-800 text-white font-semibold" onClick={onConfirm}>
            Confirmar
          </button>
          <button className="w-20 h-8 p-0.5 rounded-full bg-orange-600 hover:bg-orange-800 text-white font-semibold" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};
