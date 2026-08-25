'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Ticket,
  Settings,
  ShieldAlert,
  LogOut,
  Plus,
  Edit2,
  Trash2,
  Check,
  Save,
  DollarSign,
  TrendingUp,
  Clock,
  Phone,
  Mail,
  ExternalLink,
  Search,
  Sparkles,
  AlertCircle,
  Eye,
  RefreshCw,
  Percent,
} from 'lucide-react';
import { useAdminStore } from '@/store/useAdminStore';
import { Product } from '@/types';
import { formatBRL } from '@/utils/formatters';
import { BlessLogo } from '@/components/ui/BlessLogo';

type AdminTab = 'dashboard' | 'products' | 'orders' | 'coupons' | 'settings' | 'security';

export default function AdminDashboardPage() {
  const router = useRouter();
  const {
    isAuthenticated,
    user,
    logout,
    adminCredentials,
    updateCredentials,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    config,
    updateConfig,
    coupons,
    addCoupon,
    toggleCoupon,
    deleteCoupon,
    orders,
    updateOrderStatus,
  } = useAdminStore();

  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [mounted, setMounted] = useState(false);
  const [saveSuccessMessage, setSaveSuccessMessage] = useState('');

  // Search & Filter in Products Tab
  const [productSearch, setProductSearch] = useState('');
  const [productFilterTech, setProductFilterTech] = useState<'all' | 'laser' | 'sublimation'>('all');

  // Product Modal Form State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [productForm, setProductForm] = useState<Omit<Product, 'id'>>({
    name: '',
    slug: '',
    category: 'copos',
    technique: 'laser',
    description: '',
    basePrice: 69.9,
    minQuantity: 1,
    image: '/bless.png',
    images: ['/bless.png'],
    featured: true,
    badge: 'Mais Vendido',
    dimensions: '18 x 9 cm',
    material: 'Aço Inox 304 com Parede Dupla',
    customizationArea: '8 x 14 cm',
    availableColors: ['#0A1128', '#D4AF37', '#FFFFFF', '#000000'],
    tierDiscounts: [
      { minQty: 10, maxQty: 49, discountPercentage: 15, label: '10 a 49 un (-15%)' },
      { minQty: 50, maxQty: 99, discountPercentage: 25, label: '50 a 99 un (-25%)' },
      { minQty: 100, maxQty: null, discountPercentage: 35, label: '100+ un (-35%)' },
    ],
  });

  // Settings Form State
  const [settingsForm, setSettingsForm] = useState(config);

  // Security Form State
  const [securityUsername, setSecurityUsername] = useState('');
  const [securityEmail, setSecurityEmail] = useState('');
  const [securityCurrentPass, setSecurityCurrentPass] = useState('');
  const [securityNewPass, setSecurityNewPass] = useState('');
  const [securityConfirmPass, setSecurityConfirmPass] = useState('');
  const [securityError, setSecurityError] = useState('');

  // New Coupon Form State
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponDiscount, setNewCouponDiscount] = useState(10);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isAuthenticated) {
      router.push('/admin/login');
    }
  }, [mounted, isAuthenticated, router]);

  useEffect(() => {
    if (config) {
      setSettingsForm(config);
    }
  }, [config]);

  useEffect(() => {
    if (adminCredentials) {
      setSecurityUsername(adminCredentials.username);
      setSecurityEmail(adminCredentials.email);
    }
  }, [adminCredentials]);

  const showToast = (msg: string) => {
    setSaveSuccessMessage(msg);
    setTimeout(() => {
      setSaveSuccessMessage('');
    }, 3500);
  };

  const handleLogout = () => {
    logout();
    router.push('/admin/login');
  };

  // Product Modal Open for Create
  const handleOpenCreateProduct = () => {
    setEditingProductId(null);
    setProductForm({
      name: '',
      slug: '',
      category: 'copos',
      technique: 'laser',
      description: '',
      basePrice: 49.9,
      minQuantity: 1,
      image: '/bless.png',
      images: ['/bless.png'],
      featured: true,
      badge: 'Novo',
      dimensions: '15 x 8 cm',
      material: 'Aço Inox / Cerâmica',
      customizationArea: '8 x 10 cm',
      availableColors: ['#0A1128', '#D4AF37', '#FFFFFF'],
      tierDiscounts: [
        { minQty: 10, maxQty: 49, discountPercentage: 15, label: '10 a 49 un (-15%)' },
        { minQty: 50, maxQty: 99, discountPercentage: 25, label: '50 a 99 un (-25%)' },
        { minQty: 100, maxQty: null, discountPercentage: 35, label: '100+ un (-35%)' },
      ],
    });
    setIsProductModalOpen(true);
  };

  // Product Modal Open for Edit
  const handleOpenEditProduct = (prod: Product) => {
    setEditingProductId(prod.id);
    setProductForm({
      name: prod.name,
      slug: prod.slug,
      category: prod.category,
      technique: prod.technique,
      description: prod.description,
      basePrice: prod.basePrice,
      minQuantity: prod.minQuantity,
      image: prod.image,
      images: prod.images,
      featured: prod.featured || false,
      badge: prod.badge || '',
      dimensions: prod.dimensions || '',
      material: prod.material || '',
      customizationArea: prod.customizationArea || '',
      availableColors: prod.availableColors,
      tierDiscounts: prod.tierDiscounts,
    });
    setIsProductModalOpen(true);
  };

  // Save Product
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name.trim()) return;

    const slug =
      productForm.slug.trim() ||
      productForm.name
        .toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-');

    if (editingProductId) {
      updateProduct(editingProductId, { ...productForm, slug });
      showToast('Produto atualizado com sucesso!');
    } else {
      addProduct({ ...productForm, slug });
      showToast('Novo produto cadastrado com sucesso!');
    }
    setIsProductModalOpen(false);
  };

  // Save Settings
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateConfig(settingsForm);
    showToast('Configurações do site salvas com sucesso!');
  };

  // Save Security
  const handleSaveSecurity = (e: React.FormEvent) => {
    e.preventDefault();
    setSecurityError('');

    if (securityCurrentPass !== adminCredentials.passwordHash) {
      setSecurityError('A senha atual informada está incorreta.');
      return;
    }

    if (securityNewPass && securityNewPass !== securityConfirmPass) {
      setSecurityError('A nova senha e a confirmação não coincidem.');
      return;
    }

    updateCredentials(securityUsername, securityNewPass || undefined, securityEmail);
    setSecurityCurrentPass('');
    setSecurityNewPass('');
    setSecurityConfirmPass('');
    showToast('Credenciais de administrador atualizadas com sucesso!');
  };

  // Add Coupon
  const handleAddCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode.trim()) return;

    addCoupon({
      code: newCouponCode.trim().toUpperCase(),
      discountPercentage: Number(newCouponDiscount),
      active: true,
    });
    setNewCouponCode('');
    showToast(`Cupom ${newCouponCode.toUpperCase()} criado!`);
  };

  if (!mounted || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#070D1E] flex items-center justify-center text-slate-400 text-sm">
        Carregando painel de controle...
      </div>
    );
  }

  // Filtered Products
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.category.toLowerCase().includes(productSearch.toLowerCase());
    const matchesTech =
      productFilterTech === 'all' || p.technique === productFilterTech;
    return matchesSearch && matchesTech;
  });

  // Calculate Metrics
  const totalRevenue = orders.reduce((acc, o) => acc + o.total, 0);
  const totalOrders = orders.length;
  const inProdOrders = orders.filter((o) => o.status === 'in_production').length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#040814] via-[#070D1E] to-[#0A1128] text-slate-100 flex flex-col md:flex-row">
      {/* Toast Notification */}
      {saveSuccessMessage && (
        <div className="fixed top-6 right-6 z-50 p-4 rounded-2xl bg-emerald-600 text-white shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 font-bold text-sm">
          <Check className="w-5 h-5 bg-white/20 p-1 rounded-full" />
          <span>{saveSuccessMessage}</span>
        </div>
      )}

      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-[#0A1128] border-r border-slate-800/80 flex flex-col shrink-0">
        {/* Brand Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg border border-bless-gold/40 bg-[#070D1E] p-0.5 flex items-center justify-center">
              <BlessLogo size={28} variant="icon" />
            </div>
            <div>
              <span className="font-serif font-black text-lg text-bless-gold tracking-wider block">
                BLESS
              </span>
              <span className="text-[9px] uppercase tracking-widest text-slate-400 block -mt-1">
                Admin CMS
              </span>
            </div>
          </Link>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        </div>

        {/* User Info Card */}
        <div className="p-4 mx-4 my-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-bless-gold/20 text-bless-gold font-bold flex items-center justify-center">
              {user?.username.charAt(0).toUpperCase() || 'A'}
            </div>
            <div className="truncate">
              <span className="font-bold text-slate-200 block truncate">
                {user?.name || 'Administrador'}
              </span>
              <span className="text-[10px] text-slate-400 block truncate">
                {user?.email || adminCredentials.email}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto text-xs font-semibold">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
              activeTab === 'dashboard'
                ? 'bg-bless-gold text-slate-950 font-bold shadow-gold-glow'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <LayoutDashboard className="w-4 h-4 shrink-0" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
              activeTab === 'products'
                ? 'bg-bless-gold text-slate-950 font-bold shadow-gold-glow'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <div className="flex items-center gap-3">
              <Package className="w-4 h-4 shrink-0" />
              <span>Gerenciar Produtos</span>
            </div>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/20">
              {products.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
              activeTab === 'orders'
                ? 'bg-bless-gold text-slate-950 font-bold shadow-gold-glow'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-4 h-4 shrink-0" />
              <span>Pedidos & Clientes</span>
            </div>
            {inProdOrders > 0 && (
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500 text-slate-950">
                {inProdOrders}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('coupons')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
              activeTab === 'coupons'
                ? 'bg-bless-gold text-slate-950 font-bold shadow-gold-glow'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Ticket className="w-4 h-4 shrink-0" />
            <span>Cupons de Desconto</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
              activeTab === 'settings'
                ? 'bg-bless-gold text-slate-950 font-bold shadow-gold-glow'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Settings className="w-4 h-4 shrink-0" />
            <span>Configurações do Site</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
              activeTab === 'security'
                ? 'bg-bless-gold text-slate-950 font-bold shadow-gold-glow'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>Usuário & Senha</span>
          </button>
        </nav>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Ver Loja Online</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-xs font-semibold transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Encerrar Sessão</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {/* ======================================================== */}
        {/* TAB 1: DASHBOARD METRICS                                 */}
        {/* ======================================================== */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-100">Visão Geral da Loja</h2>
              <p className="text-xs text-slate-400 mt-1">
                Acompanhe o faturamento, produtos cadastrados e atividade de personalização
              </p>
            </div>

            {/* Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="p-6 rounded-3xl bg-[#0A1128] border border-slate-800 shadow-xl space-y-2">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-semibold uppercase tracking-wider">Faturamento Total</span>
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                    <DollarSign className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-black text-emerald-400">{formatBRL(totalRevenue)}</div>
                <span className="text-[11px] text-slate-500">Últimos pedidos registrados</span>
              </div>

              <div className="p-6 rounded-3xl bg-[#0A1128] border border-slate-800 shadow-xl space-y-2">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-semibold uppercase tracking-wider">Total de Pedidos</span>
                  <div className="w-8 h-8 rounded-xl bg-bless-gold/10 text-bless-gold flex items-center justify-center">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-black text-slate-100">{totalOrders}</div>
                <span className="text-[11px] text-amber-400 font-medium">{inProdOrders} em produção</span>
              </div>

              <div className="p-6 rounded-3xl bg-[#0A1128] border border-slate-800 shadow-xl space-y-2">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-semibold uppercase tracking-wider">Produtos Ativos</span>
                  <div className="w-8 h-8 rounded-xl bg-bless-laser-blue/10 text-bless-laser-blue flex items-center justify-center">
                    <Package className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-black text-slate-100">{products.length}</div>
                <span className="text-[11px] text-slate-500">Laser e Sublimação HD</span>
              </div>

              <div className="p-6 rounded-3xl bg-[#0A1128] border border-slate-800 shadow-xl space-y-2">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-semibold uppercase tracking-wider">WhatsApp Conectado</span>
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                    <Phone className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-sm font-bold text-slate-200 truncate">{config.phoneDisplay}</div>
                <span className="text-[11px] text-emerald-400">Recebendo pedidos diretamente</span>
              </div>
            </div>

            {/* Quick Actions & Recent Orders */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Recent Orders List (2 Cols) */}
              <div className="lg:col-span-2 p-6 rounded-3xl bg-[#0A1128] border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-slate-100">Pedidos Recentes</h3>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="text-xs text-bless-gold hover:underline font-semibold"
                  >
                    Ver todos ({orders.length}) →
                  </button>
                </div>

                <div className="divide-y divide-slate-800/80">
                  {orders.map((ord) => (
                    <div key={ord.id} className="py-3 flex items-center justify-between text-xs">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-bless-gold">{ord.id}</span>
                          <span className="font-semibold text-slate-200">{ord.customerName}</span>
                        </div>
                        <p className="text-[11px] text-slate-400">{ord.itemsSummary}</p>
                      </div>
                      <div className="text-right">
                        <span className="block font-bold text-emerald-400">{formatBRL(ord.total)}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-medium">
                          {ord.status === 'in_production' ? 'Em Produção' : ord.status === 'paid' ? 'Pago' : 'Pendente'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Config Summary (1 Col) */}
              <div className="p-6 rounded-3xl bg-[#0A1128] border border-slate-800 space-y-4">
                <h3 className="font-bold text-sm text-slate-100">Ações Rápidas</h3>
                <div className="space-y-2">
                  <button
                    onClick={handleOpenCreateProduct}
                    className="w-full py-2.5 px-4 rounded-xl bg-bless-gold text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-gold-glow"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Cadastrar Novo Produto</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('settings')}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold text-xs flex items-center justify-center gap-2"
                  >
                    <Settings className="w-4 h-4" />
                    <span>Alterar WhatsApp & Chave Pix</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('coupons')}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold text-xs flex items-center justify-center gap-2"
                  >
                    <Ticket className="w-4 h-4" />
                    <span>Criar Cupom de Desconto</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: PRODUCT CATALOG MANAGEMENT                        */}
        {/* ======================================================== */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-100">Catálogo de Produtos</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Adicione, edite preços, descontos por atacado e técnicas de personalização
                </p>
              </div>
              <button
                onClick={handleOpenCreateProduct}
                className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-bless-gold to-bless-gold-dark text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-gold-glow cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Adicionar Produto</span>
              </button>
            </div>

            {/* Filters Bar */}
            <div className="flex flex-col sm:flex-row items-center gap-3 p-4 rounded-2xl bg-[#0A1128] border border-slate-800">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  placeholder="Buscar produto por nome ou categoria..."
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-200 outline-none focus:border-bless-gold"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setProductFilterTech('all')}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold ${
                    productFilterTech === 'all' ? 'bg-bless-gold text-slate-950 font-bold' : 'bg-slate-900 text-slate-300'
                  }`}
                >
                  Todos ({products.length})
                </button>
                <button
                  onClick={() => setProductFilterTech('laser')}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold ${
                    productFilterTech === 'laser' ? 'bg-bless-laser-blue text-slate-950 font-bold' : 'bg-slate-900 text-slate-300'
                  }`}
                >
                  Laser
                </button>
                <button
                  onClick={() => setProductFilterTech('sublimation')}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold ${
                    productFilterTech === 'sublimation' ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-slate-900 text-slate-300'
                  }`}
                >
                  Sublimação
                </button>
              </div>
            </div>

            {/* Products Table */}
            <div className="rounded-3xl bg-[#0A1128] border border-slate-800 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900/90 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
                    <tr>
                      <th className="p-4">Produto</th>
                      <th className="p-4">Técnica</th>
                      <th className="p-4">Preço Unitário</th>
                      <th className="p-4">Atacado 10+</th>
                      <th className="p-4">Atacado 100+</th>
                      <th className="p-4 text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {filteredProducts.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-900/40 transition-colors">
                        <td className="p-4 flex items-center gap-3">
                          <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-slate-800 bg-[#070D1E] shrink-0">
                            <Image src={p.image} alt={p.name} fill className="object-contain" />
                          </div>
                          <div>
                            <span className="font-bold text-slate-100 block">{p.name}</span>
                            <span className="text-[10px] text-slate-400 uppercase tracking-wider">
                              {p.category} {p.badge ? `• ${p.badge}` : ''}
                            </span>
                          </div>
                        </td>
                        <td className="p-4">
                          <span
                            className={`px-2.5 py-1 rounded-full font-bold text-[10px] uppercase ${
                              p.technique === 'laser'
                                ? 'bg-bless-laser-blue/15 text-bless-laser-blue border border-bless-laser-blue/30'
                                : 'bg-amber-400/15 text-amber-300 border border-amber-400/30'
                            }`}
                          >
                            {p.technique === 'laser' ? 'Gravação a Laser' : 'Sublimação HD'}
                          </span>
                        </td>
                        <td className="p-4 font-bold text-slate-100">{formatBRL(p.basePrice)}</td>
                        <td className="p-4 font-semibold text-emerald-400">
                          {formatBRL(p.basePrice * 0.85)} (-15%)
                        </td>
                        <td className="p-4 font-semibold text-emerald-400">
                          {formatBRL(p.basePrice * 0.65)} (-35%)
                        </td>
                        <td className="p-4 text-right space-x-2">
                          <button
                            onClick={() => handleOpenEditProduct(p)}
                            className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-bless-gold transition-colors inline-flex items-center"
                            title="Editar Produto"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Deseja realmente remover o produto "${p.name}"?`)) {
                                deleteProduct(p.id);
                                showToast('Produto removido.');
                              }
                            }}
                            className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors inline-flex items-center"
                            title="Excluir Produto"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: ORDERS MANAGEMENT                                 */}
        {/* ======================================================== */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-100">Gerenciamento de Pedidos</h2>
              <p className="text-xs text-slate-400 mt-1">
                Visualize os pedidos recebidos e altere status de produção e envio
              </p>
            </div>

            <div className="rounded-3xl bg-[#0A1128] border border-slate-800 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900/90 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
                    <tr>
                      <th className="p-4">Pedido ID</th>
                      <th className="p-4">Cliente</th>
                      <th className="p-4">Itens</th>
                      <th className="p-4">Total</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Ação WhatsApp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {orders.map((ord) => (
                      <tr key={ord.id} className="hover:bg-slate-900/40 transition-colors">
                        <td className="p-4 font-mono font-bold text-bless-gold">{ord.id}</td>
                        <td className="p-4">
                          <span className="font-bold text-slate-100 block">{ord.customerName}</span>
                          <span className="text-[11px] text-slate-400">{ord.customerPhone}</span>
                        </td>
                        <td className="p-4 text-slate-300">{ord.itemsSummary}</td>
                        <td className="p-4 font-black text-emerald-400">{formatBRL(ord.total)}</td>
                        <td className="p-4">
                          <select
                            value={ord.status}
                            onChange={(e) => {
                              updateOrderStatus(ord.id, e.target.value as AdminOrder['status']);
                              showToast(`Status do pedido ${ord.id} atualizado.`);
                            }}
                            className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-slate-200 outline-none focus:border-bless-gold font-semibold"
                          >
                            <option value="pending">⏳ Pendente</option>
                            <option value="paid">✅ Pago</option>
                            <option value="in_production">⚙️ Em Produção</option>
                            <option value="shipped">🚚 Enviado</option>
                            <option value="delivered">🎉 Entregue</option>
                            <option value="cancelled">❌ Cancelado</option>
                          </select>
                        </td>
                        <td className="p-4 text-right">
                          <a
                            href={`https://wa.me/${ord.customerPhone.replace(/\D/g, '')}?text=${encodeURIComponent(
                              `Olá ${ord.customerName}! Aqui é da Bless Personalizados referente ao seu pedido ${ord.id}.`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 font-semibold inline-flex items-center gap-1.5 transition-colors"
                          >
                            <Phone className="w-3.5 h-3.5" />
                            <span>Conversar</span>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 4: COUPONS MANAGEMENT                                */}
        {/* ======================================================== */}
        {activeTab === 'coupons' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-100">Cupons de Desconto</h2>
              <p className="text-xs text-slate-400 mt-1">
                Crie códigos promocionais para impulsionar suas vendas
              </p>
            </div>

            {/* Add Coupon Form */}
            <form
              onSubmit={handleAddCoupon}
              className="p-6 rounded-3xl bg-[#0A1128] border border-slate-800 flex flex-col sm:flex-row items-center gap-4"
            >
              <div className="flex-1 w-full space-y-1">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Código do Cupom
                </label>
                <input
                  type="text"
                  required
                  value={newCouponCode}
                  onChange={(e) => setNewCouponCode(e.target.value)}
                  placeholder="EX: PROMO20"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-100 uppercase font-mono font-bold outline-none focus:border-bless-gold"
                />
              </div>

              <div className="w-full sm:w-48 space-y-1">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Desconto (%)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    max="90"
                    required
                    value={newCouponDiscount}
                    onChange={(e) => setNewCouponDiscount(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-100 font-bold outline-none focus:border-bless-gold"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">%</span>
                </div>
              </div>

              <div className="w-full sm:w-auto pt-5">
                <button
                  type="submit"
                  className="w-full sm:w-auto py-2.5 px-5 rounded-xl bg-bless-gold text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-gold-glow"
                >
                  <Plus className="w-4 h-4" />
                  <span>Criar Cupom</span>
                </button>
              </div>
            </form>

            {/* Coupons List */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {coupons.map((c) => (
                <div
                  key={c.code}
                  className="p-5 rounded-2xl bg-[#0A1128] border border-slate-800 flex items-center justify-between"
                >
                  <div>
                    <span className="font-mono font-black text-base text-bless-gold block">
                      {c.code}
                    </span>
                    <span className="text-xs text-emerald-400 font-bold">
                      {c.discountPercentage}% de desconto
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleCoupon(c.code)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${
                        c.active ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-500'
                      }`}
                    >
                      {c.active ? 'Ativo' : 'Pausado'}
                    </button>
                    <button
                      onClick={() => deleteCoupon(c.code)}
                      className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 5: GENERAL SITE CONFIGURATION                        */}
        {/* ======================================================== */}
        {activeTab === 'settings' && (
          <div className="space-y-6 max-w-3xl">
            <div>
              <h2 className="text-2xl font-bold text-slate-100">Configurações Gerais do Site</h2>
              <p className="text-xs text-slate-400 mt-1">
                Altere o WhatsApp de atendimento, chave Pix, frete grátis e mensagens em tempo real
              </p>
            </div>

            <form onSubmit={handleSaveSettings} className="space-y-6">
              {/* Contact Settings Card */}
              <div className="p-6 rounded-3xl bg-[#0A1128] border border-slate-800 space-y-4">
                <h3 className="font-bold text-sm text-bless-gold flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>Contatos Oficiais</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      WhatsApp (Número para Link sem formatação)
                    </label>
                    <input
                      type="text"
                      required
                      value={settingsForm.phoneWhatsapp}
                      onChange={(e) => setSettingsForm({ ...settingsForm, phoneWhatsapp: e.target.value })}
                      placeholder="Ex: 5511914317959"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-100 outline-none focus:border-bless-gold font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      WhatsApp (Texto Visível no Site)
                    </label>
                    <input
                      type="text"
                      required
                      value={settingsForm.phoneDisplay}
                      onChange={(e) => setSettingsForm({ ...settingsForm, phoneDisplay: e.target.value })}
                      placeholder="Ex: (11) 91431-7959"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-100 outline-none focus:border-bless-gold"
                    />
                  </div>

                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      E-mail de Suporte
                    </label>
                    <input
                      type="email"
                      required
                      value={settingsForm.supportEmail}
                      onChange={(e) => setSettingsForm({ ...settingsForm, supportEmail: e.target.value })}
                      placeholder="Ex: contato@blesspersonalizados.com.br"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-100 outline-none focus:border-bless-gold"
                    />
                  </div>
                </div>
              </div>

              {/* Payments & Shipping Card */}
              <div className="p-6 rounded-3xl bg-[#0A1128] border border-slate-800 space-y-4">
                <h3 className="font-bold text-sm text-bless-gold flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  <span>Pagamento Pix & Frete Grátis</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Chave Pix da Bless
                    </label>
                    <input
                      type="text"
                      required
                      value={settingsForm.pixKey}
                      onChange={(e) => setSettingsForm({ ...settingsForm, pixKey: e.target.value })}
                      placeholder="Ex: 5511914317959 ou CNPJ"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-100 outline-none focus:border-bless-gold font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Valor Mínimo para Frete Grátis (R$)
                    </label>
                    <input
                      type="number"
                      required
                      value={settingsForm.freeShippingThreshold}
                      onChange={(e) =>
                        setSettingsForm({
                          ...settingsForm,
                          freeShippingThreshold: Number(e.target.value),
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-100 outline-none focus:border-bless-gold font-bold"
                    />
                  </div>
                </div>
              </div>

              {/* Hero Banner Text Card */}
              <div className="p-6 rounded-3xl bg-[#0A1128] border border-slate-800 space-y-4">
                <h3 className="font-bold text-sm text-bless-gold flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  <span>Textos da Página Inicial (Hero)</span>
                </h3>

                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Título Principal da Hero
                    </label>
                    <input
                      type="text"
                      value={settingsForm.heroHeadline}
                      onChange={(e) => setSettingsForm({ ...settingsForm, heroHeadline: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-100 outline-none focus:border-bless-gold"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Subtítulo / Descrição da Hero
                    </label>
                    <textarea
                      rows={3}
                      value={settingsForm.heroSubheadline}
                      onChange={(e) => setSettingsForm({ ...settingsForm, heroSubheadline: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-100 outline-none focus:border-bless-gold"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="py-3 px-8 rounded-xl bg-gradient-to-r from-bless-gold via-amber-400 to-bless-gold-dark text-slate-950 font-bold uppercase tracking-wider text-xs shadow-gold-glow flex items-center gap-2 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Salvar Alterações</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 6: SECURITY & PASSWORD CHANGE                        */}
        {/* ======================================================== */}
        {activeTab === 'security' && (
          <div className="space-y-6 max-w-md">
            <div>
              <h2 className="text-2xl font-bold text-slate-100">Segurança de Acesso</h2>
              <p className="text-xs text-slate-400 mt-1">
                Altere seu nome de usuário, e-mail e senha de acesso ao painel
              </p>
            </div>

            {securityError && (
              <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{securityError}</span>
              </div>
            )}

            <form onSubmit={handleSaveSecurity} className="p-6 rounded-3xl bg-[#0A1128] border border-slate-800 space-y-4">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Usuário de Login
                </label>
                <input
                  type="text"
                  required
                  value={securityUsername}
                  onChange={(e) => setSecurityUsername(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-100 outline-none focus:border-bless-gold font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  E-mail do Administrador
                </label>
                <input
                  type="email"
                  required
                  value={securityEmail}
                  onChange={(e) => setSecurityEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-100 outline-none focus:border-bless-gold"
                />
              </div>

              <div className="pt-2 border-t border-slate-800 space-y-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Senha Atual (Obrigatória para confirmar)
                  </label>
                  <input
                    type="password"
                    required
                    value={securityCurrentPass}
                    onChange={(e) => setSecurityCurrentPass(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-100 outline-none focus:border-bless-gold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Nova Senha (opcional)
                  </label>
                  <input
                    type="password"
                    value={securityNewPass}
                    onChange={(e) => setSecurityNewPass(e.target.value)}
                    placeholder="Deixe em branco para manter a atual"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-100 outline-none focus:border-bless-gold"
                  />
                </div>

                {securityNewPass && (
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Confirme a Nova Senha
                    </label>
                    <input
                      type="password"
                      required
                      value={securityConfirmPass}
                      onChange={(e) => setSecurityConfirmPass(e.target.value)}
                      placeholder="Repita a nova senha"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-100 outline-none focus:border-bless-gold"
                    />
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3 px-4 rounded-xl bg-bless-gold text-slate-950 font-bold uppercase tracking-wider text-xs shadow-gold-glow flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Atualizar Credenciais</span>
              </button>
            </form>
          </div>
        )}
      </main>

      {/* ======================================================== */}
      {/* PRODUCT CREATE / EDIT MODAL                              */}
      {/* ======================================================== */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-8 bg-[#0A1128] border border-bless-gold/40 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-base text-slate-100">
                {editingProductId ? 'Editar Produto' : 'Cadastrar Novo Produto'}
              </h3>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-400 uppercase">Nome do Produto</label>
                <input
                  type="text"
                  required
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  placeholder="Ex: Copo Térmico 473ml Inox"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 outline-none focus:border-bless-gold"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-400 uppercase">Categoria</label>
                  <select
                    value={productForm.category}
                    onChange={(e) =>
                      setProductForm({
                        ...productForm,
                        category: e.target.value as Product['category'],
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 outline-none focus:border-bless-gold"
                  >
                    <option value="copos">Copos Térmicos</option>
                    <option value="canecas">Canecas</option>
                    <option value="garrafas">Garrafas Inox</option>
                    <option value="azulejos">Azulejos Decorativos</option>
                    <option value="chaveiros">Chaveiros Metálicos</option>
                    <option value="adesivos">Adesivos Vinílicos</option>
                    <option value="b2b">Kits Corporativos B2B</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-400 uppercase">Técnica Principal</label>
                  <select
                    value={productForm.technique}
                    onChange={(e) =>
                      setProductForm({
                        ...productForm,
                        technique: e.target.value as 'laser' | 'sublimation',
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 outline-none focus:border-bless-gold font-bold text-bless-gold"
                  >
                    <option value="laser">Gravação a Laser</option>
                    <option value="sublimation">Sublimação HD</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-400 uppercase">Preço Unitário Varejo (R$)</label>
                  <input
                    type="number"
                    step="0.10"
                    required
                    value={productForm.basePrice}
                    onChange={(e) =>
                      setProductForm({ ...productForm, basePrice: Number(e.target.value) })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 outline-none focus:border-bless-gold font-bold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-400 uppercase">Destaque / Badge</label>
                  <input
                    type="text"
                    value={productForm.badge || ''}
                    onChange={(e) => setProductForm({ ...productForm, badge: e.target.value })}
                    placeholder="Ex: Mais Vendido, Lançamento"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 outline-none focus:border-bless-gold"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-400 uppercase">Descrição do Produto</label>
                <textarea
                  rows={3}
                  required
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  placeholder="Informações sobre acabamento, durabilidade e especificações..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 outline-none focus:border-bless-gold"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="py-2.5 px-6 rounded-xl bg-bless-gold text-slate-950 font-bold shadow-gold-glow"
                >
                  Salvar Produto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
