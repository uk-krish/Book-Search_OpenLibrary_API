import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Sidebar from "./Component/Sidebar";
import HomeComponent from "./Component/HomeComponent";
import SearchBook from "./Component/SearchBook";
import ShowDetails from "./Component/ShowDetails";


const Layout = () => {
  return (
    <div className="flex flex-col w-full">
      <Sidebar/>
      <div className="mx-[120px]">
      <HomeComponent />
      <Outlet />
      </div>
    </div>
  );
};

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/Books",
          element:<SearchBook/>
        },
        {
          path: "/book/:id",
          element: <ShowDetails />,
        }
      ],
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
