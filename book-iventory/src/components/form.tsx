import { useState } from 'react';

export function Form() {
	const [quantidade, setQuantidade] = useState(0);

	const aumentar = () => setQuantidade((prev) => prev + 1);
	const diminuir = () => setQuantidade((prev) => Math.max(prev - 1, 0));

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const valor = parseInt(e.target.value, 10);
		if (!isNaN(valor) && valor >= 0) {
			setQuantidade(valor);
		} else if (e.target.value === '') {
			setQuantidade(0);
		}
	};

	return (
		<div className="flex flex-col items-center h-screen mt-[9rem] gap-[1rem]">
			<div className="flex flex-col items-center justify-center h-[80%] bg-[var(--gray-700)] w-[40rem] rounded-lg p-[4rem]">
			<h1 className="text-4xl">Adicione um livro</h1>
				<form className="flex flex-col items-center justify-center h-full w-full gap-[1rem]">
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

						{/* Quantidade customizado */}
						<div className="flex bg-[var(--gray-600)] justify-center itens-center rounded-lg">
							<button
								type="button"
								onClick={diminuir}
								className="text-white hover:text-[var(--green-300)] transition"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="lucide lucide-arrow-left-icon cursor-pointer"
								>
									<path d="m12 19-7-7 7-7" />
									<path d="M19 12H5" />
								</svg>
							</button>

							<input
								placeholder="0"		
								type="number"
								value={quantidade}
								onChange={handleChange}
								className="w-[4rem] h-[2.5rem] text-center bg-transparent text-white focus:outline-none font-mono leading-none appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
								/>

							<button
								type="button"
								onClick={aumentar}
								className="text-white hover:text-[var(--green-300)] transition"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="lucide lucide-arrow-right-icon cursor-pointer"
								>
									<path d="M5 12h14" />
									<path d="m12 5 7 7-7 7" />
								</svg>
							</button>
						</div>
					</div>

					<button className="bg-[var(--green-500)] w-full h-[2.5rem] rounded-lg text-white cursor-pointer">Adicionar</button>
				</form>
			</div>
		</div>
	);
}
