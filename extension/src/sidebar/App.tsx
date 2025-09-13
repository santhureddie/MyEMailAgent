import React from 'react';
import EmailCategories from './components/EmailCategories';
import DraftSuggestions from './components/DraftSuggestions';
import RemindersList from './components/RemindersList';
import VoiceInterface from './components/VoiceInterface';

const App: React.FC = () => {
  return (
    <div className="h-full w-full flex flex-col bg-white shadow-lg">
      <header className="p-4 border-b text-lg font-bold">EmailAgent</header>
      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        <EmailCategories />
        <DraftSuggestions />
        <RemindersList />
        <VoiceInterface />
      </main>
    </div>
  );
};

export default App;
