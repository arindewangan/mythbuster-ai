// pages/mythBuster.js
import { useState } from 'react';
import axios from 'axios';
import Result from '@/components/Result'; // Ensure the path is correct based on your project structure

export default function MythBuster() {
  const [myth, setMyth] = useState('');
  const [evaluation, setEvaluation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await axios.post('/api/evaluateMyth', { myth });

      if (response.status === 200) {
        setEvaluation(response.data);
      } else {
        setError('Failed to evaluate the myth');
      }
    } catch (error) {
      console.error('Error during myth evaluation:', error);
      setError('An error occurred while evaluating the myth');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {!evaluation ? (
        <div className="min-h-screen bg-cover bg-center flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md bg-opacity-90">
            <h1 className="text-3xl font-extrabold mb-6 text-center text-blue-600">Myth Buster</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="text"
                value={myth}
                onChange={(e) => setMyth(e.target.value)}
                placeholder="Enter a health myth"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
              >
                {loading ? (
                  <div className="flex justify-center items-center">
                    <div className="spinner-border animate-spin inline-block w-6 h-6 border-4 rounded-full text-white"></div>
                    <span className="ml-2">Evaluating...</span>
                  </div>
                ) : (
                  "Evaluate Myth"
                )}
              </button>
            </form>

            {error && (
              <div className="mt-6 text-red-600 text-center">{error}</div>
            )}
          </div>
        </div>
      ) : (
        <Result evaluation={evaluation} />
      )}
    </div>
  );
}
