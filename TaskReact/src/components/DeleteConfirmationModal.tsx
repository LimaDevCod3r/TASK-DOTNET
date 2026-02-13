import { AlertTriangle, X } from "lucide-react";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  isLoading?: boolean;
}


export const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  isLoading = false,
}: DeleteConfirmationModalProps) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="delete-modal-title"
      aria-describedby="delete-modal-description"
    >
      <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header com Ícone de Alerta */}
        <div className="p-6 text-center">
          <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
          
          <h2 id="delete-modal-title" className="text-xl font-bold text-gray-900 mb-2">
            Excluir Tarefa?
          </h2>
          
          <p id="delete-modal-description" className="text-gray-500 text-sm leading-relaxed">
            Você está prestes a excluir a tarefa <span className="font-bold text-gray-700">"{title}"</span>. 
            Esta ação não pode ser desfeita.
          </p>
        </div>

        {/* Ações */}
        <div className="flex flex-col p-6 pt-0 gap-2">
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="w-full py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              "Sim, excluir tarefa"
            )}
          </button>
          
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="w-full py-3 text-gray-500 font-bold hover:bg-gray-100 rounded-xl transition-colors disabled:opacity-50"
          >
            Cancelar
          </button>
        </div>

        {/* Botão de fechar no topo  */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Fechar"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
