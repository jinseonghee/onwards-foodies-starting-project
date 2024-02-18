import MainHeader from '@/components/main-header/main-header';
import './globals.css';

export const metadata = {
  title: 'All Meals',
  description: 'Browse the delicious meals shared by our vibrant community.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <MainHeader />
        {children}
      </body>
    </html>
  );
}
