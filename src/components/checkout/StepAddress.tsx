'use client';

import React, { useState } from 'react';
import { CustomerAddress, CustomerInfo, ShippingOption } from '@/types';
import { maskCEP, maskPhone, maskCPFOrCNPJ, formatBRL } from '@/utils/formatters';
import { MapPin, User, Phone, Mail, FileText, Truck, Search, Loader2, CheckCircle2 } from 'lucide-react';

interface StepAddressProps {
  customer: CustomerInfo;
  setCustomer: React.Dispatch<React.SetStateAction<CustomerInfo>>;
  address: CustomerAddress;
  setAddress: React.Dispatch<React.SetStateAction<CustomerAddress>>;
  shipping: ShippingOption;
  setShipping: React.Dispatch<React.SetStateAction<ShippingOption>>;
  onNext: () => void;
}

export const StepAddress: React.FC<StepAddressProps> = ({
  customer,
  setCustomer,
  address,
  setAddress,
  shipping,
  setShipping,
  onNext,
}) => {
  const [loadingCep, setLoadingCep] = useState(false);
  const [cepError, setCepError] = useState<string | null>(null);

  const shippingOptions: ShippingOption[] = [
    {
      id: 'sedex',
      name: 'SEDEX Expresso',
      price: 24.90,
      prazo: '1 a 3 dias úteis',
      carrier: 'Correios',
    },
    {
      id: 'pac',
      name: 'PAC Econômico',
      price: 14.90,
      prazo: '4 a 8 dias úteis',
      carrier: 'Correios',
    },
    {
      id: 'retirada',
      name: 'Retirada no Estúdio Bless',
      price: 0,
      prazo: 'Pronto em 24h',
      carrier: 'Estúdio Bless',
    },
  ];

  // Automatic ViaCEP API Search
  const handleCepLookup = async (cepValue: string) => {
    const cleanCep = cepValue.replace(/\D/g, '');
    if (cleanCep.length === 8) {
      setLoadingCep(true);
      setCepError(null);
      try {
        const res = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
        const data = await res.json();
        if (data.erro) {
          setCepError('CEP não encontrado. Preencha os dados manualmente.');
        } else {
          setAddress((prev) => ({
            ...prev,
            logradouro: data.logradouro || '',
            bairro: data.bairro || '',
            cidade: data.localidade || '',
            uf: data.uf || '',
          }));
        }
      } catch (err) {
        setCepError('Erro ao consultar CEP. Preencha os campos abaixo.');
      } finally {
        setLoadingCep(false);
      }
    }
  };

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const masked = maskCEP(e.target.value);
    setAddress((prev) => ({ ...prev, cep: masked }));
    if (masked.replace(/\D/g, '').length === 8) {
      handleCepLookup(masked);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer.nome || !customer.whatsapp || !address.cep || !address.logradouro || !address.numero) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 1. Customer Information */}
      <div className="rounded-3xl bg-[#0A1128] border border-bless-gold/30 p-6 sm:p-7 space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-100 flex items-center gap-2 pb-3 border-b border-slate-800">
          <User className="w-4 h-4 text-bless-gold" />
          1. Dados Pessoais / Contato
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
              Nome Completo *
            </label>
            <input
              type="text"
              required
              placeholder="Ex: João da Silva"
              value={customer.nome}
              onChange={(e) => setCustomer({ ...customer, nome: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 focus:border-bless-gold rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
              WhatsApp com DDD (para envio da prévia) *
            </label>
            <input
              type="text"
              required
              placeholder="(11) 99999-9999"
              value={customer.whatsapp}
              onChange={(e) => setCustomer({ ...customer, whatsapp: maskPhone(e.target.value) })}
              className="w-full bg-slate-900 border border-slate-700 focus:border-bless-gold rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
              E-mail para Confirmação *
            </label>
            <input
              type="email"
              required
              placeholder="seuemail@exemplo.com"
              value={customer.email}
              onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 focus:border-bless-gold rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
              CPF ou CNPJ (para emissão de NF-e)
            </label>
            <input
              type="text"
              placeholder="000.000.000-00"
              value={customer.documento}
              onChange={(e) => setCustomer({ ...customer, documento: maskCPFOrCNPJ(e.target.value) })}
              className="w-full bg-slate-900 border border-slate-700 focus:border-bless-gold rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* 2. Address & ViaCEP Auto-fill */}
      <div className="rounded-3xl bg-[#0A1128] border border-bless-gold/30 p-6 sm:p-7 space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-100 flex items-center gap-2 pb-3 border-b border-slate-800">
          <MapPin className="w-4 h-4 text-bless-laser-blue" />
          2. Endereço de Entrega
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
              CEP Brasileiro *
            </label>
            <div className="relative">
              <input
                type="text"
                required
                placeholder="00000-000"
                value={address.cep}
                onChange={handleCepChange}
                className="w-full bg-slate-900 border border-slate-700 focus:border-bless-gold rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none"
              />
              {loadingCep && (
                <Loader2 className="w-4 h-4 text-bless-gold animate-spin absolute right-3 top-3" />
              )}
            </div>
            {cepError && <p className="text-[10px] text-amber-400 mt-1">{cepError}</p>}
          </div>

          <div className="sm:col-span-2">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
              Rua / Logradouro *
            </label>
            <input
              type="text"
              required
              placeholder="Ex: Av. Paulista"
              value={address.logradouro}
              onChange={(e) => setAddress({ ...address, logradouro: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 focus:border-bless-gold rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
              Número *
            </label>
            <input
              type="text"
              required
              placeholder="123"
              value={address.numero}
              onChange={(e) => setAddress({ ...address, numero: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 focus:border-bless-gold rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
              Complemento
            </label>
            <input
              type="text"
              placeholder="Apto 42 / Bloco B"
              value={address.complemento || ''}
              onChange={(e) => setAddress({ ...address, complemento: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 focus:border-bless-gold rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
              Bairro *
            </label>
            <input
              type="text"
              required
              placeholder="Bela Vista"
              value={address.bairro}
              onChange={(e) => setAddress({ ...address, bairro: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 focus:border-bless-gold rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
              Cidade / UF *
            </label>
            <input
              type="text"
              required
              placeholder="São Paulo/SP"
              value={address.cidade ? `${address.cidade}/${address.uf}` : ''}
              onChange={(e) => {
                const parts = e.target.value.split('/');
                setAddress({
                  ...address,
                  cidade: parts[0] || '',
                  uf: parts[1] || '',
                });
              }}
              className="w-full bg-slate-900 border border-slate-700 focus:border-bless-gold rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* 3. Shipping Method Selector */}
      <div className="rounded-3xl bg-[#0A1128] border border-bless-gold/30 p-6 sm:p-7 space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-100 flex items-center gap-2 pb-3 border-b border-slate-800">
          <Truck className="w-4 h-4 text-emerald-400" />
          3. Opções de Envio & Frete
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {shippingOptions.map((opt) => {
            const isSelected = shipping.id === opt.id;
            return (
              <div
                key={opt.id}
                onClick={() => setShipping(opt)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-bless-gold/20 border-bless-gold shadow-gold-glow'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-white">{opt.name}</span>
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-bless-gold" />}
                </div>
                <p className="text-[11px] text-slate-400">Prazo: {opt.prazo}</p>
                <span className="text-sm font-black text-bless-gold block mt-2">
                  {opt.price === 0 ? 'Grátis' : formatBRL(opt.price)}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-4 rounded-2xl bg-gradient-to-r from-bless-gold-light via-bless-gold to-bless-gold-dark text-slate-950 font-black text-xs uppercase tracking-wider shadow-gold-glow hover:brightness-110 active:scale-98 transition-all"
      >
        Avançar para o Pagamento & Revisão
      </button>
    </form>
  );
};
