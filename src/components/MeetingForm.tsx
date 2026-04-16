/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Meeting, MeetingStatus, MeetingType } from '../types';
import { Save, X, Building2, User, Phone, Mail, Calendar, MapPin, Link as LinkIcon, FileText } from 'lucide-react';

interface MeetingFormProps {
  initialData?: Meeting;
  meetings: Meeting[];
  onSave: (data: any) => void;
  onCancel: () => void;
}

export default function MeetingForm({ initialData, meetings, onSave, onCancel }: MeetingFormProps) {
  const [formData, setFormData] = useState<Partial<Meeting>>(initialData || {
    status: 'Agendada',
    tipo_reuniao: 'Online',
    data: new Date().toISOString().split('T')[0],
  });

  const [collision, setCollision] = useState<Meeting | null>(null);

  useEffect(() => {
    if (formData.vendedor_responsavel) {
      setCollision(checkCollision(formData));
    }
  }, []);

  const checkCollision = (data: Partial<Meeting>) => {
    if (!data.data || !data.hora_inicio || !data.hora_fim || !data.vendedor_responsavel) return null;

    const currentStart = data.hora_inicio;
    const currentEnd = data.hora_fim;
    const currentSalesPerson = data.vendedor_responsavel;
    const currentDate = data.data;

    return meetings.find(m => {
      // Ignorar se estiver editando a mesma reunião
      if (initialData && m.id === initialData.id) return false;
      
      // Regra: Mesmo Vendedor e Mesma Data
      if (m.data !== currentDate) return false;
      if (m.vendedor_responsavel !== currentSalesPerson) return false;
      
      // Lógica de Sobreposição: (InicioA < FimB) && (FimA > InicioB)
      return (currentStart < m.hora_fim) && (currentEnd > m.hora_inicio);
    }) || null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);
    
    // Check for collisions after state update
    if (['data', 'hora_inicio', 'hora_fim', 'vendedor_responsavel'].includes(name)) {
      setCollision(checkCollision(updatedData));
    }
  };

  return (
    <div className="p-4 lg:p-8 max-w-4xl mx-auto">
      <header className="mb-6 lg:mb-8">
        <h2 className="text-xl lg:text-2xl font-bold text-gray-800">{initialData ? 'Editar Reunião' : 'Nova Reunião'}</h2>
        <p className="text-xs lg:text-sm text-gray-500">Preencha todos os campos obrigatórios para salvar o agendamento.</p>
      </header>

      <form onSubmit={handleSubmit} className="bg-white p-5 lg:p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6 lg:space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          {/* Main Info */}
          <div className="space-y-4 md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700">Nome da Reunião *</label>
            <div className="relative">
              <FileText className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                required
                name="nome_reuniao"
                value={formData.nome_reuniao || ''}
                onChange={handleChange}
                placeholder="Ex: Alinhamento de Escopo"
                className="w-full pl-10 pr-4 py-3 lg:py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-base lg:text-sm"
              />
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-semibold text-gray-700">Empresa *</label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                required
                name="empresa"
                value={formData.empresa || ''}
                onChange={handleChange}
                placeholder="Nome da empresa"
                className="w-full pl-10 pr-4 py-3 lg:py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-base lg:text-sm"
              />
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-semibold text-gray-700">Responsável / Contato *</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                required
                name="responsavel"
                value={formData.responsavel || ''}
                onChange={handleChange}
                placeholder="Nome da pessoa"
                className="w-full pl-10 pr-4 py-3 lg:py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-base lg:text-sm"
              />
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-semibold text-gray-700">Telefone</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                name="telefone"
                value={formData.telefone || ''}
                onChange={handleChange}
                placeholder="(00) 00000-0000"
                className="w-full pl-10 pr-4 py-3 lg:py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-base lg:text-sm"
              />
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-semibold text-gray-700">E-mail *</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                required
                type="email"
                name="email"
                value={formData.email || ''}
                onChange={handleChange}
                placeholder="email@empresa.com"
                className="w-full pl-10 pr-4 py-3 lg:py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-base lg:text-sm"
              />
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-semibold text-gray-700">Data *</label>
            <input
              required
              type="date"
              name="data"
              value={formData.data || ''}
              onChange={handleChange}
              className="w-full px-4 py-3 lg:py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-base lg:text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-4">
              <label className="block text-sm font-semibold text-gray-700">Início *</label>
              <input
                required
                type="time"
                name="hora_inicio"
                value={formData.hora_inicio || ''}
                onChange={handleChange}
                className="w-full px-4 py-3 lg:py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 underline-none outline-none"
              />
            </div>
            <div className="space-y-4">
              <label className="block text-sm font-semibold text-gray-700">Término *</label>
              <input
                required
                type="time"
                name="hora_fim"
                value={formData.hora_fim || ''}
                onChange={handleChange}
                className="w-full px-4 py-3 lg:py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 underline-none outline-none"
              />
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-semibold text-gray-700">Tipo de Reunião *</label>
            <select
              name="tipo_reuniao"
              value={formData.tipo_reuniao}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              <option value="Online">Online</option>
              <option value="Presencial">Presencial</option>
              <option value="Chamada">Chamada</option>
            </select>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-semibold text-gray-700">Status *</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              <option value="Agendada">Agendada</option>
              <option value="Confirmada">Confirmada</option>
              <option value="Realizada">Realizada</option>
              <option value="Cancelada">Cancelada</option>
              <option value="Reagendada">Reagendada</option>
            </select>
          </div>

          <div className="space-y-4 md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700">Vendedor Responsável *</label>
            <input
              required
              name="vendedor_responsavel"
              value={formData.vendedor_responsavel || ''}
              onChange={handleChange}
              placeholder="Nome do consultor"
              className={`w-full px-4 py-2 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
                collision ? 'border-rose-300 ring-2 ring-rose-100' : 'border-gray-200'
              }`}
            />
            {collision && (
              <p className="text-xs font-bold text-rose-600 animate-pulse">
                ⚠️ Conflito de horário! O vendedor "{collision.vendedor_responsavel}" já possui uma reunião ({collision.nome_reuniao}) das {collision.hora_inicio} às {collision.hora_fim} neste dia.
              </p>
            )}
          </div>

          {formData.tipo_reuniao === 'Online' && (
            <div className="space-y-4 md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700">Link da Reunião</label>
              <div className="relative">
                <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  name="link_reuniao"
                  value={formData.link_reuniao || ''}
                  onChange={handleChange}
                  placeholder="https://meet.google.com/..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
            </div>
          )}

          {formData.tipo_reuniao === 'Presencial' && (
            <div className="space-y-4 md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700">Local / Endereço</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  name="local_reuniao"
                  value={formData.local_reuniao || ''}
                  onChange={handleChange}
                  placeholder="Endereço completo ou sala"
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
            </div>
          )}

          <div className="space-y-4 md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700">Observações</label>
            <textarea
              name="observacoes"
              value={formData.observacoes || ''}
              onChange={handleChange}
              rows={4}
              placeholder="Notas internas..."
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-6 border-t border-gray-100">
          <button
            type="button"
            onClick={onCancel}
            className="w-full sm:w-auto px-6 py-2 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={!!collision}
            className={`w-full sm:w-auto px-8 py-3 lg:py-2 rounded-xl text-sm font-bold flex items-center justify-center shadow-lg transition-all active:scale-95 ${
              collision 
                ? 'bg-gray-300 cursor-not-allowed text-gray-500' 
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200'
            }`}
          >
            <Save size={18} className="mr-2" />
            Salvar Reunião
          </button>
        </div>
      </form>
    </div>
  );
}
