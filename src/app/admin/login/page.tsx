'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, User, KeyRound, Eye, EyeOff, ShieldCheck, ArrowRight, AlertCircle, Sparkles } from 'lucide-react';
import { useAdminStore } from '@/store/useAdminStore';
import { BlessLogo } from '@/components/ui/BlessLogo';

export default function AdminLoginPage() {
  const router = useRouter();
  const { isAuthenticated, login, adminCredentials } = useAdminStore();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // If already authenticated, redirect to /admin
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/admin');
    }
  }, [isAuthenticated, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      const success = login(username, password);
      if (success) {
        router.push('/admin');
      } else {
        setError('Usuário ou senha incorretos. Verifique suas credenciais.');
        setIsLoading(false);
      }
    }, 400);
  };

  return (
    <div className="min-h-screen pt-28 pb-16 px-4 flex items-center justify-center bg-gradient-to-b from-[#040814] via-[#070D1E] to-[#0A1128] relative overflow-hidden">
      {/* Background Decorative Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-bless-gold/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-bless-laser-blue/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Glass Card Container */}
        <div className="rounded-3xl p-8 sm:p-10 bg-[#0A1128]/90 border border-bless-gold/40 shadow-2xl backdrop-blur-xl space-y-6">
          {/* Header Brand */}
          <div className="flex flex-col items-center text-center space-y-3 pb-4 border-b border-slate-800">
            <BlessLogo size={160} variant="full" />
            <div>
              <h1 className="font-serif font-black text-2xl text-slate-100 mt-2">
                Painel Administrativo
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                Acesso restrito para gestão e personalização da loja
              </p>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2.5 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username Input */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Usuário / E-mail
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Ex: admin"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700 focus:border-bless-gold focus:ring-1 focus:ring-bless-gold text-slate-100 text-sm outline-none transition-all placeholder:text-slate-500"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Senha de Acesso
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <KeyRound className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-11 py-3 rounded-xl bg-slate-900/90 border border-slate-700 focus:border-bless-gold focus:ring-1 focus:ring-bless-gold text-slate-100 text-sm outline-none transition-all placeholder:text-slate-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-200"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-bless-gold via-amber-400 to-bless-gold-dark text-slate-950 font-bold uppercase tracking-wider text-sm shadow-gold-glow hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <span>Verificando...</span>
              ) : (
                <>
                  <span>Entrar no Painel</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Initial Credentials Hint Box */}
          <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200/90 text-xs space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-amber-300">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Acesso Inicial do Administrador:</span>
            </div>
            <p className="text-[11px]">
              Usuário: <strong className="text-white font-mono bg-black/40 px-1.5 py-0.5 rounded">admin</strong> | Senha: <strong className="text-white font-mono bg-black/40 px-1.5 py-0.5 rounded">bless2026</strong>
            </p>
            <p className="text-[10px] text-amber-300/70 pt-0.5">
              *Você poderá alterar seu usuário e senha quando quiser na aba de Segurança do painel.
            </p>
          </div>

          <div className="text-center pt-2">
            <Link
              href="/"
              className="text-xs text-slate-400 hover:text-bless-gold transition-colors inline-flex items-center gap-1"
            >
              ← Voltar para a loja pública
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
