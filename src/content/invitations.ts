export type InvitationAudience = 'relatives' | 'friends';

export interface InvitationLink {
  label: string;
  url: string;
}

export interface InvitationLocation {
  name: string;
  address?: string;
  details?: string;
  addTopBreak?: boolean;
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
  sections: {
    dressCode: true,
    gifts: true,
    vkChat: true,
  },
} satisfies Omit<InvitationConfig, 'audience' | 'path' | 'timeline' | 'links'>;

const relativesTimeline = [
  {
    title: 'Сбор гостей',
    time: '11:30',
    location: {
      name: 'Дворец бракосочетания',
      address: 'улица Малыгина, 85',
      addTopBreak: true,
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

const friendsTimeline = [
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
    title: 'Препати',
    time: '13:00',
    location: {
      name: 'Наш  дом',
      address: 'Салтыкова-Щедрина 32, кв 11',
    },
  },
  {
    title: 'Коттедж',
    time: '15:00',
    location: {
      name: "с. Кулига",
      address: 'Улица Транспортная 18В.',
      details: 'О трансфере мы позаботимся сами – с вас: полотенца, купальники и тапочки',
      addTopBreak: true,
    },
    description: '',
  },
] satisfies readonly TimelineEvent[];

export const invitations = {
  relatives: {
    ...sharedInvitation,
    audience: 'relatives',
    path: '/relatives',
    timeline: relativesTimeline,
    links: {
      vkChat: {
        label: 'Нажмите сюда',
        url: 'https://vk.me/join/XwVtHoU5a7At3X9FnhGCzDwUxcrtkAcdfPc=',
      },
    },
  },
  friends: {
    ...sharedInvitation,
    audience: 'friends',
    path: '/friends',
    timeline: friendsTimeline,
    links: {
      vkChat: {
        label: 'Нажмите сюда',
        url: 'https://vk.me/join/B36HuMyT/EGeXtsdMHCWS68ReWh9P3M3dZk=',
      },
    },
  },
} satisfies Record<InvitationAudience, InvitationConfig>;
