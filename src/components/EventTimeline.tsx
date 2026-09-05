import { motion, useReducedMotion } from 'motion/react';
import timelinePath from '../assets/images/timeline-path-reference.png';
import type { TimelineEvent } from '../content/invitations';

export default function EventTimeline({ events }: { events: readonly TimelineEvent[] }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="event-timeline" aria-labelledby="timeline-title">
      <h2 id="timeline-title" className="section-title">
        <span>План</span>{' '}<b>мероприятий</b>
      </h2>
      <div className="event-timeline__track">
        <motion.img
          className="event-timeline__path"
          src={timelinePath}
          width="852"
          height="1846"
          alt=""
          aria-hidden="true"
          initial={shouldReduceMotion ? false : { clipPath: 'inset(0 0 100% 0)' }}
          animate={{ clipPath: 'inset(0 0 0% 0)' }}
          transition={{ duration: shouldReduceMotion ? 0.15 : 2.2, ease: 'easeInOut' }}
        />
        <ol>
          {events.map((event, index) => (
            <motion.li
              key={`${event.time}-${event.title}`}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.65 }}
              transition={{ duration: shouldReduceMotion ? 0.15 : 0.5, delay: shouldReduceMotion ? 0 : index * 0.08 }}
            >
              <h3>{event.title}</h3>
              {event.location && (
                <p>
                  <strong>{event.location.name}</strong>
                  {event.location.address && <> — {event.location.address}</>}
                </p>
              )}
              {event.description && <p>{event.description}</p>}
              <time>{event.time}</time>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
