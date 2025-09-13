import React from 'react';

const EmailCategories: React.FC = () => {
  // Placeholder for categorized emails
  return (
    <section>
      <h2 className="text-md font-semibold mb-2">Categories</h2>
      <div className="space-y-2">
        {/* Example categories */}
        <div className="p-2 bg-blue-50 rounded flex justify-between items-center">
          <span>Job Opportunities</span>
          <span className="text-xs text-blue-600">High</span>
        </div>
        <div className="p-2 bg-green-50 rounded flex justify-between items-center">
          <span>Personal</span>
          <span className="text-xs text-green-600">Medium</span>
        </div>
        <div className="p-2 bg-red-50 rounded flex justify-between items-center">
          <span>Urgent</span>
          <span className="text-xs text-red-600">Critical</span>
        </div>
      </div>
    </section>
  );
};

export default EmailCategories;
