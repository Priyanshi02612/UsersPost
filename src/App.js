import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Posts from "./components/Posts";
import PostDetails from "./components/PostDetails";
import Users from "./components/Users";
import UserInfo from "./components/UserInfo";

function App() {
  return (
    <div className="container-fluid" id="topOfThePage">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Posts />} />
          <Route path="/users" element={<Users />} />
          <Route path="/post/:postId" element={<PostDetails />} />
          <Route path="/user/:userId" element={<UserInfo />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
