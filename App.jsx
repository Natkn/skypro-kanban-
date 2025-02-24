import "./App.css";
import Header from "./src/components/Header";
import PopNewCard from "./src/components/PopNewCard";
import Popbrowse from "./src/components/PopBrowse";
import Column from "./src/components/Column";
import PopExit from "./src/components/PopExit";

function App() {
  return (
    <>
      <div className="wrapper">
        <PopExit />
        <PopNewCard />
        <Popbrowse />
        <Header />
        <main className="main">
          <div className="container">
            <div className="main__block">
              <Column />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
