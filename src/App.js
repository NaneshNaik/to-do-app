import './App.css';
import Navbar from './components/Navbar/Navbar';
import ToDoApp from './components/To-Do-App/ToDoApp'
import Notification from './components/Notification/Notification';
import { NotificationProvider } from './components/Notification/NotificationContext';

function App() {
  return (
    <NotificationProvider>
    <>
      <div className="page">
        <Navbar />
        <Notification position={`topCenter`} />
        <main className="main">
          <ToDoApp />
        </main>
      </div>
    </>
    </NotificationProvider>
  );
}

export default App;