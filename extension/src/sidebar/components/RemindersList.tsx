import React from 'react';

const RemindersList: React.FC = () => {
  // Placeholder for reminders and to-dos
  return (
    <section>
      <h2 className="text-md font-semibold mb-2">Reminders</h2>
      <div className="space-y-2">
        <div className="p-2 bg-yellow-50 rounded flex justify-between items-center">
          <span>Follow up with recruiter</span>
          <span className="text-xs text-yellow-600">Due: Sep 15</span>
          <button className="ml-2 px-2 py-1 bg-green-500 text-white rounded">Complete</button>
        </div>
        <div className="p-2 bg-yellow-50 rounded flex justify-between items-center">
          <span>Send project update</span>
          <span className="text-xs text-yellow-600">Due: Sep 18</span>
          <button className="ml-2 px-2 py-1 bg-gray-300 rounded">Snooze</button>
        </div>
      </div>
    </section>
  );
};

export default RemindersList;
