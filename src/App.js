import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Posts from "./Components/Posts";
import Comments from "./Components/Comments";
import Users from "./Components/Users";
import UserInfo from "./Components/UserInfo";

function App() {
  return (
    <div className="container-fluid">
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<Posts/>} />
          <Route path="/users" element={<Users/> } />
          <Route path="/post/:postId" element={<Comments/> } />
          <Route path="/user/:userId" element={<UserInfo/> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
