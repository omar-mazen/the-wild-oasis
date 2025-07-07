import supabase, { supabaseUrl } from "./supabase";

export async function getCabins({ filter, sortBy }) {
  let query = supabase.from("cabins").select("*");
  if (filter) {
    if (filter.value == "with-discount") query = query.gt(filter.field, 0);
    else if (filter.value == "no-discount") query = query.lte(filter.field, 0);
  }
  if (sortBy)
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });
  const { data, error } = await query;
  if (error) {
    console.error(error.message);
    throw new Error("Cabins could not be loaded");
  }
  console;
  return data;
}
export async function createCabin(newCabin) {
  let imageName, imagePath;
  const isImageURLExist = Boolean(newCabin?.image?.startsWith?.(supabaseUrl));
  if (!isImageURLExist) {
    imageName = `${(Math.random() * 10e6).toFixed(0)}cabin-${newCabin.name}`;
    imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  }
  //add cabin data in cabin table
  const { data, error } = await supabase
    .from("cabins")
    .insert([isImageURLExist ? newCabin : { ...newCabin, image: imagePath }])
    .select()
    .single();

  if (error) {
    console.error(error.message);
    throw new Error("Cabin could not be added");
  }

  if (isImageURLExist) return data;

  // add the "image" to cabin-image bucket
  const { error: bucketError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);
  // if the image doesn't added to the bucket delete the cabin data that added to cabin table (because the image is fail to upload so it will not be exist)
  if (bucketError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(bucketError);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created"
    );
  }

  return data;
}
export async function updateCabin(cabin) {
  let imageName, imagePath;
  const isImageUpdated = Boolean(!cabin?.image?.startsWith?.(supabaseUrl));
  if (isImageUpdated) {
    imageName = `${(Math.random() * 10e6).toFixed(0)}cabin-${cabin.name}`;
    imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  }
  const { data, error } = await supabase
    .from("cabins")
    .update(isImageUpdated ? { ...cabin, image: imagePath } : cabin)
    .eq("id", cabin.id)
    .select()
    .single();
  if (error) {
    console.error(error.message);
    throw new Error("Cabin could not updated");
  }

  if (isImageUpdated) {
    const { error: bucketError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, cabin.image);
    if (bucketError) {
      await supabase.from("cabins").delete().eq("id", data.id);
      console.error(bucketError);
      throw new Error(
        "Cabin image could not be uploaded and the cabin was not created"
      );
    }
  }

  return data;
}
export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error.message);
    throw new Error("Cabin could not be deleted");
  }
  return data;
}
