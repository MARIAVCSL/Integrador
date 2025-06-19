import React, { useState } from "react";
import axios from "axios";
import logo from "../../img/logo.png";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (password !== confirmPassword) {
      setErrorMessage("As senhas não conferem.");
      return;
    }

    try {
      await axios.post("http://127.0.0.1:8000/api/signup/", {
        username,
        password,
      });

      setSuccessMessage("Cadastro realizado com sucesso!");
      setUsername("");
      setPassword("");
      setConfirmPassword("");

      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      setErrorMessage("Erro ao cadastrar. Tente novamente.");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <section className="w-full max-w-md bg-white rounded-md shadow-2xl p-8 mx-auto">
        <header className="flex flex-col items-center mb-6">
          <img src={logo} alt="Logo" className="w-39" />
          <p className="text-center text-gray-500 text-sm font-medium">
            Bem-vindo à Smart City do <br />
            <span className="text-[#145DA0] font-semibold">SENAI ROBERTO MANGE</span>
          </p>
        </header>
  
        <h2 className="text-center text-2xl font-bold text-[#145DA0] mb-4">
          Cadastro na Plataforma
        </h2>
  
        {errorMessage && (
          <p className="text-center text-sm text-red-500 mb-3">{errorMessage}</p>
        )}
        {successMessage && (
          <p className="text-center text-sm text-green-600 mb-3">{successMessage}</p>
        )}
  
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="username" className="block text-gray-600 mb-1 text-sm font-medium">
              Usuário
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Digite seu usuário"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#145DA0] outline-none bg-gray-100 text-gray-800 transition duration-150"
              required
            />
          </div>
  
          <div>
            <label htmlFor="password" className="block text-gray-600 mb-1 text-sm font-medium">
              Senha
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha"
                className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#145DA0] outline-none bg-gray-100 text-gray-800 transition duration-150"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#145DA0] transition-colors"
              >
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>
          </div>
  
          <div>
            <label htmlFor="confirmPassword" className="block text-gray-600 mb-1 text-sm font-medium">
              Confirmar Senha
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repita sua senha"
                className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#145DA0] outline-none bg-gray-100 text-gray-800 transition duration-150"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#145DA0] transition-colors"
              >
                {showConfirmPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>
          </div>
  
          <button
            type="submit"
            className="w-full bg-[#145DA0] hover:bg-[#1e65b1] text-white font-semibold py-2 rounded-md transition duration-200"
          >
            Cadastrar
          </button>
        </form>
  
        <footer className="mt-5 text-center">
          <button
            onClick={() => navigate("/")}
            className="text-sm text-[#145DA0] hover:underline transition"
          >
            Já sou cadastrado
          </button>
        </footer>
      </section>
    </main>
  );
  
  
}
