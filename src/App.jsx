
import './App.css'
import Rain from './components/Rain'

function App() {


  return ( <div className="min-h-screen bg-gradient-to-b  flex flex-col items-center text-white">
  {/* Header */}
  <h1 className="text-4xl font-bold neon-text mt-8">
    Rain Grid Game UI
  </h1>

  {/* Instructions */}
  <p className="text-gray-400 mt-2">
    Watch the mesmerizing rain and enjoy the game-like experience!
  </p>

  {/* Grid */}
  <div className="mt-8 p-4 border-4 border-blue-500 rounded-lg shadow-lg ">
    <Rain rows={15} cols={20} />
  </div>

  {/* Footer Buttons */}
  <div className="mt-8 flex space-x-4">
    <button className="neon-button">Start Game</button>
    <button className="neon-button">Settings</button>
    <button className="neon-button">Quit</button>
  </div>
</div>
);
}

export default App
