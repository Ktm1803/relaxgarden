import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const orderData = await request.json()

    console.log("[v0] Received order data:", orderData)

    const sheetsResponse = await submitToGoogleSheets(orderData)
    console.log("[v0] Google Sheets response:", sheetsResponse)

    let zaloResponse = { success: false, message: "Skipped" }
    if (sheetsResponse.success) {
      zaloResponse = await sendZaloNotification(orderData)
      console.log("[v0] Zalo notification response:", zaloResponse)
    }

    return NextResponse.json({
      success: sheetsResponse.success,
      message: sheetsResponse.success
        ? "Đơn hàng đã được gửi thành công"
        : "Có lỗi khi gửi đơn hàng. Vui lòng thử lại.",
      sheetsResponse,
      zaloResponse,
    })
  } catch (error) {
    console.error("[v0] Error processing order:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Có lỗi xảy ra khi xử lý đơn hàng",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

async function submitToGoogleSheets(orderData: any) {
  const APPS_SCRIPT_URL = process.env.GOOGLE_APPS_SCRIPT_URL

  if (!APPS_SCRIPT_URL) {
    console.warn("[v0] Google Apps Script URL not configured")
    return {
      success: false,
      message:
        "Google Apps Script URL chưa được cấu hình. Vui lòng thêm GOOGLE_APPS_SCRIPT_URL vào environment variables.",
    }
  }

  try {
    console.log("[v0] Sending to Apps Script:", APPS_SCRIPT_URL)

    const requestData = {
      type: orderData.location ? "order" : "booking",
      ...orderData,
    }

    // Send data directly to Apps Script
    const response = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
      redirect: "follow",
    })

    const responseText = await response.text()
    console.log("[v0] Apps Script raw response:", responseText)

    if (!response.ok) {
      throw new Error(`Apps Script error: ${response.statusText} - ${responseText}`)
    }

    let result
    try {
      result = JSON.parse(responseText)
    } catch (e) {
      // If response is not JSON, treat it as success if status is ok
      result = { success: true, message: responseText }
    }

    return { success: result.success !== false, data: result }
  } catch (error) {
    console.error("[v0] Google Sheets error:", error)
    return {
      success: false,
      message: "Không thể kết nối với Google Sheets. Vui lòng kiểm tra Apps Script URL.",
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}

async function sendZaloNotification(orderData: any) {
  // Zalo API configuration
  // You need to set up these environment variables:
  // - ZALO_OA_ACCESS_TOKEN (Official Account Access Token)
  // - ZALO_RECIPIENT_ID (User ID to receive notifications)

  const ACCESS_TOKEN = process.env.ZALO_OA_ACCESS_TOKEN
  const RECIPIENT_ID = process.env.ZALO_RECIPIENT_ID

  if (!ACCESS_TOKEN || !RECIPIENT_ID) {
    console.warn("[v0] Zalo credentials not configured")
    return { success: false, message: "Zalo not configured" }
  }

  try {
    // Format message for Zalo
    const itemsList = orderData.items
      .map((item: any) => `• ${item.name} x${item.quantity} - ${item.total.toLocaleString("vi-VN")}đ`)
      .join("\n")

    const message = `🔔 ĐƠN HÀNG MỚI

👤 Khách hàng: ${orderData.name}
📞 SĐT: ${orderData.phone}
📍 Dịch vụ: ${orderData.location}
👥 Số khách: ${orderData.guests} người
📅 Ngày: ${orderData.date}
⏰ Giờ: ${orderData.time}

🍽️ Món đã đặt:
${itemsList}

💰 Tổng tiền: ${orderData.totalAmount.toLocaleString("vi-VN")}đ

📝 Ghi chú: ${orderData.notes || "Không có"}

⏱️ Thời gian đặt: ${new Date(orderData.orderTime).toLocaleString("vi-VN")}`

    // Send message via Zalo OA API
    const response = await fetch("https://openapi.zalo.me/v2.0/oa/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        access_token: ACCESS_TOKEN,
      },
      body: JSON.stringify({
        recipient: {
          user_id: RECIPIENT_ID,
        },
        message: {
          text: message,
        },
      }),
    })

    if (!response.ok) {
      throw new Error(`Zalo API error: ${response.statusText}`)
    }

    const result = await response.json()
    return { success: true, data: result }
  } catch (error) {
    console.error("[v0] Zalo notification error:", error)
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" }
  }
}
