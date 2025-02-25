import React from "react";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Signup from "./Pages/Auth/Forms/Signup/Signup";
import Login from "./Pages/Auth/Forms/Login/Login";
import Otp from "./Pages/Auth/Forms/Otp/Otp";
import Homepage from "./Pages/HomePage/Homepage";
import Stripe from "./Pages/payment/StripeContainer";
import EmailVerify from "./Pages/Auth/Forms/ForgotPassword/EmailVerify";
import ForgotPasswordotp from "./Pages/Auth/Forms/ForgotPassword/ForgotPassOtp";
// import ResetPassword from "./Pages/Auth/Forms/ResetPassword/ResetPassword";
// import Cart from "./Pages/Cart/Cart";
// import TeacherPage from "./Pages/Teacher/TeacherPage";
// import TeacherVideos from "./Pages/Teacher/TeacherVideos";
// import TeacherHomePage from "./Pages/Teacher/TeacherHomepage/TeacherHomepage";
// import TeacherEdit from "./Pages/Teacher/TeacherHomepage/TeacherEdit";
// import CoursePage from "./Pages/CoursePage/CoursePage";
// import Preference from "./Pages/HomePage/Preference";
// import Chat from "./Pages/Chat/Chat";
// import EventPage from "./Pages/CoursePage/EventPage";
import Profile from "./Pages/Profile/Profile";

const App: React.FC = () => {
  // const events = ["Hackathon", "Job", "Interview"];
  return (
    <GoogleOAuthProvider
      clientId={import.meta.env.VITE_APP_GOOGLE_API_KEY as string}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup/otp" element={<Otp />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/stripe/:CourseLink" element={<Stripe />} />
          <Route path="/forgotpasswordemail" element={<EmailVerify />} />
          <Route path="/ForgotPasswordotp" element={<ForgotPasswordotp />} />
          {/* 
         
          <Route path="/ResetPassword" element={<ResetPassword />} />
          <Route path="/Cart" element={<Cart />} />
         
          <Route path="/Teacher" element={<TeacherPage />} />
          <Route path="/TeacherVideos" element={<TeacherVideos />} />
          <Route path="/TeacherHome" element={<TeacherHomePage />} />
          <Route path="/TeacherEdit" element={<TeacherEdit />} />
          <Route path="/chat" element={<Chat />} /> */}

          <Route path="/home/:CourseName" element={<Homepage />} />
          {/* <Route path="/home/Interest/Preference" element={<Preference />} />
          <Route
            path="/course/:Course/:Courseid"
            element={({ params }) =>
              events.includes(params.Course) ? <EventPage /> : <CoursePage />
            }
          />
          */}

          <Route path="*" element={<Navigate to="/home/all" replace />} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
};

export default App;
