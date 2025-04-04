import { useState } from 'react';
import { ModalForm } from '@/components/form';

export function FloatingButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-[var(--green-500)] text-white text-3xl shadow-md hover:bg-[var(--green-300)] transition-colors cursor-pointer"
      >
        +
      </button>

      <ModalForm isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}
