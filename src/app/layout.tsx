import '@/styles/globals.scss';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Rusroza',
    default: 'Rusroza',
  },
  description:
    'Официальный сайт Российского объединения профессионалов и любителей роз. Членство. Новости мира роз. Все о розах.',
  metadataBase: new URL('https://rusroza.ru/'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
