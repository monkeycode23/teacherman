
import './App.css'
import DashboardPage from "./pages/DashboardPage";

import { ClassroomDetail } from "./pages/ClassRoomDetail";
import { ClassroomList } from "./pages/ClassRoomList";
import  TopicPage  from "./pages/TopicPage";
import CallendarPage from "./pages/CallendarPage";
import NotificationsPage from "./pages/NotificationsPage";
import { BrowserRouter, Routes, Route } from "react-router";

import  CalendarPage  from './pages/CalendarPage';

import GeneralLayout from "./pages/layouts/GeneralLayout";
import { EventsPage } from "./pages/EventsPage";
import PrivateRoute from "./components/PrivateRoute";
import LoginPage from './pages/LoginPage';
import RegisterPage from "./pages/RegisterPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth">
          <Route path="login" element={<LoginPage />}></Route>
          <Route path="register" element={<RegisterPage />}></Route>
          <Route path="forgot" element={<ClassroomDetail />}></Route>
          <Route path="verify" element={<ClassroomDetail />}></Route>
        </Route>

        <Route path="/" element={<PrivateRoute></PrivateRoute>}>
          <Route index path="/" element={<DashboardPage />}></Route>
          <Route path="topic" element={<TopicPage />}></Route>

          <Route path="/classrooms">
            <Route path="" element={<ClassroomList />}></Route>
            <Route path=":id" element={<ClassroomDetail />}></Route>
          </Route>
          <Route
            path="callendar"
            element={<CalendarPage/>}
          ></Route>
          <Route
            path="notifications"
            element={<NotificationsPage></NotificationsPage>}
          ></Route>
          <Route path="events" element={<EventsPage></EventsPage>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
