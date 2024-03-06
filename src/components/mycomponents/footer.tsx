import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-200 py-4 flex justify-center">
      <div>
        <p className="text-sm text-gray-800">&copy; {new Date().getFullYear()} CCS</p>
      </div>
    </footer>
  );
}

export default Footer;
