import openai from './OpenAI';

//sets the model to be ready for the generation of the itinerary
export const generateItinerary = async (destination, setItinerary, setLoading, setError) => {
  if (!destination) {
    setError('Please enter a destination to generate an itinerary.');
    return;
  }

  setLoading(true);
  setError(null);

  try {
    const response = await openai.chat.completions.create({
  model: 'gpt-4o-mini',
  messages: [
    {
      role: 'system',
      content: 'You are a travel assistant that generates short, concise lists of places to visit with no additional descriptions or details. Only provide the names of the places in bullet points, no elaboration or extra information.',
    },
    {
      role: 'user',
      content: `I am going to ${destination}. Please give me a list of places to visit, no descriptions, in bullet points. Only the names of the places, 5-10 locations max.`,
    },
  ],
});


    const itineraryText = response.choices[0].message.content.trim();
    setItinerary(itineraryText);
  } catch (error) {
    console.error('Error generating itinerary:', error);
    setError('Failed to generate itinerary. Please try again.');
  } finally {
    setLoading(false);
  }
};
