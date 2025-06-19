import React from "react";

export default function Footer() {
  return (
    <footer
      role="contentinfo"
      className="border-t border-[#CCCCCC] mt-20 py-4"
    >
      <div className="max-w-[1500px] mx-auto px-4 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-500">
        <p className="text-center sm:text-left">
          &copy; {new Date().getFullYear()} • Smart City — SENAI Roberto Mange
        </p>
        <p className="text-center sm:text-right">Todos os direitos reservados</p>
      </div>
    </footer>
  );
}
