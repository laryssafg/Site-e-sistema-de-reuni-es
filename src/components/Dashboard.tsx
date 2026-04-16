/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Meeting } from '../types';
import { 
  Users, 
  Calendar as CalendarIcon, 
  CheckCircle2, 
  XCircle, 
  Clock,
  TrendingUp
} from 'lucide-react';
import { motion } from 'motion/react';

interface DashboardProps {
  meetings: Meeting[];
}

export default function Dashboard({ meetings }: DashboardProps) {
  const today = new Date().toISOString().split('T')[0];
  
  const stats = {
    total: meetings.length,
    today: meetings.filter(m => m.data === today).length,
    week: meetings.length, // Simplified
    completed: meetings.filter(m => m.status === 'Realizada').length,
    cancelled: meetings.filter(m => m.status === 'Cancelada').length,
    next: meetings
      .filter(m => m.status === 'Agendada' || m.status === 'Confirmada')
      .sort((a, b) => `${a.data} ${a.hora_inicio}`.localeCompare(`${b.data} ${b.hora_inicio}`))[0]
  };

  const cards = [
    { label: 'Total de Reuniões', value: stats.total, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Reuniões de Hoje', value: stats.today, icon: CalendarIcon, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Reuniões Realizadas', value: stats.completed, icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Reuniões Canceladas', value: stats.cancelled, icon: XCircle, color: 'text-rose-600', bg: 'bg-rose-50' },
  ];

  return (
    <div className="space-y-6 lg:space-y-8 p-4 lg:p-8">
      <header>
        <h2 className="text-xl lg:text-2xl font-bold text-gray-800">Resumo Geral</h2>
        <p className="text-xs lg:text-sm text-gray-500">Dashboard da TechNova Systems.</p>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {cards.map((card, i) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={card.label}
            className="bg-white p-4 lg:p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left space-y-2 sm:space-y-0 sm:space-x-4"
          >
            <div className={`p-2 lg:p-3 rounded-xl ${card.bg}`}>
              <card.icon className={card.color} size={20} />
            </div>
            <div>
              <p className="text-[10px] lg:text-sm font-medium text-gray-500 line-clamp-1">{card.label}</p>
              <p className="text-xl lg:text-2xl font-bold text-gray-900">{card.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Next Meeting */}
        <div className="lg:col-span-1 bg-white p-5 lg:p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4 lg:mb-6">
            <h3 className="text-sm font-bold text-gray-800">Próxima Reunião</h3>
            <Clock className="text-blue-500" size={18} />
          </div>
          
          {stats.next ? (
            <div className="space-y-4">
              <div className="bg-blue-50 p-3 lg:p-4 rounded-xl border border-blue-100">
                <p className="text-xs lg:text-sm font-semibold text-blue-900">{stats.next.nome_reuniao}</p>
                <p className="text-[10px] lg:text-xs text-blue-700">{stats.next.empresa}</p>
              </div>
              <div className="grid grid-cols-1 gap-2">
                <p className="text-xs text-gray-600 flex items-center">
                  <CalendarIcon size={14} className="mr-2 shrink-0" /> {new Date(stats.next.data).toLocaleDateString()}
                </p>
                <p className="text-xs text-gray-600 flex items-center">
                  <Clock size={14} className="mr-2 shrink-0" /> {stats.next.hora_inicio} - {stats.next.hora_fim}
                </p>
                <p className="text-xs text-gray-600 flex items-center">
                  <Users size={14} className="mr-2 shrink-0" /> {stats.next.responsavel}
                </p>
              </div>
              <div className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold ${
                stats.next.status === 'Confirmada' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
              }`}>
                {stats.next.status}
              </div>
            </div>
          ) : (
            <p className="text-gray-400 text-center py-6 italic text-sm">Nenhuma reunião pendente.</p>
          )}
        </div>

        {/* Simplified Charts Replacement */}
        <div className="lg:col-span-2 bg-white p-5 lg:p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold text-gray-800">Tendência Semanal</h3>
            <TrendingUp className="text-emerald-500" size={18} />
          </div>
          
          <div className="h-32 lg:h-48 flex items-end justify-between space-x-2 px-2 lg:px-4">
            {['S', 'T', 'Q', 'Q', 'S', 'S', 'D'].map((day, i) => {
              // Calculate distribution of ALL meetings by day of week
              const meetingsInDay = meetings.filter(m => {
                const d = new Date(m.data + 'T12:00:00');
                const dayIndex = d.getDay(); // 0 is Sunday
                const adjustedIndex = dayIndex === 0 ? 6 : dayIndex - 1; // Map to 0=Seg, 6=Dom
                return adjustedIndex === i;
              }).length;
              const height = meetingsInDay > 0 ? Math.min(meetingsInDay * 20, 100) : 5; 
              
              return (
                <div key={`${day}-${i}`} className="flex-1 flex flex-col items-center space-y-2">
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    className="w-full bg-blue-100 rounded-t-lg relative group cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-blue-600 rounded-t-lg scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom duration-300" />
                    {meetingsInDay > 0 && (
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-gray-800 text-white text-[10px] px-1.5 py-0.5 rounded transition-opacity z-20">
                        {meetingsInDay}
                      </div>
                    )}
                  </motion.div>
                  <span className="text-[10px] lg:text-xs font-bold text-gray-400">{day}</span>
                </div>
              );
            })}
          </div>
          <div className="mt-8 pt-6 border-t border-gray-50">
            <h4 className="text-sm font-semibold text-gray-700 mb-4">Próximos compromissos</h4>
            <div className="space-y-3">
              {meetings
                .filter(m => new Date(m.data + 'T12:00:00').getTime() >= new Date().setHours(0,0,0,0))
                .sort((a,b) => `${a.data} ${a.hora_inicio}`.localeCompare(`${b.data} ${b.hora_inicio}`))
                .slice(0, 3)
                .map((meeting) => (
                <div key={meeting.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-800">{meeting.nome_reuniao}</p>
                      <p className="text-xs text-gray-500">{meeting.empresa}</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-gray-400">{meeting.hora_inicio}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
