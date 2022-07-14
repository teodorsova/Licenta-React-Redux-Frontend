import './App.css';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Feed from './components/Feed/Feed';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import { useEffect } from 'react';
import Modeler from './components/UnityPage/3DModeler';
import Profile from './components/Profile/Profile';
import Footer from './components/Footer/Footer';
import SubscriptionPage from './components/Profile/SubscriptionPage';
import ProcessingPaymentPage from './components/Profile/ProcessingPaymentPage';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAsync } from './redux/users/thunks';
import Logout from './components/Login/Logout';
import { getSubscriptionAsync } from './redux/subscriptions/thunks';
import AddFurniture from './components/FurnitureControlPanel/AddFurniture';
import { Background, Parallax } from 'react-parallax';
import { Box } from '@chakra-ui/react';
import woodImage from './res/img/wood2.png'
import CheckOut from './components/CheckOut/CheckOut';
import Unity, { UnityContext } from "react-unity-webgl";
import OrdersDashboard from './components/Orders/OrdersDashboard';
import OrderControlPanel from './components/Orders/OrderControlPanel';

function App() {

  const unityContext = new UnityContext({
    loaderUrl: "UnityWebApp.loader.js",
    dataUrl: "UnityWebApp.data",
    frameworkUrl: "UnityWebApp.framework.js",
    codeUrl: "UnityWebApp.wasm",
  });


  const { user, isLoggingOut } = useSelector((state) => state.user)
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoggingOut) {
      dispatch(getUserAsync());
    }
  }, [dispatch, isLoggingOut])

  useEffect(() => {
    if (user === undefined || user === "") { }
    else {
      if (user.companyName !== "")
        dispatch(getSubscriptionAsync({ Id: user.id }))
    }
  }, [user, dispatch])

  function PrivateRoute({ children }) {
    return user.firstName === undefined ? <Navigate to='/login' /> : children;
  }

  function PrivateCompanyRoute({ children }) {
    return user.companyName === undefined || user.companyName === "" ? <Navigate to='/' /> : children;
  }

  return (
    <>
      <Parallax strength={800}>
        <Navbar />
        <Router>
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/modeler" element={
              <PrivateRoute>
                <Modeler unityContext={unityContext} />
              </PrivateRoute>} />
            <Route path="/profile" element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>} />
            <Route path="/addFurniture" element={
              <PrivateRoute>
                <PrivateCompanyRoute>
                  <AddFurniture />
                </PrivateCompanyRoute>
              </PrivateRoute>
            } />
            <Route path="/basket" element={
              <PrivateRoute>
                <CheckOut />
              </PrivateRoute>
            } />
            <Route path="/subscription" element={
              <PrivateRoute>
                <PrivateCompanyRoute>
                  <SubscriptionPage />
                </PrivateCompanyRoute>
              </PrivateRoute>
            } />
            <Route path="/orders" element={
              <PrivateRoute>
                <OrdersDashboard />
              </PrivateRoute>
            } />
            <Route path="/payment" element={
              <PrivateRoute>
                <PrivateCompanyRoute>
                  <ProcessingPaymentPage />
                </PrivateCompanyRoute>
              </PrivateRoute>
            } />
            <Route path="/requests" element={
              <PrivateRoute>
                <PrivateCompanyRoute>
                  <OrderControlPanel />
                </PrivateCompanyRoute>
              </PrivateRoute>
            } />
          </Routes>
        </Router>
        <Footer />
        <Background>
          <Box backgroundImage={woodImage} width="200vw" height="9000vh" backgroundRepeat="repeat" transform="translate(0, -100vh)"></Box>
        </Background>
      </Parallax>
    </>
  );
}

export default App;
