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
  image: File;
}

export async function createCabin(newCabin: cabinToUpdate) {
  const nameFromFile = newCabin?.image?.name;
  const imageName = nameFromFile
    ? (`${Math.random()}-${nameFromFile}`.replaceAll('/', '') as string)
    : undefined;
  const imagePath = imageName
    ? `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`
    : undefined;

  // 1. Create cabin
  const { data, error } = await supabase
    .from('cabins')
    .insert([{ ...newCabin, image: imagePath ? imagePath : null }])
    .select();

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

  return data as Array<cabinItem>;
}
