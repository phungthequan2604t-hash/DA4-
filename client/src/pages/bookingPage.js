import { thongBaoTiengViet } from "../utils/vi";
import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

const BookingPage = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.user);
  const [teacher, setTeacher] = useState(null);
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [bookedAppointments, setBookedAppointments] = useState([
    {
      date: "2024-06-24",
      time: "14:30",
    },
  ]);
  const [availableSlots, setAvailableSlots] = useState([]); // Stores available slots for selected date
  const [isLoading, setIsLoading] = useState(false); // Flag for loading state
  const data = { teacherID: params.teacherID };
  // Fetch available slots on component mount or date change
  useEffect(() => {
    async function fetchData() {
      // console.log("data to send", data);
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/user/get-teacher-by-id`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify(data),
        });
        const responseData = await response.json();
        // console.log("this data", responseData);
        setTeacher(responseData.data);
      } catch (error) {
        // console.log("some error inside useeffeect of booking page");
      }
    }
    if (!teacher) {
      fetchData();
    }
  }, []);

  

  const handleSubmitBooking = async (event) => {
    event.preventDefault();
    if (!selectedDateTime) {
      toast.error("Vui lòng chọn ngày và giờ hẹn.");
      return;
    }

    // Extract date and time from the selectedDate
    const bookingSchedule = selectedDateTime.format('YYYY-MM-DDTHH:mm')
    // const bookingDate = selectedDateTime.format("YYYY-MM-DD");
    // const bookingTime = selectedDateTime.format("HH:mm").toString

    // // console.log(bookingDate, bookingTime);
    // Create a booking object
    const bookingData = {
      studentID: user?.id,
      teacherID: teacher?.id, // Assuming teacher object exists and has an id
      scheduleDateTime: bookingSchedule
      // date: bookingDate,
      // time: bookingTime,
      // Add any other relevant booking information
    };
    // console.log("bookingdata: ",bookingData);
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/user/teacher/book-appointment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(bookingData),
      });

      const responseData = await response.json();
      if (responseData.success) {
        toast.success(thongBaoTiengViet(responseData.message));
        // console.log(responseData);
        navigate('/user-appointments')
      } else {
        toast.error(thongBaoTiengViet(responseData.message));
      }
    } catch (error) {
      toast.error("Lỗi máy chủ. Vui lòng thử lại.");
      console.error("Error:", error);
      throw error;
    }
  };

  return (
    <Layout>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="vi">
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <div className="card shadow-sm">
                <div className="card-body">
                  <div className="teacher-details mb-4">
                    <h2 className="card-title text-primary">{teacher?.name}</h2>
                    <p className="card-text">
                      <strong>Chuyên môn: </strong> {teacher?.speciality}
                    </p>
                    <p className="card-text">
                      <strong>Email:</strong> {teacher?.email}
                    </p>
                  </div>

                  <form onSubmit={handleSubmitBooking}>
                    <div className="date-time-picker mb-3  d-flex align-items-center">
                    <strong>
                      Lịch hẹn: &nbsp;
                    </strong>
                      <DateTimePicker
                        label="Chọn ngày và giờ"
                        value={selectedDateTime}
                        onChange={(newValue) => setSelectedDateTime(newValue)}
                        minutesStep={30}
                        minTime={dayjs().set("hour", 9).startOf("hour")}
                        maxTime={dayjs().set("hour", 17).startOf("hour")}
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg btn-block"
                      disabled={isLoading}
                    >
                      {isLoading ? "Đang đặt lịch..." : "Xác nhận đặt lịch"}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LocalizationProvider>
    </Layout>
  );
};

export default BookingPage;
