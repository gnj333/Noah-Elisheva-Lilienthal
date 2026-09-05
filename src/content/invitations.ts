export type InvitationAudience = 'relatives' | 'friends';

export interface InvitationLink {
  label: string;
  url: string;
}

export interface InvitationLocation {
  name: string;
  address?: string;
}

export interface TimelineEvent {
  title: string;
  time: string;
  description?: string;
  location?: InvitationLocation;
}

export interface WeddingDate {
  iso: string;
  timeZone: string;
}

export interface InvitationConfig {
  audience: InvitationAudience;
  path: `/${InvitationAudience}`;
  couple: {
    firstPartner: string;
    secondPartner: string;
  };
  intro: {
    eyebrow: string;
    senderNames: string;
    instruction: string;
  };
  copy: {
    invitation: string;
    dressCode: string;
    gifts: string;
    farewell: string;
  };
  weddingDate?: WeddingDate;
  timeline: readonly TimelineEvent[];
  links: {
    vkChat?: InvitationLink;
  };
  sections: {
    dressCode: boolean;
    gifts: boolean;
    vkChat: boolean;
  };
}

const sharedInvitation = {
  couple: {
    firstPartner: 'Никита',
    secondPartner: 'Елизавета',
  },
  intro: {
    eyebrow: 'Вам пришло письмо от',
    senderNames: 'Никиты & Елизаветы',
    instruction: 'Нажмите на конверт, чтобы открыть',
  },
  weddingDate: {
    iso: '2026-10-10T11:30:00+05:00',
    timeZone: 'Asia/Yekaterinburg',
  },
  copy: {
    invitation:
      'Мы будем счастливы разделить с вами один из самых важных и счастливых дней нашей жизни. Приглашаем вас стать частью этого праздника, наполненного любовью, радостью и тёплыми воспоминаниями.',
    dressCode:
      'Нарядный вечерний. Мы будем рады, если в ваших образах найдётся место оттенкам нашей свадебной палитры: бордовому, чёрному, шоколадному, тёмно-бежевому и бежевому. Но главное — выбирайте наряд, в котором вам будет красиво и комфортно.',
    gifts:
      'Если вы ещё не определились с подарком, мы будем рады, если он будет в виде конверта. Так вы поможете нам осуществить наши совместные желания и мечты, которые мы с удовольствием воплотим в жизнь вместе.',
    farewell: 'До встречи! С любовью,',
  },
  links: {
    vkChat: {
      label: 'Нажмите сюда',
      url: 'https://vk.me/join/XwVtHoU5a7At3X9FnhGCzDwUxcrtkAcdfPc=',
    },
  },
  sections: {
    dressCode: true,
    gifts: true,
    vkChat: true,
  },
} satisfies Omit<InvitationConfig, 'audience' | 'path' | 'timeline'>;

const relativesTimeline = [
  {
    title: 'Сбор гостей',
    time: '11:30',
    location: {
      name: 'Дворец бракосочетания',
      address: 'улица Малыгина, 85',
    },
  },
  {
    title: 'Церемония',
    time: '12:00',
    description: '2 этаж, Янтарный зал',
  },
  {
    title: 'Банкет',
    time: '14:00',
    location: {
      name: 'Ресторан «Британия»',
      address: 'улица Пржевальского, 35, к4/4',
    },
  },
  {
    title: 'Завершение',
    time: '17:00',
    description: 'Мы благодарны каждому за счастливые моменты этого дня',
  },
] satisfies readonly TimelineEvent[];

// Replace with the friends schedule once its final times and locations are known.
const friendsTimeline = relativesTimeline.map((event) => ({
  ...event,
  location: event.location ? { ...event.location } : undefined,
}));

export const invitations = {
  relatives: {
    ...sharedInvitation,
    audience: 'relatives',
    path: '/relatives',
    timeline: relativesTimeline,
  },
  friends: {
    ...sharedInvitation,
    audience: 'friends',
    path: '/friends',
    timeline: friendsTimeline,
  },
} satisfies Record<InvitationAudience, InvitationConfig>;
