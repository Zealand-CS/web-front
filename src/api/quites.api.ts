import axios from 'axios';

export async function getQuote() {
  try {
    //random quotes
    const { data } = await axios.get('http://api.quotable.io/random');
    return data.content;
  } catch (error) {
    console.error(error);
  }
}
