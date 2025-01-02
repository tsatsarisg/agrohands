const fetchLocationSuggestions = async (input: string) => {
  try {
    const response = await fetch(
      `https://photon.komoot.io/api/?q=${input}&limit=5`
    );
    const data = await response.json();
    return data.features;
  } catch (error) {
    console.error("Error fetching suggestions: ", error);
  }
};

export { fetchLocationSuggestions };
