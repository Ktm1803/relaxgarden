# Hướng dẫn cấu hình tích hợp Google Sheets và Zalo

## 1. Cấu hình Google Sheets với Apps Script

### Bước 1: Tạo Google Sheets
1. Truy cập [Google Sheets](https://sheets.google.com)
2. Tạo một spreadsheet mới
3. Đặt tên sheet là "Orders"
4. Thêm header row với các cột:
   - A: Thời gian đặt
   - B: Tên khách hàng
   - C: Số điện thoại
   - D: Cơ sở
   - E: Số khách
   - F: Ngày đến
   - G: Giờ đến
   - H: Món đã đặt
   - I: Tổng tiền
   - J: Ghi chú

### Bước 2: Tạo Apps Script
1. Trong Google Sheets, vào **Extensions** > **Apps Script**
2. Xóa code mặc định và paste code sau:

\`\`\`javascript
function doPost(e) {
  try {
    // Parse dữ liệu từ request
    const data = JSON.parse(e.postData.contents);
    
    // Lấy sheet "Orders"
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('Orders');
    
    // Nếu chưa có sheet Orders thì tạo mới
    if (!sheet) {
      const newSheet = ss.insertSheet('Orders');
      newSheet.appendRow([
        'Thời gian đặt',
        'Tên khách hàng',
        'Số điện thoại',
        'Cơ sở',
        'Số khách',
        'Ngày đến',
        'Giờ đến',
        'Món đã đặt',
        'Tổng tiền',
        'Ghi chú'
      ]);
    }
    
    // Format danh sách món
    const itemsList = data.items
      .map(item => `${item.name} x${item.quantity}`)
      .join(', ');
    
    // Thêm dòng mới vào sheet
    sheet.appendRow([
      data.orderTime,
      data.name,
      data.phone,
      data.location || 'N/A',
      data.guests || 'N/A',
      data.date || 'N/A',
      data.time || 'N/A',
      itemsList,
      data.totalAmount,
      data.notes || ''
    ]);
    
    // Trả về kết quả thành công
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: 'Đã lưu vào Google Sheets' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Trả về lỗi nếu có
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
\`\`\`

### Bước 3: Deploy Apps Script
1. Click nút **Deploy** > **New deployment**
2. Chọn type: **Web app**
3. Cấu hình:
   - **Description**: RelaxGarden Order System
   - **Execute as**: Me (your email)
   - **Who has access**: Anyone
4. Click **Deploy**
5. Copy **Web app URL** (dạng: `https://script.google.com/macros/s/...../exec`)
6. Click **Authorize access** và cho phép quyền truy cập

### Bước 4: Thêm Environment Variable
Thêm vào Vercel Project Settings hoặc file `.env.local`:
\`\`\`
GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
\`\`\`

### Lưu ý:
- Mỗi lần sửa code Apps Script, bạn cần **Deploy** lại (New deployment)
- URL sẽ thay đổi mỗi lần deploy mới
- Đảm bảo chọn "Anyone" để website có thể gọi được

## 2. Cấu hình Zalo Official Account

### Bước 1: Đăng ký Zalo OA
1. Truy cập [Zalo Official Account](https://oa.zalo.me)
2. Đăng ký tài khoản Official Account
3. Xác thực tài khoản

### Bước 2: Lấy Access Token
1. Vào phần "Cài đặt" > "Quản lý API"
2. Tạo ứng dụng mới
3. Lấy Access Token (có thể cần refresh token định kỳ)

### Bước 3: Lấy User ID
1. Người nhận thông báo cần follow Zalo OA
2. Lấy User ID từ webhook hoặc API của Zalo
3. Hoặc dùng Zalo OA để gửi broadcast message

### Bước 4: Thêm Environment Variables
Thêm vào Vercel Project Settings:
\`\`\`
ZALO_OA_ACCESS_TOKEN=your_access_token
ZALO_RECIPIENT_ID=your_recipient_user_id
\`\`\`

## 3. Testing

Sau khi cấu hình xong:
1. Thử đặt một đơn hàng test
2. Kiểm tra Google Sheets xem dữ liệu có được ghi vào không
3. Kiểm tra Zalo xem có nhận được thông báo không
4. Xem logs trong Vercel để debug nếu có lỗi

## 4. Lưu ý bảo mật

- KHÔNG commit URLs hoặc tokens vào git
- Sử dụng Environment Variables trong Vercel
- Apps Script URL có thể public nhưng chỉ nhận POST requests
- Refresh Zalo Access Token định kỳ
- Giới hạn quyền truy cập của tokens

## 5. Troubleshooting

### Lỗi "Authorization required"
- Đảm bảo đã authorize Apps Script
- Kiểm tra "Who has access" đã chọn "Anyone"

### Dữ liệu không ghi vào sheet
- Kiểm tra tên sheet phải là "Orders"
- Xem logs trong Apps Script: View > Executions
- Kiểm tra format dữ liệu gửi lên

### Lỗi CORS
- Apps Script tự động handle CORS
- Đảm bảo dùng URL có `/exec` ở cuối
