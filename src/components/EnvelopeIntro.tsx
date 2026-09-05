import { useState, type RefObject } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import envelopeClosed from '../assets/images/envelope-closed.webp';
import envelopeOpen from '../assets/images/envelope-open.webp';
import type { InvitationConfig } from '../content/invitations';

export default function EnvelopeIntro({
  invitation,
  onOpen,
  buttonRef,
}: {
  invitation: InvitationConfig;
  onOpen: () => void;
  buttonRef: RefObject<HTMLButtonElement | null>;
}) {
  const [isOpening, setIsOpening] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const startOpening = () => {
    if (!isOpening) setIsOpening(true);
  };

  return (
    <motion.section
      className="envelope-intro"
      aria-labelledby="intro-title"
      exit={{ opacity: 0, scale: shouldReduceMotion ? 1 : 1.04 }}
      transition={{ duration: shouldReduceMotion ? 0.12 : 0.4 }}
    >
      <motion.div
        className="envelope-intro__heading"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 12 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.65 } },
        }}
      >
        <p className="eyebrow">{invitation.intro.eyebrow}</p>
        <h1 id="intro-title">{invitation.intro.senderNames}</h1>
      </motion.div>
      <motion.button
        className="envelope-intro__button"
        type="button"
        ref={buttonRef}
        onClick={startOpening}
        disabled={isOpening}
        aria-label="Открыть свадебное приглашение"
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={shouldReduceMotion ? undefined : { y: -4, rotate: -0.5 }}
        whileTap={shouldReduceMotion ? { opacity: 0.8 } : { scale: 0.97 }}
        transition={{ duration: 0.65, delay: shouldReduceMotion ? 0 : 0.25 }}
      >
        <motion.img
          className="envelope-intro__closed"
          src={envelopeClosed}
          width="874"
          height="700"
          alt=""
          fetchPriority="high"
          animate={isOpening ? { opacity: 0, scale: 1.035 } : { opacity: 1, scale: 1 }}
          transition={{ duration: shouldReduceMotion ? 0.12 : 0.45 }}
        />
        <AnimatePresence>
          {isOpening && (
            <motion.img
              className="envelope-intro__open"
              src={envelopeOpen}
              width="874"
              height="700"
              alt=""
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18, scale: 0.96 }}
              animate={{ opacity: 1, y: shouldReduceMotion ? 0 : -22, scale: 1.06 }}
              transition={{ duration: shouldReduceMotion ? 0.15 : 0.75, ease: 'easeOut' }}
              onAnimationComplete={onOpen}
            />
          )}
        </AnimatePresence>
      </motion.button>
      <motion.p
        className="envelope-intro__instruction"
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpening ? 0 : 1 }}
        transition={{ duration: 0.4, delay: shouldReduceMotion ? 0 : 0.5 }}
      >
        {invitation.intro.instruction}
      </motion.p>
    </motion.section>
  );
}
