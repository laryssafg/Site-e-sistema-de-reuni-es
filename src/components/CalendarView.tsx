/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Meeting } from '../types';
import { 
  ChevronLeft, 
  ChevronRight, 
  Search, 
  Plus, 
  Filter,
  MoreVertical,
  Clock,
  Building2,
  Calendar as CalendarIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CalendarViewProps {
  meetings: Meeting[];
  onAddMeeting: () => void;
  onEditMeeting: (meeting: Meeting) => void;
  onDeleteMeeting: (id: string) => void;
}

export default function CalendarView({ meetings, onAddMeeting, onEditMeeting, onDeleteMeeting }: CalendarViewProps) {
  const [view, setView] = useState<'Dia' | 'Semana' | 'Mês'>('Semana');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);
  const [selectedDaySummary, setSelectedDaySummary] = useState<string>(new Date().toISOString().split('T')[0]);
  const [showSummary, setShowSummary] = useState(false);

  const hours = Array.from({ length: 14 }, (_, i) => i + 8); // 08:00 to 21:00

  // Mock week logic - in a real app, use date-fns or similar
  const getDaysOfWeek = (date: Date) => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay());
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(startOfWeek);
      d.setDate(startOfWeek.getDate() + i);
      return d;
    });
  };

  // Navigation logic based on view
  const navigate = (direction: 'next' | 'prev') => {
    const newDate = new Date(currentDate);
    if (view === 'Dia') {
      newDate.setDate(currentDate.getDate() + (direction === 'next' ? 1 : -1));
    } else if (view === 'Semana') {
      newDate.setDate(currentDate.getDate() + (direction === 'next' ? 7 : -7));
    } else {
      newDate.setMonth(currentDate.getMonth() + (direction === 'next' ? 1 : -1));
    }
    setCurrentDate(newDate);
  };

  const days = view === 'Dia' ? [currentDate] : 
               view === 'Semana' ? getDaysOfWeek(currentDate) : 
               getDaysOfMonth(currentDate);

  function getDaysOfMonth(date: Date) {
    const start = new Date(date.getFullYear(), date.getMonth(), 1);
    const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const daysArr = [];
    
    // Padding from previous month
    const startPadding = start.getDay();
    for (let i = startPadding; i > 0; i--) {
      const d = new Date(start);
      d.setDate(start.getDate() - i);
      daysArr.push(d);
    }
    
    // Current month days
    for (let i = 1; i <= end.getDate(); i++) {
        daysArr.push(new Date(date.getFullYear(), date.getMonth(), i));
    }
    
    // Padding for next month to complete the week
    const endPadding = 6 - end.getDay();
    for (let i = 1; i <= endPadding; i++) {
        const d = new Date(end);
        d.setDate(end.getDate() + i);
        daysArr.push(d);
    }

    return daysArr;
  }

  const statusColors: Record<string, string> = {
    'Agendada': 'bg-blue-100 text-blue-700 border-blue-200',
    'Confirmada': 'bg-emerald-100 text-emerald-700 border-emerald-200',
    'Realizada': 'bg-gray-100 text-gray-700 border-gray-200',
    'Cancelada': 'bg-rose-100 text-rose-700 border-rose-200',
    'Reagendada': 'bg-amber-100 text-amber-700 border-amber-200',
  };

  const filteredMeetings = meetings.filter(m => 
    m.nome_reuniao.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.empresa.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.responsavel?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.vendedor_responsavel?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-full overflow-hidden flex-col lg:flex-row">
      <div className="flex-1 flex flex-col bg-white overflow-hidden">
        {/* Top Header */}
        <header className="p-3 lg:p-4 border-b border-gray-100 flex flex-col sm:flex-row space-y-3 sm:space-y-0 items-center justify-between shrink-0">
          <div className="flex items-center space-x-2 lg:space-x-4 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            <h2 className="text-lg lg:text-xl font-bold text-gray-800 hidden sm:block">Agendamentos</h2>
            <div className="flex items-center space-x-1 bg-gray-100 p-1 rounded-lg shrink-0">
              {['Dia', 'Semana', 'Mês'].map((v) => (
                <button
                  key={v}
                  onClick={() => setView(v as any)}
                  className={`px-3 py-1 text-[10px] lg:text-xs font-bold rounded-md transition-all ${
                    view === v ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500'
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
            <div className="flex items-center space-x-1 lg:space-x-2 shrink-0">
              <button 
                onClick={() => navigate('prev')}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ChevronLeft size={18} />
              </button>
              <button 
                onClick={() => setCurrentDate(new Date())}
                className="px-2 lg:px-3 py-1 text-[10px] lg:text-xs font-bold text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Hoje
              </button>
              <button 
                onClick={() => navigate('next')}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ChevronRight size={18} />
              </button>
              <span className="text-[11px] lg:text-sm font-bold text-gray-700 whitespace-nowrap">
                {currentDate.toLocaleDateString('pt-BR', { 
                  month: view === 'Mês' ? 'long' : 'short', 
                  year: 'numeric',
                  day: view === 'Dia' ? 'numeric' : undefined 
                })}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
              <input
                type="text"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-3 py-1.5 lg:py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 outline-none w-full sm:w-40 lg:w-64"
              />
            </div>
            <button className="p-1.5 lg:p-2 text-gray-500 hover:bg-gray-100 rounded-xl">
              <Filter size={16} />
            </button>
            <button
              onClick={onAddMeeting}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 lg:px-4 py-1.5 lg:py-2 rounded-xl text-xs font-bold flex items-center shadow-lg shadow-blue-100 whitespace-nowrap"
            >
              <Plus size={16} className="mr-1" />
              Novo
            </button>
          </div>
        </header>

        {/* Calendar/List View Container */}
        <div className="flex-1 overflow-auto relative bg-gray-50">
          {/* Desktop/Tablet Grid View */}
          <div className={`hidden lg:grid ${
            view === 'Dia' ? 'grid-cols-[80px_1fr]' : 
            view === 'Semana' ? 'grid-cols-[80px_repeat(7,1fr)]' : 
            'grid-cols-7'
          } min-w-[1000px] h-full bg-white`}>
            
            {/* Header with Days (Only for Day/Week) */}
            {view !== 'Mês' && (
              <>
                <div className="bg-gray-50 border-r border-b border-gray-100" />
                {days.map((day) => (
                  <div 
                    key={day.toISOString()} 
                    onClick={() => {
                      setSelectedDaySummary(day.toISOString().split('T')[0]);
                      setShowSummary(true);
                    }}
                    className={`bg-gray-50 border-b border-r border-gray-100 p-4 text-center cursor-pointer hover:bg-blue-50 transition-colors ${
                      selectedDaySummary === day.toISOString().split('T')[0] ? 'bg-blue-50/50 ring-1 ring-inset ring-blue-200' : ''
                    }`}
                  >
                    <p className="text-xs font-bold text-gray-400 mb-1">
                      {day.toLocaleDateString('pt-BR', { weekday: 'short' }).toUpperCase()}
                    </p>
                    <p className={`text-lg font-bold ${
                      day.toDateString() === new Date().toDateString() ? 'text-blue-600' : 'text-gray-700'
                    }`}>
                      {day.getDate()}
                    </p>
                  </div>
                ))}
              </>
            )}

            {/* Grid Body (Time-based for Day/Week) */}
            {view !== 'Mês' && hours.map((hour) => (
              <React.Fragment key={hour}>
                <div className="border-r border-b border-gray-100 bg-gray-50 py-4 text-center">
                  <span className="text-xs font-bold text-gray-400">{hour.toString().padStart(2, '0')}:00</span>
                </div>
                
                {days.map((day) => {
                  const dayStr = day.toISOString().split('T')[0];
                  const meetingsAtHour = filteredMeetings.filter(m => 
                    m.data === dayStr && m.hora_inicio.startsWith(hour.toString().padStart(2, '0'))
                  );

                  return (
                    <div key={`${dayStr}-${hour}`} className="border-r border-b border-gray-100 relative group min-h-[80px]">
                      {meetingsAtHour.map((meeting) => (
                        <motion.div
                          layoutId={`meeting-${meeting.id}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedMeeting(meeting);
                          }}
                          key={meeting.id}
                          className={`absolute inset-x-1 top-1 p-2 rounded-lg border shadow-sm cursor-pointer z-10 transition-transform active:scale-95 ${statusColors[meeting.status]}`}
                        >
                          <p className="text-[10px] font-bold truncate leading-tight">{meeting.nome_reuniao}</p>
                          <p className="text-[9px] opacity-80 truncate">{meeting.empresa}</p>
                        </motion.div>
                      ))}
                    </div>
                  );
                })}
              </React.Fragment>
            ))}

            {/* Month Grid */}
            {view === 'Mês' && (
              <>
                {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(d => (
                   <div key={d} className="bg-gray-50 border-b border-r border-gray-100 p-2 text-center text-[10px] font-bold text-gray-400">
                     {d.toUpperCase()}
                   </div>
                ))}
                {days.map((day) => {
                  const dayStr = day.toISOString().split('T')[0];
                  const dayMeetings = filteredMeetings.filter(m => m.data === dayStr);
                  const isCurrentMonth = day.getMonth() === currentDate.getMonth();

                  return (
                    <div 
                      key={day.toISOString()} 
                      onClick={() => {
                        setSelectedDaySummary(dayStr);
                        setShowSummary(true);
                      }}
                      className={`min-h-[120px] p-2 border-r border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer ${
                        !isCurrentMonth ? 'opacity-40 bg-gray-50' : 'bg-white'
                      } ${selectedDaySummary === dayStr ? 'ring-1 ring-inset ring-blue-200 bg-blue-50/20' : ''}`}
                    >
                      <span className={`text-xs font-bold ${
                        day.toDateString() === new Date().toDateString() ? 'text-blue-600' : 'text-gray-700'
                      }`}>{day.getDate()}</span>
                      
                      <div className="mt-1 space-y-1">
                        {dayMeetings.slice(0, 3).map(m => (
                          <div key={m.id} className={`text-[9px] px-1.5 py-0.5 rounded border truncate ${statusColors[m.status]}`}>
                            {m.hora_inicio} {m.nome_reuniao}
                          </div>
                        ))}
                        {dayMeetings.length > 3 && (
                          <div className="text-[8px] font-bold text-gray-400 pl-1">
                            +{dayMeetings.length - 3} mais
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>

          {/* mobile List View */}
          <div className="lg:hidden p-4 space-y-4">
            <h3 className="text-sm font-bold text-gray-700 flex items-center">
              {currentDate.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
            </h3>
            
            <div className="space-y-3">
              {filteredMeetings.filter(m => {
                if (view === 'Dia') return m.data === currentDate.toISOString().split('T')[0];
                if (view === 'Semana') {
                  const start = days[0].toISOString().split('T')[0];
                  const end = days[6].toISOString().split('T')[0];
                  return m.data >= start && m.data <= end;
                }
                return m.data.startsWith(currentDate.toISOString().slice(0, 7)); // Month
              }).length > 0 ? (
                filteredMeetings
                  .filter(m => {
                    if (view === 'Dia') return m.data === currentDate.toISOString().split('T')[0];
                    if (view === 'Semana') {
                      const start = days[0].toISOString().split('T')[0];
                      const end = days[6].toISOString().split('T')[0];
                      return m.data >= start && m.data <= end;
                    }
                    return m.data.startsWith(currentDate.toISOString().slice(0, 7)); // Month
                  })
                  .sort((a,b) => `${a.data} ${a.hora_inicio}`.localeCompare(`${b.data} ${b.hora_inicio}`))
                  .map(meeting => (
                    <motion.div
                      key={meeting.id}
                      onClick={() => setSelectedMeeting(meeting)}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-4 rounded-2xl border bg-white shadow-sm flex items-center space-x-4 active:scale-[0.98] transition-all`}
                    >
                      <div className={`w-2 h-12 rounded-full shrink-0 ${
                        meeting.status === 'Confirmada' ? 'bg-emerald-500' : 
                        meeting.status === 'Cancelada' ? 'bg-rose-500' : 'bg-blue-500'
                      }`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-1">
                          <p className="text-xs font-bold text-gray-400 capitalize">{new Date(meeting.data).toLocaleDateString('pt-BR', { weekday: 'short' })} • {meeting.hora_inicio}</p>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${statusColors[meeting.status]}`}>{meeting.status}</span>
                        </div>
                        <h4 className="text-sm font-bold text-gray-800 truncate">{meeting.nome_reuniao}</h4>
                        <p className="text-xs text-gray-500 truncate">{meeting.empresa}</p>
                      </div>
                    </motion.div>
                  ))
              ) : (
                <div className="bg-white p-8 rounded-2xl border border-gray-100 text-center space-y-2">
                  <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto">
                    <CalendarIcon size={24} className="text-gray-300" />
                  </div>
                  <p className="text-sm font-medium text-gray-800">Sem compromissos</p>
                  <button onClick={onAddMeeting} className="text-blue-600 text-xs font-bold">Agendar Reunião</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Side Summary */}
      <AnimatePresence>
        {showSummary && (
          <motion.aside 
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="w-80 border-l border-gray-100 bg-white p-6 overflow-y-auto hidden xl:flex flex-col relative"
          >
            <button 
              onClick={() => setShowSummary(false)}
              className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={18} className="text-gray-400" />
            </button>

            <h3 className="font-bold text-gray-800 mb-6 flex items-center pr-8">
              <CalendarIcon size={18} className="mr-2 text-blue-500" />
              Resumo: {new Date(selectedDaySummary + 'T12:00:00').toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' })}
            </h3>
            
            <div className="space-y-4 flex-1">
              {meetings.filter(m => m.data === selectedDaySummary).length > 0 ? (
                 meetings
                 .filter(m => m.data === selectedDaySummary)
                 .sort((a,b) => a.hora_inicio.localeCompare(b.hora_inicio))
                 .map(meeting => (
                   <div key={meeting.id} className="bg-gray-50 p-4 rounded-xl border border-gray-100 space-y-2 hover:border-blue-200 transition-colors cursor-pointer" onClick={() => setSelectedMeeting(meeting)}>
                 <div className="flex justify-between items-start">
                   <h4 className="text-sm font-bold text-gray-800 line-clamp-2">{meeting.nome_reuniao}</h4>
                   <span className={`w-2 h-2 rounded-full mt-1 ${
                     meeting.status === 'Confirmada' ? 'bg-emerald-500' : 'bg-blue-500'
                   }`} />
                 </div>
                 <p className="text-xs text-gray-500 flex items-center">
                   <Building2 size={12} className="mr-1" /> {meeting.empresa}
                 </p>
                 <p className="text-xs font-bold text-blue-600">{meeting.hora_inicio} - {meeting.hora_fim}</p>
               </div>
             ))
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-400 text-sm">Sem reuniões para hoje.</p>
            </div>
          )}
        </div>

        <div className="mt-10 bg-blue-600 rounded-2xl p-6 text-white text-center relative overflow-hidden shadow-lg shadow-blue-200">
          <div className="relative z-10">
            <h4 className="font-bold mb-2">Produtividade Alta!</h4>
            <p className="text-xs text-blue-100 mb-4">Você tem {meetings.length} reuniões esta semana.</p>
            <button 
              onClick={onAddMeeting}
              className="w-full bg-white text-blue-600 py-2 rounded-xl text-xs font-bold hover:bg-blue-50 transition-colors"
            >
              Criar Novo Slot
            </button>
          </div>
          <div className="absolute top-0 right-0 -mr-6 -mt-6 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
        </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Modal Reunião */}
      <AnimatePresence>
        {selectedMeeting && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-800">Detalhes da Reunião</h3>
                <button 
                  onClick={() => setSelectedMeeting(null)}
                  className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                >
                  <X size={24} className="text-gray-400" />
                </button>
              </div>
              <div className="p-8 space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-1">Status: {selectedMeeting.status}</h4>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedMeeting.nome_reuniao}</h2>
                  <p className="text-gray-500 font-medium">{selectedMeeting.empresa}</p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-gray-400 uppercase">Responsável</p>
                    <p className="text-sm font-semibold text-gray-700">{selectedMeeting.responsavel}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-gray-400 uppercase">Vendedor</p>
                    <p className="text-sm font-semibold text-gray-700">{selectedMeeting.vendedor_responsavel}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-gray-400 uppercase">Horário</p>
                    <p className="text-sm font-semibold text-gray-700">{selectedMeeting.hora_inicio} - {selectedMeeting.hora_fim}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-gray-400 uppercase">Tipo</p>
                    <p className="text-sm font-semibold text-gray-700">{selectedMeeting.tipo_reuniao}</p>
                  </div>
                </div>

                {selectedMeeting.observacoes && (
                  <div className="space-y-1 p-4 bg-gray-50 rounded-2xl">
                    <p className="text-[10px] font-bold text-gray-400 uppercase">Observações</p>
                    <p className="text-sm text-gray-600 italic">"{selectedMeeting.observacoes}"</p>
                  </div>
                )}

                <div className="flex space-x-3 pt-6 border-t border-gray-100">
                  <button
                    onClick={() => {
                        onEditMeeting(selectedMeeting);
                        setSelectedMeeting(null);
                    }}
                    className="flex-1 bg-blue-600 text-white py-3 rounded-2xl text-sm font-bold shadow-lg shadow-blue-100 active:scale-95 transition-all"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => {
                        onDeleteMeeting(selectedMeeting.id);
                        setSelectedMeeting(null);
                    }}
                    className="px-6 py-3 border border-rose-100 text-rose-600 rounded-2xl text-sm font-bold hover:bg-rose-50 active:scale-95 transition-all"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function X({ size, className }: { size?: number, className?: string }) {
    return <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>;
}
