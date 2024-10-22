import { EmailTemplate } from "@/app/(auth)/components/email-template";
import { currentUser } from "@clerk/nextjs/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const body = await req.json();
  const user = await currentUser();

  if (!user?.primaryEmailAddress) {
    return Response.json({ error: "login to send email." }, { status: 401 });
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "zapdrive@resend.dev",
      to: [body.toEmail],
      subject: `${user?.fullName} has shared a file with you on ZapDrive.`,
      react: EmailTemplate({
        invitedByUserName: user.fullName ?? "",
        invitedByEmail: user.primaryEmailAddress?.emailAddress,
        downloadLink: body.downloadUrl,
        fileName: body.fileName,
        toEmail: body.toEmail,
      }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
