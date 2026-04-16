/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Meeting } from '../types';
import { supabase } from '../lib/supabase';

const TABLE_NAME = 'meetings';

export const MeetingService = {
  async getAll(): Promise<Meeting[]> {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select('*')
      .order('data', { ascending: true })
      .order('hora_inicio', { ascending: true });

    if (error) {
      console.error('Error fetching meetings:', error);
      throw new Error('Failed to fetch meetings');
    }
    return data || [];
  },

  async create(meeting: Omit<Meeting, 'id' | 'created_at' | 'updated_at'>): Promise<Meeting> {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .insert([meeting])
      .select()
      .single();

    if (error) {
      console.error('Error creating meeting:', error);
      throw new Error('Failed to create meeting');
    }
    return data;
  },

  async update(id: string, meeting: Partial<Meeting>): Promise<Meeting> {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .update({ ...meeting, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating meeting:', error);
      throw new Error('Failed to update meeting');
    }
    return data;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from(TABLE_NAME)
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting meeting:', error);
      throw new Error('Failed to delete meeting');
    }
  }
};
