import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-white border-t mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-between items-center">
          <div className="text-gray-500">
            © {new Date().getFullYear()} Salon Coiffeure. All rights reserved.
          </div>
          <div className="text-gray-500">
            Created by{' '}
            <a
              href="https://imdevart.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-600 hover:text-purple-700"
            >
              IMDevArt
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}