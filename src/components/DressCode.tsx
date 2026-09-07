import { useRef, useState } from 'react';
import dressBeige from '../assets/images/dress-beige.webp';
import dressBlack from '../assets/images/Obraz_2.png';
import dressBrown from '../assets/images/dress-brown.webp';
import dressBurgundy from '../assets/images/dress-burgundy.webp';
import dressCream from '../assets/images/dress-cream.webp';
import dressPalette from '../assets/images/dress-palette.webp';

const looks = [
  { src: dressBurgundy, width: 1000, height: 1778, alt: 'Бордовый вечерний образ' },
  { src: dressBlack, width: 736, height: 1308, alt: 'Чёрный вечерний образ' },
  { src: dressBrown, width: 768, height: 1376, alt: 'Шоколадный вечерний образ' },
  { src: dressBeige, width: 736, height: 1308, alt: 'Бежевый вечерний образ' },
  { src: dressCream, width: 676, height: 1202, alt: 'Молочный вечерний образ' },
] as const;

export default function DressCode({ copy }: { copy: string }) {
  const description = copy.replace(/^Нарядный вечерний\.\s*/, '');
  const [slideIndex, setSlideIndex] = useState(1);
  const [isSliding, setIsSliding] = useState(false);
  const pointerStart = useRef<number | null>(null);
  const activeLook = (slideIndex - 1 + looks.length) % looks.length;
  const loopedLooks = [looks.at(-1)!, ...looks, looks[0]];

  const moveBy = (direction: -1 | 1) => {
    if (isSliding) return;

    setIsSliding(true);
    setSlideIndex((index) => index + direction);
  };

  const finishSwipe = (clientX: number) => {
    if (pointerStart.current === null) return;

    const distance = clientX - pointerStart.current;
    pointerStart.current = null;

    if (Math.abs(distance) < 32) return;
    moveBy(distance < 0 ? 1 : -1);
  };

  return (
    <section className="dress-code" aria-labelledby="dress-code-title">
      <h2 id="dress-code-title" className="section-title">
        <span>Дресс</span>{' '}<b>код</b>
      </h2>
      <p>
        <strong>Нарядный вечерний.</strong>
        <span>{description}</span>
      </p>
      <img
        className="dress-code__palette"
        src={dressPalette}
        width="1000"
        height="333"
        alt="Свадебная палитра: бордовый, чёрный, шоколадный и бежевые оттенки"
        loading="lazy"
      />
      <h3>Для вдохновения</h3>
      <div
        className="dress-code__slider"
        role="group"
        aria-roledescription="слайдер"
        aria-label="Примеры вечерних образов"
        onPointerDown={(event) => {
          pointerStart.current = event.clientX;
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerUp={(event) => finishSwipe(event.clientX)}
        onPointerCancel={() => { pointerStart.current = null; }}
      >
        <div
          className={`dress-code__looks${isSliding ? ' dress-code__looks--sliding' : ''}`}
          style={{ transform: `translate3d(-${slideIndex * 100}%, 0, 0)` }}
          onTransitionEnd={(event) => {
            if (event.target !== event.currentTarget) return;

            if (slideIndex === 0) setSlideIndex(looks.length);
            if (slideIndex === looks.length + 1) setSlideIndex(1);
            setIsSliding(false);
          }}
        >
          {loopedLooks.map((look, index) => (
            <img
              key={`${look.alt}-${index}`}
              {...look}
              loading="eager"
              aria-hidden={index !== slideIndex}
            />
          ))}
        </div>
      </div>
      <button
        className="dress-code__slider-button dress-code__slider-button--previous"
        type="button"
        onClick={() => moveBy(-1)}
        aria-label="Предыдущий образ"
      />
      <button
        className="dress-code__slider-button dress-code__slider-button--next"
        type="button"
        onClick={() => moveBy(1)}
        aria-label="Следующий образ"
      />
      <div className="dress-code__scroll-hint" aria-hidden="true">
        <span>Листайте</span>
        <i />
      </div>
      <p className="visually-hidden" aria-live="polite">
        {activeLook + 1} из {looks.length}: {looks[activeLook].alt}
      </p>
    </section>
  );
}
