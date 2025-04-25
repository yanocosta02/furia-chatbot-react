import Chatbot from "./components/Chatbot/Chatbot"; // Importa o componente principal
import "./App.css"; // CSS para estilizar a página em si, se necessário

function App() {
  return (
    <div className="App">
      {/* Você pode adicionar um título ou outros elementos na página aqui */}
      {/* <header><h1>Bem-vindo ao Chat da FURIA!</h1></header> */}
      <main>
        <Chatbot /> {/* Renderiza o chatbot */}
      </main>
      {/* <footer><p>Feito com ❤️ por um fã</p></footer> */}
    </div>
  );
}

export default App;
