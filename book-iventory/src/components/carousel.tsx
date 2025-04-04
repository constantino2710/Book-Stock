import { useState, useLayoutEffect, useRef, JSX } from 'react';
import { motion } from 'framer-motion';

import img1 from '@/assets/Biblioteca_Parque_de_Niterói,_sede_da_Academia_Fluminense_de_Letras.webp';
import img2 from '@/assets/bibliografia.webp';
import img3 from '@/assets/biblioteca_publica_do_parana._foto_por_daniel_caron.webp';
import img4 from '@/assets/360_F_1059059975_JYeZvqhfuNYCSuzVGuOPjH3ej3GW0DKe.webp';
import img5 from '@/assets/biblioteca-central-pucrs-destaque-capa-servicos-online.webp';

const images: string[] = [img1, img2, img3, img4, img5];

export function Carousel(): JSX.Element {
  const carousel = useRef<HTMLDivElement>(null);
  const innerCarousel = useRef<HTMLDivElement>(null);
  const [maxDrag, setMaxDrag] = useState(0);

  useLayoutEffect(() => {
    if (carousel.current && innerCarousel.current) {
      const containerWidth = carousel.current.offsetWidth;
      const contentWidth = innerCarousel.current.scrollWidth;
      setMaxDrag(contentWidth - containerWidth);
    }
  }, []);

  return (
    <div className="flex justify-center items-center focus:outline-none">
      <motion.div
        ref={carousel}
        className="w-[56.25rem] overflow-hidden cursor-grab"
        whileTap={{ cursor: 'grabbing' }}
      >
        <motion.div
          ref={innerCarousel}
          className="flex gap-4 justify-start"
          drag="x"
          dragConstraints={{ left: -maxDrag, right: 0 }}
          initial={{ x: 100 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {images.map((image, index) => (
            <motion.div
              key={`${image}-${index}`}
              className="w-[300px] h-[200px] flex-shrink-0"
            >
              <img
                src={image}
                alt={`carousel-${index}`}
                className="w-full h-full object-cover rounded-xl pointer-events-none"
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
