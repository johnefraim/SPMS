import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-orange-500 text-[#434343] py-4 flex justify-center">
      <div>
        <p className="text-sm">&copy; {new Date().getFullYear()} CCS</p>
      </div>
    </footer>
  );
}

export default Footer;
