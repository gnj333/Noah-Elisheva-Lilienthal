import vkChatImage from '../assets/images/vk-chat.webp';
import type { InvitationConfig } from '../content/invitations';

export default function GuestActions({
  invitation,
}: {
  invitation: InvitationConfig;
}) {
  const vkChat = invitation.links.vkChat;
  const shouldReduceMotion = useReducedMotion();

  return (
    <>
      {invitation.sections.gifts && (
        <motion.section
          className="gifts"
          aria-labelledby="gifts-title"
          initial={{ opacity: 0, scaleY: shouldReduceMotion ? 1 : 0.72, y: shouldReduceMotion ? 0 : 18 }}
          whileInView={{ opacity: 1, scaleY: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: shouldReduceMotion ? 0.15 : 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 id="gifts-title" className="script-title">Подарки</h2>
          <p>{invitation.copy.gifts}</p>
        </motion.section>
      )}
      {invitation.sections.vkChat && vkChat && (
        <section className="vk-chat" aria-labelledby="vk-chat-title">
          <h2 id="vk-chat-title">Для обсуждения, беседа в VK:</h2>
          <a href={vkChat.url} target="_blank" rel="noreferrer">
            <img
              src={vkChatImage}
              width="1000"
              height="500"
              alt=""
              loading="lazy"
            />
            <span>{vkChat.label}</span>
          </a>
        </section>
      )}
    </>
  );
}
import { motion, useReducedMotion } from 'motion/react';
