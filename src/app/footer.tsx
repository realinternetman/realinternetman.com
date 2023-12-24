import React from 'react';

const Footer = ({ host }: { host: string }) => {
  return (
    <footer className="flex justify-center mt-auto">
      <p>©{host}</p>
    </footer>
  );
};

export default Footer;
