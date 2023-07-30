import { guestItem } from '../types/guests';
import { PAGE_SIZE } from '../utils/constants';
import supabase from './supabase';

interface GetGuestsProps {
  page: number;
}

export async function getGuests({page}:GetGuestsProps) {
  let query = supabase.from('guests').select('*', { count: 'exact' });
 
  if (page) {
    const from = (page - 1) * (PAGE_SIZE - 1);
    const to = from + (PAGE_SIZE - 1);
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error('Guests could not be loaded.');
  }

  return { data, error, count };
}