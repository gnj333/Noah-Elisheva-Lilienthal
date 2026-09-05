import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import type { InvitationConfig } from '../content/invitations';
import DressCode from './DressCode';
import EventTimeline from './EventTimeline';
import GuestActions from './GuestActions';

export default function WeddingDetails({
  invitation,
  onClose,
}: {
  invitation: InvitationConfig;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const audienceLabel = invitation.audience === 'relatives' ? 'родственники' : 'друзья';

  useEffect(() => {
    const dialog = dialogRef.current;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const scrollY = window.scrollY;
    const previousBodyStyles = {
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width,
    };

    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    dialog?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== 'Tab' || !dialog) return;

      const focusable = Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );
      const first = focusable[0];
      const last = focusable.at(-1);
      const activeElement = document.activeElement;

      if (!first || !last) {
        event.preventDefault();
      } else if (!dialog.contains(activeElement)) {
        event.preventDefault();
        first.focus();
      } else if (
        event.shiftKey &&
        (activeElement === first || activeElement === dialog)
      ) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousBodyStyles.overflow;
      document.body.style.position = previousBodyStyles.position;
      document.body.style.top = previousBodyStyles.top;
      document.body.style.width = previousBodyStyles.width;
      window.scrollTo(0, scrollY);
      previouslyFocused?.focus();
    };
  }, [onClose]);

  return (
    <motion.section
      id="details"
      className="wedding-details"
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="details-title"
      tabIndex={-1}
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : '100%' }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: shouldReduceMotion ? 0 : '100%' }}
      transition={{ duration: shouldReduceMotion ? 0.15 : 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <header className="wedding-details__header">
        <h2 id="details-title" className="visually-hidden">Детали свадьбы</h2>
        <button type="button" onClick={onClose} aria-label="Закрыть детали свадьбы">
          <span className="close-label close-label--mobile">{audienceLabel}</span>
          <span className="close-label close-label--desktop">Закрыть</span>
        </button>
      </header>
      <EventTimeline events={invitation.timeline} />
      {invitation.sections.dressCode && (
        <DressCode copy={invitation.copy.dressCode} />
      )}
      <GuestActions invitation={invitation} />
    </motion.section>
  );
}
