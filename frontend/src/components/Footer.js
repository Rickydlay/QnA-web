const Footer = () => {
  return (
    <footer className="py-2" style={{ borderTop: '2px solid rgb(205, 215, 234)' }}>
      <div className="container text-center">
        <p className="mb-0" style={{ color: '#ff5733' }}>© {new Date().getFullYear()} Student Academic Forum. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;