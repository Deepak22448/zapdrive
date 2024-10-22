import { FileInfo } from "@/app/(auth)/hooks/use-file-info";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateFileDoc } from "@/firebase/db/files";
import { useToast } from "@/hooks/use-toast";
import { CopyIcon } from "lucide-react";
import { FC, useState } from "react";

interface ShareFileFormProps {
  fileInfo: FileInfo;
  fileId: string;
}
export const ShareFileForm: FC<ShareFileFormProps> = ({ fileInfo, fileId }) => {
  const {
    isPasswordEnabled,
    setIsPasswordEnabled,
    isSendingEmail,
    password,
    setPassword,
    isUpdatingPassword,
    updatePassword,
    copy,
    email,
    sendEmail,
    setEmail,
  } = useShareFileForm({ fileInfo, fileId });
  const isPasswordInputDisabled = !isPasswordEnabled || isUpdatingPassword;

  return (
    <div className="lg:w-3/5 w-full self-start space-y-4">
      <div>
        <Label htmlFor="short-url">Download Url</Label>
        <div className="relative">
          <Input
            id="short-url"
            type="text"
            placeholder={`${process.env.NEXT_PUBLIC_BASE_URL}/f/${fileInfo.id}`}
            readOnly
            className="pr-3.5"
          />
          <CopyIcon
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer size-5"
            onClick={() =>
              copy(`${process.env.NEXT_PUBLIC_BASE_URL}/f/${fileInfo.id}`)
            }
          />
        </div>
      </div>

      <div className="space-y-1">
        <Label htmlFor="password" className="flex items-center">
          <Checkbox
            className="mr-1"
            checked={isPasswordEnabled}
            onCheckedChange={(isChecked) =>
              setIsPasswordEnabled(isChecked as boolean)
            }
          />
          Enable Password ?
        </Label>
        <div className="flex space-x-2">
          <Input
            disabled={isPasswordInputDisabled}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            type="password"
            placeholder="Enter your password"
            className="grow"
          />
          <Button disabled={isPasswordInputDisabled} onClick={updatePassword}>
            Save
          </Button>
        </div>
      </div>

      <div className="border p-2 space-y-2 rounded-md">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="example@gmail.com"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <Button
          className="w-full md:w-min block ml-auto"
          disabled={!email || isSendingEmail}
          onClick={sendEmail}
        >
          {isSendingEmail ? "Sending Email..." : "Send Email"}
        </Button>
      </div>
    </div>
  );
};

type UseShareFileFormProps = ShareFileFormProps;
const useShareFileForm = ({ fileInfo, fileId }: UseShareFileFormProps) => {
  // state to track if the password is enabled for the file.
  const [isPasswordEnabled, setIsPasswordEnabled] = useState(false);
  // state to track the password for the file
  const [password, setPassword] = useState(() => fileInfo.password || "");
  // state to track if the password is being updated into the database.
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  // state to track if the email is being sent to the user.
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const { toast } = useToast();
  // email of the user to send the file link.
  const [email, setEmail] = useState("");
  // Update the password for the file
  const updatePassword = async () => {
    if (password === "") {
      toast({
        title: "Password can't be empty",
        variant: "destructive",
      });
      return;
    }

    setIsUpdatingPassword(true);
    try {
      await updateFileDoc(fileId, { password });
      toast({
        title: "Password Updated",
      });
    } catch (error) {
      toast({
        title: "Failed to update password",
        description: "Please try again later",
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  // Copy the content to the clipboard
  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied content to clipboard.",
    });
  };

  // Send the email to the user with the file link.
  const sendEmail = async () => {
    try {
      setIsSendingEmail(true);
      await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          toEmail: email,
          fileName: fileInfo.name,
          downloadUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/f/${fileInfo.id}`,
        }),
      });
      toast({
        title: "Email sent",
        description: `Email sent to ${email}`,
      });
    } catch (error) {
      toast({
        title: "Failed to send email",
        description: "Please try again later",
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setIsSendingEmail(false);
    }
  };

  return {
    isPasswordEnabled,
    setIsPasswordEnabled,
    updatePassword,
    password,
    isUpdatingPassword,
    copy,
    setPassword,
    email,
    setEmail,
    sendEmail,
    isSendingEmail,
  };
};
