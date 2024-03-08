import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Posts from "./components/Posts";
import PostDetails from "./components/PostDetails";
import Users from "./components/Users";
import UsersToDo from "./components/UsersToDo";
import UsersCarts from "./components/UsersCarts";
import Products from "./components/Products";

function App() {
  return (
    <div className="container-fluid p-0" id="topOfThePage">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Posts />} />
          <Route path="/users" element={<Users />} />
          <Route path="/products" element={<Products />} />
          <Route path="/post/:postId" element={<PostDetails />} />
          <Route path="/user/:userId" element={<UsersToDo />} />
          <Route path="/user/:userId/carts" element={<UsersCarts />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
