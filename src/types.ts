/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type MeetingStatus = 'Agendada' | 'Confirmada' | 'Realizada' | 'Cancelada' | 'Reagendada';
export type MeetingType = 'Online' | 'Presencial' | 'Chamada';

export interface Meeting {
  id: string;
  nome_reuniao: string;
  empresa: string;
  responsavel: string;
  telefone: string;
  email: string;
  data: string; // ISO string YYYY-MM-DD
  hora_inicio: string; // HH:mm
  hora_fim: string; // HH:mm
  tipo_reuniao: MeetingType;
  status: MeetingStatus;
  vendedor_responsavel: string;
  observacoes?: string;
  link_reuniao?: string;
  local_reuniao?: string;
  created_at: string;
  updated_at: string;
}

export interface DashboardStats {
  total: number;
  today: number;
  week: number;
  completed: number;
  cancelled: number;
  nextMeeting?: Meeting;
}
