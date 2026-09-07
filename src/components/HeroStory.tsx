import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import champagneGlass from '../assets/images/champagne-glass.webp';
import couplePhotoOne from '../assets/images/couple-photo-01.webp';
import couplePhotoTwo from '../assets/images/couple-photo-02.webp';
import dog from '../assets/images/dog.webp';
import envelopeOpen from '../assets/images/envelope-open.webp';
import flowersOne from '../assets/images/flowers-01.webp';
import flowersTwo from '../assets/images/flowers-02-7338d7.webp';
import signDetails from '../assets/images/sign-details.webp';
import signInvitation from '../assets/images/sign-invitation.webp';
import type { InvitationConfig } from '../content/invitations';

const imageSize = { width: 874, height: 700 } as const;

export default function HeroStory({
  invitation,
  onOpenDetails,
}: {
  invitation: InvitationConfig;
  onOpenDetails: () => void;
}) {
  const collageRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: collageRef,
    offset: ['start end', 'end start'],
  });
  const topFlowersY = useTransform(scrollYProgress, [0, 1], [10, -12]);
  const middleFlowersY = useTransform(scrollYProgress, [0, 1], [8, -8]);
  const reveal = (delay: number, x: number, y: number) => ({
    initial: { opacity: 0, x: shouldReduceMotion ? 0 : x, y: shouldReduceMotion ? 0 : y },
    whileInView: { opacity: 1, x: 0, y: 0 },
    viewport: { once: true, amount: 0.18 },
    transition: { duration: shouldReduceMotion ? 0.18 : 0.75, delay, ease: 'easeOut' as const },
  });

  return (
    <section className="hero-story" aria-labelledby="story-title">
      <div className="ribbon" aria-label="Вы приглашены на свадьбу 10.10">
        <span className="ribbon__mobile" aria-hidden="true">
          Вы приглашены на свадьбу 10.10 · Вы приглашены на свадьбу 10.10 · Вы приглашены на свадьбу 10.10 ·&nbsp;
        </span>
        <span className="ribbon__desktop" aria-hidden="true">
          Вы приглашены на свадьбу 10.10 · Вы приглашены на свадьбу 10.10 · Вы приглашены на свадьбу 10.10 ·
          Вы приглашены на свадьбу 10.10 · Вы приглашены на свадьбу 10.10 · Вы приглашены на свадьбу 10.10 ·
          Вы приглашены на свадьбу 10.10 · Вы приглашены на свадьбу 10.10 · Вы приглашены на свадьбу 10.10 ·&nbsp;
        </span>
      </div>
      <div className="hero-story__collage" ref={collageRef}>
        <motion.img
          className="collage-image collage-image--envelope"
          src={envelopeOpen}
          {...imageSize}
          alt="Открытый свадебный конверт"
          {...reveal(0, -14, 18)}
        />
        <motion.div
          className="collage-image collage-image--flowers-top"
          style={{ y: shouldReduceMotion ? 0 : topFlowersY }}
        >
          <motion.img
            src={flowersTwo}
            width="1000"
            height="1775"
            alt=""
            {...reveal(0.08, 18, 10)}
          />
        </motion.div>
        <motion.div className="story-sign story-sign--invitation" {...reveal(0.14, 22, 12)}>
          <img src={signInvitation} {...imageSize} alt="" />
          <div className="story-sign__copy">
            <h2 id="story-title">Приглашаем вас на свадьбу</h2>
            <p style={{fontSize: 14}}>{invitation.copy.invitation}</p>
          </div>
        </motion.div>
        <motion.img
          className="collage-image collage-image--photo-one"
          src={couplePhotoOne}
          {...imageSize}
          alt={`${invitation.couple.firstPartner} и ${invitation.couple.secondPartner}`}
          loading="lazy"
          {...reveal(0.08, -24, 28)}
        />
        <motion.div
          className="collage-image collage-image--flowers-middle"
          style={{ y: shouldReduceMotion ? 0 : middleFlowersY }}
        >
          <motion.img
            src={flowersOne}
            width="797"
            height="1190"
            alt=""
            loading="lazy"
            {...reveal(0.12, 12, 12)}
          />
        </motion.div>
        <motion.div className="story-sign story-sign--details" {...reveal(0.08, -20, 20)}>
          <img src={signDetails} alt="" loading="lazy" />
          <div className="story-sign__copy story-sign__copy--details">
            <h2>Детали свадьбы</h2>
            <img src={dog} {...imageSize} alt="" loading="lazy" />
            <button type="button" onClick={onOpenDetails}>
              Нажмите сюда
            </button>
          </div>
        </motion.div>
        <motion.img
          className="collage-image collage-image--glass"
          src={champagneGlass}
          {...imageSize}
          alt=""
          loading="lazy"
          {...reveal(0.1, -18, 24)}
        />
        <motion.img
          className="collage-image collage-image--photo-two"
          src={couplePhotoTwo}
          {...imageSize}
          alt={`${invitation.couple.firstPartner} и ${invitation.couple.secondPartner}`}
          loading="lazy"
          {...reveal(0.14, 24, 30)}
        />
      </div>
    </section>
  );
}
