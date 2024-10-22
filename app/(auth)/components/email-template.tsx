import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";
import * as React from "react";

interface EmailTemplateProps {
  invitedByEmail: string;
  toEmail: string;
  fileName: string;
  invitedByUserName: string;
  downloadLink: string;
}

export const EmailTemplate = ({
  invitedByEmail,
  downloadLink,
  fileName,
  invitedByUserName,
}: EmailTemplateProps) => {
  const previewText = `Join ${invitedByUserName} on ZapDrive`;

  const LOGO_URL =
    "https://firebasestorage.googleapis.com/v0/b/zapdrive-9f30f.appspot.com/o/zapdrive.png?alt=media&token=a31bdba2-1f98-417a-bc03-b6fb202c1d85";

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
            <Section className="mt-[32px]">
              <Img
                src={LOGO_URL}
                width="200"
                height="70"
                alt="zapdrive"
                className="my-0 mx-auto"
              />
            </Section>
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              Join
              <strong className="text-blue-500"> ZapDrive </strong>
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              <strong>{invitedByUserName}</strong> (
              <Link
                href={`mailto:${invitedByEmail}`}
                className="text-blue-600 no-underline"
              >
                {invitedByEmail}
              </Link>
              ) has invited you to download a file on <strong>Zapdrive</strong>.
            </Text>
            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                className="bg-[#9333ea] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3 "
                href="http://localhost:3000"
              >
                Join Zapdrive
              </Button>
            </Section>
            <Text className="text-black text-[14px] leading-[24px]">
              Click the click to download the file:{" "}
              <Link href={downloadLink} className="text-blue-600 no-underline">
                {fileName}
              </Link>
            </Text>
            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              If you were not expecting this invitation, you can ignore this
              email. If you are concerned about your accounts safety, please
              reply to this email to get in touch with us.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

EmailTemplate.PreviewProps = {
  invitedByEmail: "invitedByEmail@gmail.com",
  toEmail: "toEmail@gmail.com",
  fileName: "fileName",
  downloadLink: "DownloadLink",
  invitedByUserName: "userName",
} as EmailTemplateProps;

export default EmailTemplate;
