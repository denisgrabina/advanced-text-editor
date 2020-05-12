export default async (queryWord) => {
  const url = 'https://api.datamuse.com/words';
  try {
    const response = await fetch(`${url}?ml=${queryWord}`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};
