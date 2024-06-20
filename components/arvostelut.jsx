import axios from 'axios';

let palvelin = 'http://localhost:8080/';

export const getArvostelut = async () => {
  try {
    const response = await axios.get(palvelin + 'arvostelu/all');
    return (response);
  } catch (error) {
    return ({ status: 500, message: 'Haku ei onnistunut: ' + error.message });
  }
}

export const addArvostelu = async (arvostelu) => {
  try {
    const response = await axios.post(palvelin + 'arvostelu/add', arvostelu, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    return (response);
  } catch (error) {
    return ({ status: 500, message: 'Lisäys ei onnistunut: ' + error.message });
  }
}

export const deleteArvostelu = async (id) => {
  try {
    const response = await axios.delete(palvelin + 'arvostelu/delete/' + id);
    return (response);
  } catch (error) {
    return ({ status: error.status, message: 'Poisto ei onnistunut: ' + error.message });
  }
}

export const editArvostelu = async (id, arvostelu) => {
  console.log(arvostelu); // Lisätty console.log-tulostus
  try {
    const response = await axios.put(palvelin + 'arvostelu/edit/' + id, arvostelu,  {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    return response;
  } catch (error) {
    return { status: error.status, message: 'Muokkaus ei onnistunut: ' + error.message };
  }
}