import React from 'react';
import DOMPurify from 'dompurify';

const formatResponse = (response) => {
  // Step 1: Bold the text between ** and ** (star star and star star)
  let formattedResponse = response.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  // Step 2: Start a new line after **. (star star dot)
  formattedResponse = formattedResponse.replace(/\*\*\./g, '<strong>**.</strong><br />');

  return formattedResponse;
};

const Result = ({ evaluation }) => {
  // Determine if the evaluation is true or false based on the content
  const isTrue = evaluation.toLowerCase().includes("true");
  const isFalse = evaluation.toLowerCase().includes("false");

  // Set styles based on the evaluation result
  const resultStyle = isTrue
    ? "bg-green-100 border-green-500 text-green-700"
    : isFalse
    ? "bg-red-100 border-red-500 text-red-700"
    : "bg-gray-100 border-gray-500 text-gray-700";

  // Format and sanitize the evaluation content
  const formattedEvaluation = formatResponse(evaluation);
  const sanitizedEvaluation = DOMPurify.sanitize(formattedEvaluation);

  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center">
      <div className={`bg-white p-8 rounded-lg shadow-lg w-full max-w-md bg-opacity-90 border-l-4 ${resultStyle}`}>
        <h2 className="text-2xl font-bold mb-4 text-center">Myth Evaluation Result</h2>
        <div className="text-lg" dangerouslySetInnerHTML={{ __html: sanitizedEvaluation }} />
        <div className="mt-6 text-center">
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
          >
            Evaluate Another Myth
          </button>
        </div>
      </div>
    </div>
  );
};

export default Result;
