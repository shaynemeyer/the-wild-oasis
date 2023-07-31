import { PostgrestError } from '@supabase/supabase-js';
import { guestItem } from '../types/guests';
import { PAGE_SIZE } from '../utils/constants';
import supabase from './supabase';

interface GetGuestsProps {
  page: number;
}

export interface GuestQueryResult {
  data: Array<guestItem>;
  error: PostgrestError | null;
  count: number;
}

export async function getGuests({ page }: GetGuestsProps) {
  let query = supabase.from('guests').select('*', { count: 'exact' });

  if (page) {
    const from = (page - 1) * (PAGE_SIZE - 1);
    const to = from + (PAGE_SIZE - 1);
    query = query.range(from, to);
  }

  const {
    data: guests,
    error,
    count,
  } = (await query) as unknown as GuestQueryResult;

  if (error) {
    console.error(error);
    throw new Error('Guests could not be loaded.');
  }

  return { guests, error, count };
}

export async function createGuestApi(
  newGuest: any,
) {
  const { data: createdGuest, error} = await supabase.from('guests').insert([{...newGuest}]).select().single();

  if (error) {
    console.log(error); 
    throw new Error("Guest could not be created");
  }

  return createdGuest as guestItem;
}

interface EditGuestApiProps {
  updateGuestData: guestItem; 
  id: number;
}
export async function editGuestApi({updateGuestData, id}: EditGuestApiProps) {
  const { data: updatedGuest, error } = await supabase.from('guests').update({ ...updateGuestData})
  .eq('id', id).select().single();

  if (error) {
    console.error(error);
    throw new Error('Guest could not be updated');
  }

  return updatedGuest as guestItem;
}

