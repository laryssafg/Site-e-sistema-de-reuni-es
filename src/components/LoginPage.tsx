/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, Mail, Eye, EyeOff, LayoutDashboard } from 'lucide-react';

interface LoginPageProps {
  onLogin: (email: string, pass: string) => boolean;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate network delay
    setTimeout(() => {
      const success = onLogin(email, password);
      if (!success) {
        setError('E-mail ou senha incorretos.');
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 antialiased selection:bg-blue-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="text-center mb-10">
          <div className="mb-6 flex justify-center">
            <img 
              src="https://i.imgur.com/rf5Uglq.png" 
              alt="TechNova Systems Logo" 
              className="h-20 w-auto object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">TechNova Systems</h1>
          <p className="text-gray-500 mt-2 font-medium">Acesse sua conta para gerenciar agendamentos</p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl shadow-gray-200/50 p-8 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">E-mail Corporativo</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu.nome@technovasystems.com.br"
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-50/50 focus:border-blue-500 transition-all outline-none text-gray-800 placeholder:text-gray-400 font-medium"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Senha de Acesso</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-50/50 focus:border-blue-500 transition-all outline-none text-gray-800 placeholder:text-gray-400 font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-rose-50 text-rose-600 text-sm font-bold p-4 rounded-2xl border border-rose-100 flex items-center italic"
              >
                ⚠️ {error}
              </motion.div>
            )}

            <div className="flex items-center justify-between px-1">
              <label className="flex items-center space-x-2 cursor-pointer group">
                <input type="checkbox" className="w-5 h-5 rounded-lg border-gray-200 text-blue-600 focus:ring-blue-500 transition-all cursor-pointer" />
                <span className="text-sm text-gray-500 font-medium group-hover:text-gray-700 transition-colors">Lembrar de mim</span>
              </label>
              <button type="button" className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors">Esqueceu a senha?</button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-200 transition-all active:scale-[0.98] flex items-center justify-center space-x-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <span>Entrar no Sistema</span>
              )}
            </button>
          </form>
        </div>

        <p className="text-center mt-10 text-gray-400 text-sm font-medium">
          © 2026 TechNova Systems. Todos os direitos reservados.
        </p>
        <div className="text-center mt-6">
          <a href="/" className="text-sm font-bold text-blue-600 hover:underline">Voltar para o site</a>
        </div>
      </motion.div>
    </div>
  );
}
