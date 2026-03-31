import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, message } = await req.json();
    const discordWebhookUrl = process.env.DISCORD_WEBHOOKS_API;

    if (!discordWebhookUrl) {
      console.error('Discord Webhook URL is not set.');
      return NextResponse.json({ message: 'Lỗi Server. Vui lòng thử lại sau.' }, { status: 500 });
    }

    const discordMessage = {
      content: `**New Contact Form Submission**\n-----------------------------------`,
      embeds: [
        {
          title: 'Contact Form Details',
          color: 13938487, // #D4AF37
          fields: [
            { name: 'Name', value: name, inline: true },
            { name: 'Email', value: email, inline: true },
            { name: 'Phone', value: phone || 'N/A', inline: false },
            { name: 'Message', value: message, inline: false },
          ],
          timestamp: new Date().toISOString(),
        },
      ],
    };

    const response = await fetch(discordWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(discordMessage),
    });

    if (!response.ok) {
      return NextResponse.json({ message: 'Lỗi khi gửi tin nhắn.' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Tin nhắn đã được gửi thành công!' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Đã có lỗi xảy ra.' }, { status: 500 });
  }
}