module.exports = {
  content: [
    './src/sidebar/**/*.{js,ts,jsx,tsx}',
    './src/sidebar/components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        agentBlue: '#2563eb',
        agentGreen: '#22c55e',
        agentYellow: '#eab308',
        agentRed: '#ef4444'
      }
    }
  },
  plugins: []
};
