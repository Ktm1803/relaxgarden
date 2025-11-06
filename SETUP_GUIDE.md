# Hướng Dẫn Kết Nối Google Sheets với Website Nhà Hàng

## 📋 Mục Lục
1. [Chuẩn Bị](#chuẩn-bị)
2. [Tạo Google Apps Script](#tạo-google-apps-script)
3. [Cấu Hình Google Sheet](#cấu-hình-google-sheet)
4. [Deploy Apps Script](#deploy-apps-script)
5. [Cấu Hình Environment Variables](#cấu-hình-environment-variables)
6. [Kích Hoạt Zalo Notification (Tùy Chọn)](#kích-hoạt-zalo-notification-tùy-chọn)
7. [Kiểm Tra Kết Nối](#kiểm-tra-kết-nối)

---

## 🔧 Chuẩn Bị

Bạn cần:
- Tài khoản Google (Gmail)
- Tài khoản Vercel (để host website)
- Tài khoản Zalo Business (nếu muốn nhận thông báo qua Zalo)

---

## 📝 Tạo Google Apps Script

### Bước 1: Truy cập Google Apps Script
1. Mở [script.google.com](https://script.google.com)
2. Nhấp vào **"New project"** (Dự án mới)

### Bước 2: Sao chép Code
1. Xóa code mặc định
2. Sao chép toàn bộ code từ file `scripts/google-apps-script.gs`
3. Dán vào Editor

### Bước 3: Điều Chỉnh Cấu Hình
Mở tìm kiếm (Ctrl+H) và thay thế:
- `YOUR_SPREADSHEET_ID` → ID của Google Sheet của bạn (xem bước tiếp theo)

---

## 📊 Cấu Hình Google Sheet

### Bước 1: Tạo Google Sheet
1. Mở [Google Drive](https://drive.google.com)
2. Nhấp **"New"** → **"Google Sheets"**
3. Đặt tên: "Relaxgaden Orders"

### Bước 2: Lấy Sheet ID
URL của Sheet sẽ trông như này:
\`\`\`
https://docs.google.com/spreadsheets/d/1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7/edit
\`\`\`

Copy phần **1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7** → Đó là Sheet ID

### Bước 3: Cấu Hình Columns
Trong Sheet, tạo các cột sau (sẽ tự động tạo nếu không tồn tại):

| A | B | C | D | E | F | G | H | I | J | K | L |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Timestamp | Tên khách | SĐT | Dịch vụ | Địa chỉ | Số khách | Ngày đặt | Giờ đặt | Ghi chú | Tổng tiền | Các món | Trạng thái |

---

## 🚀 Deploy Apps Script

### Bước 1: Deploy
1. Trong Google Apps Script, nhấp **"Deploy"** → **"New deployment"**
2. Chọn type: **"Web app"**
3. Cấu hình:
   - **Execute as**: Tài khoản của bạn (your-email@gmail.com)
   - **Who has access**: **Anyone**
4. Nhấp **"Deploy"**

### Bước 2: Sao Chép URL Deploy
1. Màn hình sẽ hiển thị deployment ID
2. Sao chép URL đầy đủ (trông như):
   \`\`\`
   https://script.googleapis.com/macros/d/ABC123XYZ.../usercontent
   \`\`\`

---

## 🔐 Cấu Hình Environment Variables

### Trên Vercel Dashboard

1. Mở project của bạn trên [Vercel](https://vercel.com)
2. Vào **Settings** → **Environment Variables**
3. Thêm các biến:

#### **Bắt Buộc:**
\`\`\`
GOOGLE_APPS_SCRIPT_URL = https://script.googleapis.com/macros/d/ABC123XYZ.../usercontent
\`\`\`

#### **Tùy Chọn (Zalo Notification):**
\`\`\`
ZALO_OA_ACCESS_TOKEN = your_zalo_token_here
ZALO_RECIPIENT_ID = your_zalo_user_id_here
\`\`\`

4. Nhấp **"Save"**

---

## 💬 Kích Hoạt Zalo Notification (Tùy Chọn)

### Lấy Zalo Access Token

1. Truy cập [Zalo Business Platform](https://developers.zalo.me)
2. Tạo Official Account (OA)
3. Vào **API Settings**
4. Copy **Access Token** và **User ID**
5. Thêm vào Vercel Environment Variables (xem phần trên)

---

## ✅ Kiểm Tra Kết Nối

### Cách 1: Kiểm Tra trực tiếp
1. Mở link Deploy của Apps Script trong browser
2. Nếu thấy:
   \`\`\`json
   {"message":"Google Apps Script is running successfully","timestamp":"..."}
   \`\`\`
   → **✅ Apps Script hoạt động**

### Cách 2: Test đơn hàng
1. Trên website, nhấp **"Đặt hàng"**
2. Điền đầy đủ thông tin
3. Nhấp **"Đặt hàng ngay"**
4. Kiểm tra Google Sheet - đơn hàng phải xuất hiện trong vòng 5 giây

### Cách 3: Kiểm tra Console (F12)
1. Mở browser console (F12)
2. Xem các log "[v0]" để debug nếu có lỗi

---

## 🆘 Troubleshooting

### "Có lỗi khi gửi đơn hàng"
- Kiểm tra `GOOGLE_APPS_SCRIPT_URL` trong Vercel environment variables
- Đảm bảo URL không có lỗi typo
- Redeploy Apps Script nếu URL bị lỗi

### Google Sheet không nhận dữ liệu
- Kiểm tra Sheet ID có chính xác không
- Kiểm tra Apps Script có **"Anyone"** access không
- Xem Execution log trong Apps Script

### Zalo không nhận thông báo
- Kiểm tra `ZALO_OA_ACCESS_TOKEN` và `ZALO_RECIPIENT_ID`
- Token có thể hết hạn - lấy token mới
- Đảm bảo User ID là của người nhận

---

## 📱 Cách Lấy Zalo User ID

1. Mở Zalo
2. Nhấp avatar bạn
3. Vào **Tài khoản**
4. User ID hiển thị dưới tên
5. Copy ID đó vào `ZALO_RECIPIENT_ID`

---

## 📈 Quản Lý Đơn Hàng

Bạn có thể:
- Xem tất cả đơn hàng trong Google Sheet
- Chỉnh sửa trạng thái đơn hàng (Đang xử lý → Đã giao, vv)
- Xuất dữ liệu để phân tích
- Tạo biểu đồ, báo cáo

---

## ⚙️ Code References

**API Route**: `/app/api/submit-order/route.ts`
- Nhận dữ liệu từ booking modal
- Gửi đến Google Apps Script
- Gửi thông báo Zalo (nếu cấu hình)

**Booking Modal**: `/components/booking-modal.tsx`
- Form nhập thông tin
- Tự động gửi khi nhấp "Đặt hàng ngay"

---

Nếu còn vấn đề, hãy kiểm tra **Execution log** trong Google Apps Script hoặc console trong browser (F12).
