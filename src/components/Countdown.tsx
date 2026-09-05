import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import type { InvitationConfig } from '../content/invitations';

const unitLabels = ['дней', 'часов', 'минут', 'секунд'] as const;

function getTimeLeft(iso?: string) {
  if (!iso) return [0, 0, 0, 0];

  const secondsLeft = Math.max(0, Math.floor((Date.parse(iso) - Date.now()) / 1000));

  return [
    Math.floor(secondsLeft / 86400),
    Math.floor((secondsLeft % 86400) / 3600),
    Math.floor((secondsLeft % 3600) / 60),
    secondsLeft % 60,
  ];
}

function formatWeddingDate(invitation: InvitationConfig) {
  const weddingDate = invitation.weddingDate;
  if (!weddingDate) return undefined;

  return new Intl.DateTimeFormat('ru-RU', {
    dateStyle: 'long',
    timeStyle: 'short',
    timeZone: weddingDate.timeZone,
  }).format(new Date(weddingDate.iso));
}

export default function Countdown({
  invitation,
}: {
  invitation: InvitationConfig;
}) {
  const shouldReduceMotion = useReducedMotion();
  const [values, setValues] = useState(() =>
    getTimeLeft(invitation.weddingDate?.iso),
  );
  const weddingDateLabel = formatWeddingDate(invitation);
  const { firstPartner, secondPartner } = invitation.couple;

  useEffect(() => {
    const updateCountdown = () => {
      setValues(getTimeLeft(invitation.weddingDate?.iso));
    };
    const intervalId = window.setInterval(updateCountdown, 1000);

    updateCountdown();
    return () => window.clearInterval(intervalId);
  }, [invitation.weddingDate?.iso]);

  return (
    <section className="countdown" aria-labelledby="countdown-title">
      <h2 id="countdown-title">До нашей встречи осталось</h2>
      {invitation.weddingDate && weddingDateLabel && (
        <time className="countdown__date visually-hidden" dateTime={invitation.weddingDate.iso}>
          {weddingDateLabel}
        </time>
      )}
      <div className="countdown__grid" aria-hidden="true">
        {unitLabels.map((label, index) => (
          <div className="countdown__unit" key={label}>
            <span className="countdown__number">
              <AnimatePresence initial={false} mode="popLayout">
                <motion.strong
                  key={values[index]}
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -10 }}
                  transition={{ duration: shouldReduceMotion ? 0.1 : 0.22 }}
                >
                  {String(values[index]).padStart(2, '0')}
                </motion.strong>
              </AnimatePresence>
            </span>
            <span>{label}</span>
          </div>
        ))}
      </div>
      <p className="visually-hidden">
        До свадьбы: {values[0]} дней, {values[1]} часов, {values[2]} минут и{' '}
        {values[3]} секунд.
      </p>
      <motion.p
        className="countdown__farewell"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: shouldReduceMotion ? 0.15 : 1 }}
      >
        {invitation.copy.farewell}
      </motion.p>
      <motion.p
        className="countdown__names"
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: shouldReduceMotion ? 0.15 : 0.9, delay: shouldReduceMotion ? 0 : 0.2 }}
      >
        {firstPartner} <span aria-hidden="true">&</span> {secondPartner}
      </motion.p>
    </section>
  );
}
