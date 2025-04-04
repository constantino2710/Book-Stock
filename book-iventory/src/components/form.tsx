
import { ImageUpload } from '@/components/imgUpload';

interface ModalFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ModalForm({ isOpen, onClose }: ModalFormProps) {


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative flex flex-col items-center bg-[var(--gray-700)] w-[40rem] rounded-lg p-[4rem]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-2xl hover:text-[var(--green-300)] cursor-pointer transition"
        >
          &times;
        </button>

        <h1 className="text-4xl mb-6 text-white">Adicione um livro</h1>
        <form className="flex flex-col items-center justify-center w-full gap-[1rem]">
          <input
            type="text"
            placeholder="Título"
            className="w-full h-[2.5rem] rounded-lg bg-[var(--gray-600)] text-white pl-2 focus:border-[var(--green-300)] focus:border focus:outline-none"
          />
          <input
            type="text"
            placeholder="Gênero"
            className="w-full h-[2.5rem] rounded-lg bg-[var(--gray-600)] text-white pl-2 focus:border-[var(--green-300)] focus:border focus:outline-none"
          />
          <div className="flex flex-row justify-between gap-[1rem] w-full">
            <input
              type="text"
              placeholder="Autor"
              className="w-full h-[2.5rem] rounded-lg bg-[var(--gray-600)] text-white pl-2 focus:border-[var(--green-300)] focus:border focus:outline-none"
            />
          </div>
		  <ImageUpload />


		  <button
        type="button"
        onClick={onClose}
        className="bg-[var(--green-500)] w-full h-[2.5rem] rounded-lg text-white cursor-pointer"
      >
        Adicionar
      </button>
        </form>
      </div>
    </div>
  );
}
