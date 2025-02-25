import axios from "./axiosUrl";

class AuthServices {
  register(data: any) {
    return axios.post("/signup", data);
  }

  update(data: any) {
    return axios.post("/update", data);
  }

  otp(data: any) {
    return axios.post("/signup/otp", data);
  }

  otpResend(data: any) {
    return axios.post("/signup/otp-resend", data);
  }

  login(data: any) {
    return axios.post("/login", data);
  }

  VerifyEmail(data: any) {
    return axios.post("/signup/resetOtp", data);
  }

  VerifyOtp(data: any) {
    return axios.post("/signup/checkOtp", data);
  }

  ResetPassword(data: any) {
    return axios.post("/signup/reset-password", data);
  }

  logout() {
    localStorage.clear();
  }

  getCurrentUser(): string | null {
    return localStorage.getItem("user");
  }

  getUserDetails() {
    const userId = localStorage.getItem("userId");
    return axios.get(`/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          "user"
        )} ${localStorage.getItem("ref_token")}`,
      },
    });
  }

  getUserName(): string | null {
    let userName = localStorage.getItem("userName");
    return userName
      ? userName.charAt(0).toUpperCase() + userName.slice(1)
      : null;
  }

  Google_login(data: any) {
    return axios.post("/google_login", data);
  }

  Google_Signup(data: any) {
    return axios.post("/google_signup", data);
  }

  StripePayment(data: any) {
    return axios.post("/stripe/payment", data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          "user"
        )} ${localStorage.getItem("ref_token")}`,
      },
    });
  }

  StripePayment_course(CourseLink: string) {
    return axios.get(`/stripe/${CourseLink}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          "user"
        )} ${localStorage.getItem("ref_token")}`,
      },
    });
  }

  AllCourses() {
    return axios.get("/home/allCourses");
  }

  HomepageCourse(CourseLink: string) {
    return axios.get(`/home/${CourseLink}`);
  }

  PreferenceCourse(CourseLink: string, data: any) {
    return axios.post(`/home/${CourseLink}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          "user"
        )} ${localStorage.getItem("ref_token")}`,
      },
    });
  }

  UpdatedCourse(data: any) {
    return axios.put("course/Update", data);
  }

  bookmarkCourses(userName: string, userId: string) {
    return axios.get(`/users/${userName}/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          "user"
        )} ${localStorage.getItem("ref_token")}`,
      },
    });
  }

  DeleteBookmark(data: any) {
    return axios.post("/unbookmark", data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          "user"
        )} ${localStorage.getItem("ref_token")}`,
      },
    });
  }

  BookMark(CourseId: string, CourseName: string, data: any) {
    return axios.post(`/home/${CourseId}/${CourseName}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          "user"
        )} ${localStorage.getItem("ref_token")}`,
      },
    });
  }

  Download(CourseId: string) {
    return axios.get(`/pdf/download/${CourseId}`);
  }

  FetchCourses(CourseName: string, CourseId: string) {
    return axios.get(`/course/${CourseName}/${CourseId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          "user"
        )} ${localStorage.getItem("ref_token")}`,
      },
    });
  }

  Rating(data: any) {
    return axios.put("/Rating", data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user")}`,
      },
    });
  }

  TeacherHomePage(data: any) {
    return axios.post("/creater/homepage", data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          "user"
        )} ${localStorage.getItem("ref_token")}`,
      },
    });
  }

  TeacherCourseDelete(data: any) {
    return axios.post("/course/delete", data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user")}`,
      },
    });
  }
}

export default new AuthServices();

// Let me know if you’d like me to add more specific types or refine anything further! 🚀
