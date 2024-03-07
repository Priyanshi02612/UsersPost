import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Posts from "./components/Posts";
import PostDetails from "./components/PostDetails";
import Users from "./components/Users";
import UsersToDo from "./components/UsersToDo";

function App() {
  return (
    <div className="container-fluid p-0" id="topOfThePage">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Posts />} />
          <Route path="/users" element={<Users />} />
          <Route path="/post/:postId" element={<PostDetails />} />
          <Route path="/user/:userId" element={<UsersToDo />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
