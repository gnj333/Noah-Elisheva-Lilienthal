import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import Countdown from './components/Countdown';
import EnvelopeIntro from './components/EnvelopeIntro';
import HeroStory from './components/HeroStory';
import WeddingDetails from './components/WeddingDetails';
import {
  invitations,
  type InvitationConfig,
} from './content/invitations';

function getInvitation(pathname: string): InvitationConfig | undefined {
  const path = pathname.replace(/\/+$/, '') || '/';

  return Object.values(invitations).find((invitation) => invitation.path === path);
}

function InvitationPage({ invitation }: { invitation: InvitationConfig }) {
  const shouldReduceMotion = useReducedMotion();
  const contentRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLButtonElement>(null);
  const sessionKey = `invitation-opened:${invitation.audience}`;
  const startsWithDetailsOpen = useRef(window.location.hash === '#details').current;
  const [isOpened, setIsOpened] = useState(() => {
    if (startsWithDetailsOpen) return true;

    try {
      return window.sessionStorage.getItem(sessionKey) === 'true';
    } catch {
      return false;
    }
  });
  const [isDetailsOpen, setIsDetailsOpen] = useState(startsWithDetailsOpen);

  useLayoutEffect(() => {
    if (isOpened && !startsWithDetailsOpen) {
      window.scrollTo(0, 0);
    }
  }, [isOpened, startsWithDetailsOpen]);

  useEffect(() => {
    const syncDetailsWithUrl = () => {
      const shouldOpen = window.location.hash === '#details';
      setIsDetailsOpen(shouldOpen);

      if (shouldOpen) {
        setIsOpened(true);
        try {
          window.sessionStorage.setItem(sessionKey, 'true');
        } catch {
          // The invitation remains usable when storage is unavailable.
        }
      }
    };

    window.addEventListener('hashchange', syncDetailsWithUrl);
    window.addEventListener('popstate', syncDetailsWithUrl);

    return () => {
      window.removeEventListener('hashchange', syncDetailsWithUrl);
      window.removeEventListener('popstate', syncDetailsWithUrl);
    };
  }, [sessionKey]);

  const openInvitation = () => {
    setIsOpened(true);
    try {
      window.sessionStorage.setItem(sessionKey, 'true');
    } catch {
      // The invitation remains usable when storage is unavailable.
    }
    requestAnimationFrame(() => contentRef.current?.focus({ preventScroll: true }));
  };

  const openDetails = () => {
    window.history.pushState(
      { ...window.history.state, invitationDetails: true },
      '',
      `${window.location.pathname}${window.location.search}#details`,
    );
    setIsDetailsOpen(true);
  };

  const closeDetails = () => {
    setIsDetailsOpen(false);

    if (window.history.state?.invitationDetails) {
      window.history.back();
      return;
    }

    window.history.replaceState(
      window.history.state,
      '',
      `${window.location.pathname}${window.location.search}`,
    );
  };

  return (
    <main className="invitation-page">
      <AnimatePresence mode="wait">
        {!isOpened && (
          <EnvelopeIntro
            key="intro"
            invitation={invitation}
            onOpen={openInvitation}
            buttonRef={introRef}
          />
        )}
      </AnimatePresence>
      {isOpened && (
        <>
          <motion.article
            id="invitation"
            className="invitation-content"
            ref={contentRef}
            tabIndex={-1}
            inert={isDetailsOpen}
            aria-hidden={isDetailsOpen}
            initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.985 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: shouldReduceMotion ? 0.15 : 0.65, ease: 'easeOut' }}
          >
            <HeroStory invitation={invitation} onOpenDetails={openDetails} />
            <Countdown invitation={invitation} />
          </motion.article>
          <AnimatePresence>
            {isDetailsOpen && (
              <WeddingDetails invitation={invitation} onClose={closeDetails} />
            )}
          </AnimatePresence>
        </>
      )}
    </main>
  );
}

function NotFound() {
  return (
    <main className="route-error">
      <p className="eyebrow">Свадебное приглашение</p>
      <h1>Такой страницы нет</h1>
      <p>Откройте основную версию приглашения.</p>
    </main>
  );
}

export default function App() {
  const invitation = getInvitation(window.location.pathname);

  return invitation ? <InvitationPage invitation={invitation} /> : <NotFound />;
}
