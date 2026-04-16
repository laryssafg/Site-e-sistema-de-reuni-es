/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Calendar, 
  Clock, 
  MessageCircle, 
  CheckCircle2, 
  ArrowRight, 
  Smartphone, 
  ShieldCheck, 
  TrendingUp, 
  X,
  Menu,
  ChevronRight,
  AlertCircle
} from 'lucide-react';

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const whatsappNumber = "5511944702197";
  const whatsappMessage = encodeURIComponent("Oi, vim pelo site e gostaria de mais informações.");
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="min-h-screen bg-[#0f142d] text-white font-sans selection:bg-blue-500/30 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0f142d]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-2 shrink-0">
              <img src="https://i.imgur.com/rf5Uglq.png" alt="TechNova Logo" className="h-10 w-auto" referrerPolicy="no-referrer" />
              <span className="text-xl font-bold tracking-tight">TechNova Agenda</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#solucao" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Solução</a>
              <a href="#beneficios" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Benefícios</a>
              <a href="#precos" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Preços</a>
              <a 
                href={whatsappLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-blue-600/20"
              >
                Começar agora
              </a>
            </div>

            <div className="md:hidden">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-[#0f142d] border-b border-white/5 p-4 space-y-4"
          >
            <a href="#solucao" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 text-gray-400 font-medium">Solução</a>
            <a href="#beneficios" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 text-gray-400 font-medium">Benefícios</a>
            <a href="#precos" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 text-gray-400 font-medium">Preços</a>
            <a 
              href={whatsappLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="block w-full bg-blue-600 text-center py-3 rounded-xl font-bold"
            >
              Falar no WhatsApp
            </a>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-48 lg:pb-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full mb-6">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">A partir de R$47/mês por usuário</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.1] mb-6">
                Pare de perder clientes por falta de <span className="text-blue-500">organização.</span>
              </h1>
              <p className="text-lg text-gray-400 mb-10 max-w-xl leading-relaxed">
                Automatize seus agendamentos, organize sua rotina e permita que seus clientes marquem horários sem depender de mensagens no WhatsApp.
              </p>
              
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <a 
                  href={whatsappLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center space-x-2 transition-all shadow-xl shadow-blue-600/20 group"
                >
                  <span>Quero mais informações</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </a>
                <a 
                  href={whatsappLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-8 py-4 rounded-2xl font-bold flex items-center justify-center space-x-2 transition-all shadow-xl"
                >
                  <MessageCircle size={18} />
                  <span>Falar no WhatsApp</span>
                </a>
              </div>

              <div className="mt-12 flex items-center space-x-6 grayscale opacity-50">
                <div className="flex flex-col">
                  <span className="text-xl font-bold">500+</span>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-gray-500">Empresas</span>
                </div>
                <div className="h-8 w-px bg-white/10" />
                <div className="flex flex-col">
                  <span className="text-xl font-bold">24/7</span>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-gray-500">Suporte</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10 bg-gradient-to-tr from-blue-600/20 to-transparent p-1 rounded-[2.5rem] border border-white/10 shadow-2xl">
                <img 
                  src="https://i.imgur.com/zxzjqe8.png" 
                  alt="TechNova Agenda Dashboard Mockup" 
                  className="rounded-[2rem] w-full h-auto shadow-2xl"
                  referrerPolicy="no-referrer"
                />
              </div>
              {/* Floating element 1 */}
              <div className="absolute -top-6 -right-6 z-20 bg-white p-4 rounded-2xl shadow-2xl hidden sm:block">
                <div className="flex items-center space-x-3">
                  <div className="bg-emerald-100 p-2 rounded-lg text-emerald-600">
                    <CheckCircle2 size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">Agendamento Realizado</p>
                    <p className="text-sm font-bold text-gray-800">Corte & Barba - 14:00</p>
                  </div>
                </div>
              </div>
              {/* Floating element 2 */}
              <div className="absolute -bottom-6 -left-6 z-20 bg-[#0f142d] border border-white/10 p-4 rounded-2xl shadow-2xl hidden sm:block">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-600 p-2 rounded-lg text-white">
                    <Clock size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">Próxima Reunião</p>
                    <p className="text-sm font-bold text-white">Em 15 minutos</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="py-20 lg:py-32 bg-white/5" id="solucao">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20">
          <h2 className="text-blue-500 font-bold uppercase tracking-[0.2em] text-xs mb-4">A dor do seu negócio</h2>
          <h3 className="text-3xl lg:text-5xl font-bold max-w-2xl mx-auto">Sua empresa continua perdendo clientes por isso?</h3>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Demora ao responder", desc: "Seus clientes não esperam. Se você demora 10 minutos, ele já procurou o concorrente." },
              { title: "Confusão com horários", desc: "Dois agendamentos no mesmo horário? O fim esperado é sempre um cliente insatisfeito." },
              { title: "Dependência de chats", desc: "Passar o dia respondendo 'quais horários você tem' drena sua produtividade." },
              { title: "Esquecimento total", desc: "Um cliente que não aparece é dinheiro jogado fora. Sem lembretes, isso acontece sempre." },
              { title: "Caos organizacional", desc: "Agenda de papel ou anotações perdidas impedem seu negócio de escalar profissionalmente." },
              { title: "Perda de tempo", desc: "Gastar horas organizando a agenda manualmente tira seu foco do que realmente importa: vender." }
            ].map((item, i) => (
              <div key={i} className="bg-[#0f142d] p-8 rounded-3xl border border-white/5 hover:border-blue-500/30 transition-all group">
                <div className="w-12 h-12 bg-rose-500/10 text-rose-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <AlertCircle size={24} />
                </div>
                <h4 className="text-xl font-bold mb-3">{item.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1">
              <img 
                src="https://i.imgur.com/1sDaS75.png" 
                alt="TechNova Solution Interface" 
                className="rounded-3xl shadow-2xl border border-white/5 shadow-blue-600/10"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-blue-500 font-bold uppercase tracking-[0.2em] text-xs mb-4">A solução definitiva</h2>
              <h3 className="text-3xl lg:text-5xl font-bold mb-8">Tecnologia que trabalha por você 24 horas.</h3>
              <p className="text-gray-400 mb-10 text-lg leading-relaxed">
                O TechNova Agenda profissionaliza sua empresa, eliminando as fricções que impedem seu crescimento. Deixe o sistema gerenciar o fluxo enquanto você foca na qualidade do seu serviço.
              </p>
              
              <ul className="space-y-6">
                {[
                  "Receba agendamentos online em tempo real",
                   "Organização total de horários e profissionais",
                   "Interface moderna e intuitiva para o cliente",
                   "Profissionalismo que gera confiança imediata",
                   "Sua agenda funcionando mesmo quando você dorme"
                ].map((text, i) => (
                  <li key={i} className="flex items-start">
                    <div className="bg-blue-600/10 text-blue-500 p-1 rounded-md mt-1 mr-4">
                      <CheckCircle2 size={16} />
                    </div>
                    <span className="font-semibold">{text}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-12">
                <a 
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-3 text-blue-500 font-bold hover:text-blue-400 transition-colors group"
                >
                  <span>Começar agora por R$47/mês</span>
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-20 lg:py-32 bg-blue-600/5" id="beneficios">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20">
          <h2 className="text-blue-500 font-bold uppercase tracking-[0.2em] text-xs mb-4">Benefícios Reais</h2>
          <h3 className="text-3xl lg:text-5xl font-bold max-w-2xl mx-auto">Feito para quem não tem tempo a perder</h3>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Calendar, title: "Self-Service", desc: "O cliente escolhe data e serviço sozinho." },
              { icon: Smartphone, title: "100% Mobile", desc: "Agende de onde estiver, em qualquer celular." },
              { icon: ShieldCheck, title: "Segurança", desc: "Seus dados protegidos com tecnologia Saas." },
              { icon: TrendingUp, title: "Escalabilidade", desc: "Cresça sua equipe sem perder o controle." }
            ].map((benefit, i) => (
              <div key={i} className="bg-white/5 p-8 rounded-[2rem] border border-white/5 text-center hover:bg-white/10 transition-all">
                <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-600/20">
                  <benefit.icon size={28} />
                </div>
                <h4 className="text-xl font-bold mb-3">{benefit.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 lg:py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Acesso Rápido", desc: "Seu cliente acessa seu link exclusivo de qualquer lugar." },
              { step: "02", title: "Escolha Livre", desc: "Ele seleciona o serviço desejado e o melhor horário disponível." },
              { step: "03", title: "Confirmação", desc: "O agendamento é feito com apenas alguns toques na tela." },
              { step: "04", title: "Gestão Total", desc: "Você recebe a notificação e tudo já aparece na sua agenda organizada." }
            ].map((item, i) => (
              <div key={i} className="relative group">
                <div className="text-6xl font-black text-white/5 absolute -top-10 left-0 group-hover:text-blue-500/10 transition-colors">{item.step}</div>
                <div className="relative z-10 pt-4">
                  <h4 className="text-xl font-bold mb-4 flex items-center">
                    <span className="w-8 h-px bg-blue-600 mr-3" />
                    {item.title}
                  </h4>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing/Offer */}
      <section className="py-20 lg:py-32" id="precos">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-b from-blue-600 to-blue-700 rounded-[2.5rem] p-8 sm:p-10 text-center shadow-2xl shadow-blue-600/20 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
             <div className="relative z-10">
               <h2 className="text-white/80 font-bold uppercase tracking-widest text-xs mb-6">Investimento Justo</h2>
               <h3 className="text-3xl lg:text-5xl font-extrabold mb-4">A partir de R$47</h3>
               <p className="text-xl text-blue-100 font-medium mb-10">por mês, por usuário.</p>
               
               <div className="max-w-md mx-auto space-y-4 mb-12">
                 {[
                   "Dashboard completo de gestão",
                   "Calendário inteligente dia/semana/mês",
                   "Cadastro ilimitado de reuniões",
                   "Filtros de busca ultra-rápidos",
                   "Suporte via WhatsApp especializado"
                 ].map((feature, i) => (
                   <div key={i} className="flex items-center justify-center space-x-3 text-sm">
                     <CheckCircle2 size={16} className="text-blue-200" />
                     <span className="font-semibold">{feature}</span>
                   </div>
                 ))}
               </div>

               <a 
                 href={whatsappLink}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="bg-white text-blue-600 px-10 py-5 rounded-2xl font-black text-lg hover:bg-blue-50 transition-all shadow-xl shadow-blue-800/20 block"
               >
                 QUERO MINHA AGENDA AGORA
               </a>
               <p className="mt-6 text-blue-200 text-xs font-bold uppercase tracking-widest">Ativação instantânea via WhatsApp</p>
             </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center mb-10 shadow-2xl shadow-blue-600/40">
            <Calendar size={36} />
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold mb-6 max-w-3xl">Pronto para profissionalizar sua agenda?</h2>
          <p className="text-gray-400 text-xl mb-12 max-w-2xl">
            Sua empresa não precisa perder mais clientes por falta de organização. Fale agora com a equipe TechNova Agenda e veja como funciona.
          </p>
          <a 
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-4 bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-5 rounded-2xl font-black text-xl transition-all shadow-2xl shadow-emerald-500/20"
          >
            <MessageCircle size={28} />
            <span>FALAR COM UM CONSULTOR</span>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <div className="flex flex-col items-center md:items-start space-y-2">
            <div className="flex items-center space-x-2">
              <img src="https://i.imgur.com/rf5Uglq.png" alt="Logo" className="h-8" referrerPolicy="no-referrer" />
              <span className="font-bold">TechNova Agenda</span>
            </div>
            <Link to="/app" className="text-[10px] text-gray-500 hover:text-blue-400 transition-colors uppercase font-bold tracking-widest pl-1">
              Acesso Restrito
            </Link>
          </div>
          <p className="text-gray-500 text-sm">© 2026 TechNova Systems. Todos os direitos reservados.</p>
          <div className="flex space-x-6 text-sm text-gray-500 font-medium">
             <a href="#" className="hover:text-blue-500 transition-colors">Termos</a>
             <a href="#" className="hover:text-blue-500 transition-colors">Privacidade</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
