import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer } from "react-toastify";
import { UserProvider } from "./Context/userAuth";


// Navbar: 모든 라우트에서 공통으로 렌더링되는 ui
// Outlet: 라우터의 자식 컴포넌트가 렌더링되는 자리
//         React Router DOM에서 부모-자식 라우트 구조가 설정되어 있으면, 현재 라우트에 맞는 자식 컴포넌트가 Outlet 자리에서 렌더링됨.

function App() {
  return (
    <>
      <UserProvider>
        <Navbar />
        <Outlet />
        <ToastContainer />
      </UserProvider>
    </>
  );
}

export default App;