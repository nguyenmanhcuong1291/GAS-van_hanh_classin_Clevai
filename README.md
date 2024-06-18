# GAS-van_hanh_classin
Quy trình chạy tự động classin qua API
Yêu cầu:
- Tạo tài khoản học sinh(Accounts), thêm học sinh vào trường (School)
- Tạo lớp trực tuyến (Course-Class) theo ngày giờ, giáo viên
- Thêm học sinh vào lớp học
  - Lấy danh sách học sinh theo ngày từ database, phân học sinh vào lớp theo khối, trình độ, số lượng 12hs/lớp
- Tạo link xem trực tuyến để phụ huynh theo dõi lớp học theo từng tk học sinh
- Tạo tag cho CTV trực lớp (SchoolTag)
- Gắn CTV trực lớp vào lớp (ClassTag)
- Thay đổi giáo viên trong giờ học
  - Điền giáo viên hiện tại, giáo viên cần thay, tự động lấy mã lớp, thay đổi giáo viên mới vào lớp
