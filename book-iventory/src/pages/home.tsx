import { Carousel } from "@/components/carousel";

export function Home() {
  return (
	<div className="flex flex-col items-center gap-[2rem] h-screen">
		<div className='w-[56.25rem] flex flex-col gap-[1rem]'>
			<h1 className="text-7xl font-bold mt-[2rem]">Sobre nós</h1>
			<p className='text-[1rem]  w-[56.25rem]'>
				A <span><span>Biblioteca Conecta</span></span> é uma <span><span>biblioteca moderna</span></span> que foi projetada para oferecer um espaço acolhedor, inovador e acessível a todos. Seu foco principal está em integrar <span><span>tecnologia</span></span>, <span><span>educação</span></span> e <span><span>comunidade</span></span>, promovendo o acesso ao conhecimento de forma dinâmica e interativa. Com uma estrutura atualizada e um acervo diversificado, a <span><span>Conecta</span></span> proporciona experiências únicas por meio de <span><span>ambientes colaborativos</span></span>, <span><span>eventos culturais</span></span> e recursos digitais de última geração. É o lugar ideal para quem busca <span><span>aprendizado contínuo</span></span> e <span><span>conexões significativas</span></span>.
			</p>
			<Carousel />
			<div className='flex w-full'>
				<a href="https://wa.me/5581996918080?text=Quero%20saber%20mais%20sobre%20a%20Biblioteca%20Conecta" className='cursor-pointer bg-[var(--green-500)] hover:bg-[var(--green-300)] transition-colors text-white h-[3rem] w-[10rem] rounded-lg flex items-center justify-center' target="blank">Entre em Contato</a>
			</div>
		</div>
	</div>
  );
}