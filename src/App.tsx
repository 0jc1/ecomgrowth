import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Autoblog from './pages/AutoBlog';
import Tasks from './pages/Tasks';
import Settings from './pages/Settings';
import Orders from './pages/Orders';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import DefaultLayout from './layout/DefaultLayout';

function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const { pathname } = useLocation();

  const titleSuffix = 'EcomGrowth';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // useEffect(() => {
  //   setTimeout(() => setLoading(false), 1000);
  // }, []);

  return loading ? (
    <Loader />
  ) : (
    <DefaultLayout>
      <Routes>
        <Route
          index
          element={
            <>
              <PageTitle title={`eCommerce Dashboard | ${titleSuffix}`} />
              <ECommerce />
            </>
          }
        />
        <Route
          path="/calendar"
          element={
            <>
              <PageTitle title={`Calendar | ${titleSuffix}`} />
              <Calendar />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <PageTitle title={`Profile | ${titleSuffix}`} />
              <Profile />
            </>
          }
        />
        <Route
          path="/forms/form-elements"
          element={
            <>
              <PageTitle title={`Form Elements | ${titleSuffix}`} />
              <FormElements />
            </>
          }
        />
        <Route
          path="/forms/form-layout"
          element={
            <>
              <PageTitle title={`Form Layout | ${titleSuffix}`} />
              <FormLayout />
            </>
          }
        />
        <Route
          path="/tables"
          element={
            <>
              <PageTitle title={`Tables | ${titleSuffix}`} />
              <Tables />
            </>
          }
        />
        <Route
          path="/orders"
          element={
            <>
              <PageTitle title={`Orders | ${titleSuffix}`} />
              <Orders />
            </>
          }
        />
        <Route
          path="/autoblog"
          element={
            <>
              <PageTitle title={`Autoblog | ${titleSuffix}`} />
              <Autoblog />
            </>
          }
        />
        <Route
          path="/tasks"
          element={
            <>
              <PageTitle title={`Tasks | ${titleSuffix}`} />
              <Tasks />
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              <PageTitle title={`Settings | ${titleSuffix}`} />
              <Settings />
            </>
          }
        />
        <Route
          path="/chart"
          element={
            <>
              <PageTitle title={`Basic Chart | ${titleSuffix}`} />
              <Chart />
            </>
          }
        />
        <Route
          path="/ui/alerts"
          element={
            <>
              <PageTitle title={`Alerts | ${titleSuffix}`} />
              <Alerts />
            </>
          }
        />
        <Route
          path="/ui/buttons"
          element={
            <>
              <PageTitle title={`Buttons | ${titleSuffix}`} />
              <Buttons />
            </>
          }
        />
        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title={`Signin | ${titleSuffix}`} />
              <SignIn />
            </>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <>
              <PageTitle title={`Signup | ${titleSuffix}`} />
              <SignUp />
            </>
          }
        />
      </Routes>
    </DefaultLayout>
  );
}

export default App;