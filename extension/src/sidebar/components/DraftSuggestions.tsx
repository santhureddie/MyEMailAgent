import React from 'react';

const DraftSuggestions: React.FC = () => {
  // Placeholder for draft suggestions
  return (
    <section>
      <h2 className="text-md font-semibold mb-2">Draft Suggestions</h2>
      <div className="space-y-2">
        <div className="p-2 bg-gray-50 rounded">
          <div className="font-bold">Formal</div>
          <div className="text-sm">Thank you for your email. I will get back to you soon.</div>
          <div className="flex gap-2 mt-1">
            <button className="px-2 py-1 bg-blue-500 text-white rounded">Accept</button>
            <button className="px-2 py-1 bg-gray-300 rounded">Edit</button>
            <button className="px-2 py-1 bg-yellow-400 rounded">Regenerate</button>
          </div>
        </div>
        <div className="p-2 bg-gray-50 rounded">
          <div className="font-bold">Casual</div>
          <div className="text-sm">Hey! Got your message, will reply soon :)</div>
          <div className="flex gap-2 mt-1">
            <button className="px-2 py-1 bg-blue-500 text-white rounded">Accept</button>
            <button className="px-2 py-1 bg-gray-300 rounded">Edit</button>
            <button className="px-2 py-1 bg-yellow-400 rounded">Regenerate</button>
          </div>
        </div>
        <div className="p-2 bg-gray-50 rounded">
          <div className="font-bold">Quick</div>
          <div className="text-sm">Received, thanks!</div>
          <div className="flex gap-2 mt-1">
            <button className="px-2 py-1 bg-blue-500 text-white rounded">Accept</button>
            <button className="px-2 py-1 bg-gray-300 rounded">Edit</button>
            <button className="px-2 py-1 bg-yellow-400 rounded">Regenerate</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DraftSuggestions;
