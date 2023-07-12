import supabase, { supabaseUrl } from './supabase';

export async function getCabins() {
  const { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be loaded.');
  }

  return data as Array<cabinItem>;
}

export async function deleteCabin(id: number) {
  const { data, error } = await supabase.from('cabins').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be loaded.');
  }

  return data;
}

interface cabinToUpdate extends Omit<cabinItem, 'id' | 'image'> {
  image: File | string;
}

export async function createEditCabin(
  newCabin: cabinToUpdate,
  id: number | undefined
) {
  const hasImagePath = typeof newCabin.image === 'string' ? true : false;

  const nameFromFile = !hasImagePath
    ? (newCabin?.image as File)?.name
    : undefined;
  const imageName = nameFromFile
    ? `${Math.random()}-${nameFromFile}`.replaceAll('/', '')
    : undefined;
  const imagePath = hasImagePath
    ? newCabin.image
    : imageName
    ? `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`
    : undefined;

  // 1. Create cabin
  let query = supabase.from('cabins');

  // A) CREATE
  if (!id) {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    query = query.insert([
      { ...newCabin, image: imagePath ? imagePath : null },
    ]);
  }

  // B) EDIT
  if (id) {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    query = query
      .update({ ...newCabin, image: imagePath ? imagePath : null })
      .eq('id', 'id');
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be created.');
  }

  const uploadedItem = data as Array<cabinItem>;

  // 2. Upload image
  if (imageName) {
    const { error: storageError } = await supabase.storage
      .from('cabin-images')
      .upload(imageName, newCabin.image);

    // 3. Delete the cabin IF there was an error uploading image
    if (storageError) {
      await supabase.from('cabins').delete().eq('id', uploadedItem[0].id);
      console.log(storageError);
      throw new Error(
        'Cabin image could not be uploaded and the cabin was not created'
      );
    }
  }

  return data as cabinItem;
}
