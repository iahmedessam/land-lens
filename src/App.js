import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { store } from "./Redux/store";
import { Provider } from "react-redux";
import Layout from './Components/Layout/Layout'
import Home from './Components/Home/Home'
import NotFound from './Components/NotFound/NotFound'
import Country from "./Components/Country/Country";
import Countires from "./Components/Countires/Countires";

function App() {

  //Routing
  const routers = createBrowserRouter([
    {
      path: '/', element: <Layout />, children: [
        { index: true, element: <Home /> },
        { path: "countries", element: <Countires /> },        
        { path: "country/:name", element: <Country /> },
        { path: "*", element: <NotFound /> }
      ]
    }
  ]);

  return <>
    <Provider store={store}>
      <RouterProvider router={routers}>
      </RouterProvider>
    </Provider>
  </>
}

export default App;
