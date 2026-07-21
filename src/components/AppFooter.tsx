const AppFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer style={{ backgroundColor: 'rgb(194, 0, 18)', color: '#fff', padding: '1.5rem', textAlign: 'center' }}>
      <p>&copy; {currentYear} Company Name. All rights reserved.</p>
    </footer>
  );
};
export default AppFooter;
