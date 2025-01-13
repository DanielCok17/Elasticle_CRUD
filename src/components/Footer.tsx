const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 mt-8">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Created by Daniel Cok for Elastice s.r.o. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
