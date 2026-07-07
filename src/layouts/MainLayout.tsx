import AppHeader from '../components/AppHeader';
import AppFooter from '../components/AppFooter';
import type { ReactNode } from 'react';
import './MainLayout.css';

interface MainLayoutProps {
  children: ReactNode;
}
const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="layout-container">
      {/* Capitalized names strictly prevent HTML tag conflict */}
      <AppHeader />
      
      {/* Main content wrapper */}
      <main className="layout-content">
        {children}
      </main>
      
      <AppFooter />
    </div>
  );
};

export default MainLayout;
