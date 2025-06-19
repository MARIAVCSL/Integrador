import React, { useState } from "react";
import axios from "axios";
import logo from "../../img/logo.png";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const logar = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/token/", {
        username: user,
        password: password,
      });
      const token = response.data.access;
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      navigate("/home");
    } catch (error) {
      console.error("Erro ao logar:", error);
      alert("Usuário ou senha inválido.");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <section className="w-full max-w-md bg-white rounded-md shadow-2xl p-10">
        <header className="flex flex-col items-center mb-8">
          <img src={logo} alt="Logo" className="w-39 " />
          <p className="text-center text-gray-500 text-sm font-medium">
            Bem-vindo à Smart City do <br />
            <span className="text-[#145DA0] font-semibold">SENAI ROBERTO MANGE</span>
          </p>
        </header>

        <h2 className="text-center text-3xl font-bold text-[#145DA0] mb-8">
          Login na Plataforma
        </h2>

        <form onSubmit={logar} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-gray-600 mb-2 text-sm font-medium">
              Usuário
            </label>
            <input
              id="username"
              type="text"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              placeholder="Digite seu usuário"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#145DA0] outline-none bg-gray-100 text-gray-800 transition duration-150"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-600 mb-2 text-sm font-medium">
              Senha
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha"
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#145DA0] outline-none bg-gray-100 text-gray-800 transition duration-150"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#145DA0] transition-colors"
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#145DA0] hover:bg-[#1e65b1] text-white font-semibold py-3 rounded-md transition duration-200"
          >
            Entrar
          </button>
        </form>

        <footer className="mt-6 text-center">
          <button
            onClick={() => navigate("/signup")}
            className="text-sm text-[#145DA0] hover:underline transition"
          >
            Ainda não sou cadastrado
          </button>
        </footer>
      </section>
    </main>
  );
}
