import { NextRequest, NextResponse } from "next/server";
import { runAutomation, type CommunicationChannel } from "@/lib/automation";

const allowedChannels: CommunicationChannel[] = ["chat", "email", "call"];

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<{
      message: string;
      channel: string;
      customer_name: string;
      customerName: string;
    }>;

    const message = body.message?.trim();
    if (!message) {
      return NextResponse.json(
        { error: "Message is required." },
        { status: 400 },
      );
    }

    const channelValue = (body.channel ?? "chat").toLowerCase();
    const channel = allowedChannels.includes(channelValue as CommunicationChannel)
      ? (channelValue as CommunicationChannel)
      : "chat";

    const customerName = (body.customerName ?? body.customer_name ?? "Customer").trim();

    const result = await runAutomation({
      message,
      channel,
      customerName,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Automation route error:", error);
    return NextResponse.json(
      { error: "Unable to process automation request." },
      { status: 500 },
    );
  }
}
