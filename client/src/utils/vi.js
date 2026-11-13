// Chỉ Việt hóa nội dung hiển thị, không thay đổi giá trị gửi đến API.
export const trangThaiTiengViet = (status) => ({
  pending: "Chờ xác nhận",
  accepted: "Đã xác nhận",
  rejected: "Đã từ chối",
  cancelled: "Đã hủy",
  completed: "Đã hoàn thành",
})[status] || status;

export const boLocTiengViet = (filter) => ({
  all: "Tất cả",
  accepted: "Đã xác nhận",
  rejected: "Đã từ chối",
  pending: "Chờ xác nhận",
})[filter] || filter;

const thongBao = {
  "User with same email already exists": "Email này đã được đăng ký",
  "User created successfully": "Tạo tài khoản thành công",
  "Server error": "Lỗi máy chủ",
  "User does not exists": "Tài khoản không tồn tại",
  "Incorrect password or email address": "Email hoặc mật khẩu không chính xác",
  "Login Successfull": "Đăng nhập thành công",
  "User not found": "Không tìm thấy người dùng",
  "Error getting user info": "Không thể tải thông tin người dùng",
  "This slot is already booked": "Khung giờ này đã được đặt",
  "Appointment booking request sent successfully": "Đã gửi yêu cầu đặt lịch thành công",
  "Error booking appointment": "Không thể đặt lịch hẹn",
  "Error getting teacher info": "Không thể tải thông tin giảng viên",
  "Appointment Status Updated": "Cập nhật trạng thái lịch hẹn thành công",
  "Appointment deleted successfully": "Xóa lịch hẹn thành công",
  "Appointment not found": "Không tìm thấy lịch hẹn",
  "Internal server error": "Lỗi máy chủ",
};
export const thongBaoTiengViet = (message) => thongBao[message] || message || "Đã xảy ra lỗi. Vui lòng thử lại.";
