/**
 * Google Apps Script for "Relaxgaden" Restaurant
 * Connects your Next.js website to Google Sheets for order management
 * 
 * Steps to set up:
 * 1. Go to https://script.google.com
 * 2. Create a new project
 * 3. Paste this code
 * 4. Replace YOUR_SPREADSHEET_ID with your Google Sheet ID
 * 5. Deploy as Web App
 * 6. Copy the deployment URL to GOOGLE_APPS_SCRIPT_URL environment variable
 */

const SHEET_ID = "1AbKcR-OdC0liCLypFwl5zc5Sc4KXZ9AoeXBkVui7q90D"; // Replace with your Google Sheet ID
const SHEET_NAME = "Orders"; // Tab name in your Google Sheet

// Handle POST requests from your website
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    console.log("[Apps Script] Received data:", data);

    // Validate required fields
    if (!data.name || !data.phone) {
      return ContentService
        .createTextOutput(JSON.stringify({ 
          success: false, 
          message: "Missing required fields: name, phone" 
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // Open spreadsheet and get sheet
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);

    // Create sheet if it doesn't exist
    if (!sheet) {
      sheet = spreadsheet.insertSheet(SHEET_NAME);
      // Add headers
      sheet.appendRow([
        "Timestamp",
        "Tên khách",
        "SĐT",
        "Dịch vụ",
        "Địa chỉ",
        "Số khách",
        "Ngày đặt",
        "Giờ đặt",
        "Ghi chú",
        "Tổng tiền",
        "Các món",
        "Trạng thái"
      ]);
    }

    // Prepare items string
    const itemsList = data.items
      ? data.items.map(item => `${item.name} x${item.quantity}`).join("; ")
      : "";

    // Add order data to sheet
    sheet.appendRow([
      new Date(), // Timestamp
      data.name,
      data.phone,
      data.location || data.serviceType || "",
      data.address || "",
      data.guests || "",
      data.date || "",
      data.time || "",
      data.notes || "",
      data.totalAmount || 0,
      itemsList,
      "Đang xử lý" // Status
    ]);

    console.log("[Apps Script] Order added to sheet successfully");

    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: true, 
        message: "Đơn hàng đã được lưu thành công",
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error("[Apps Script] Error:", error);
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: false, 
        message: error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle GET requests
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ 
      message: "Google Apps Script is running successfully",
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Optional: Send email notification to owner
function sendEmailNotification(orderData) {
  const ownerEmail = "your-email@gmail.com"; // Replace with your email
  
  const subject = `🔔 Đơn hàng mới từ ${orderData.name}`;
  const itemsList = orderData.items
    ? orderData.items.map(item => `• ${item.name} x${item.quantity} - ${item.total.toLocaleString("vi-VN")}đ`).join("\n")
    : "";

  const body = `
Đơn hàng mới:

Khách hàng: ${orderData.name}
SĐT: ${orderData.phone}
Dịch vụ: ${orderData.location}
Địa chỉ: ${orderData.address || "N/A"}
Số khách: ${orderData.guests}
Ngày: ${orderData.date}
Giờ: ${orderData.time}

Các món:
${itemsList}

Tổng tiền: ${orderData.totalAmount.toLocaleString("vi-VN")}đ
Ghi chú: ${orderData.notes || "Không có"}

Thời gian đặt: ${new Date(orderData.orderTime).toLocaleString("vi-VN")}
  `;

  try {
    GmailApp.sendEmail(ownerEmail, subject, body);
    console.log("[Apps Script] Email sent to " + ownerEmail);
  } catch (error) {
    console.error("[Apps Script] Email error:", error);
  }
}
