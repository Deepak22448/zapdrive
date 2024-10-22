"use client";
import { useFileInfo } from "@/app/(auth)/hooks/use-file-info";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DownloadIcon, FileDownIcon } from "lucide-react";
import DownloadFilePageLoading from "./components/download-file-loading-page";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { download } from "@/firebase/storage/files";

interface DownloadFilePageProps {
  params: {
    fileId: string;
  };
}
const DownloadFilePage = ({ params }: DownloadFilePageProps) => {
  const { fileInfo, isFetching, setPassword, downloadFile } =
    useDownlaodFilePage(params);
  if (isFetching) {
    return <DownloadFilePageLoading />;
  }

  return (
    <>
      <Header />
      <section className="min-h-[calc(100vh-4rem-7rem)] h-full flex justify-center items-center px-2">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle className="text-center">
              <span className="font-bold text-primary">
                {fileInfo?.userName}
              </span>{" "}
              has shared a file with you
            </CardTitle>
            <CardDescription className="text-center">
              Find the detials below
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-1">
            <FileDownIcon className="size-52 mx-auto animate-bounce mt-8 text-primary" />
            <div className="flex justify-between text-muted-foreground gap-x-2">
              <p className="truncate">{fileInfo?.name}</p>
              <p className="w-fit">{fileInfo?.size} MB</p>
            </div>
            {fileInfo?.password && (
              <Input
                placeholder="Password"
                onChange={({ target }) => setPassword(target.value)}
                type="password"
              />
            )}
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={downloadFile}>
              <DownloadIcon className="size-5 mr-1" /> Download
            </Button>
          </CardFooter>
        </Card>
      </section>
      <Footer />
    </>
  );
};

const useDownlaodFilePage = (params: DownloadFilePageProps["params"]) => {
  const { fileInfo, isFetching } = useFileInfo({ fileId: params.fileId });
  const [password, setPassword] = useState("");
  const { toast } = useToast();
  const downloadFile = async () => {
    if (!fileInfo) return;

    const doesPasswordMatch = fileInfo?.password === password;
    if (fileInfo.password && !password) {
      toast({
        title: "Password Required",
        description: "Please enter the password to download the file",
        variant: "destructive",
      });
      return;
    }
    if (!doesPasswordMatch) {
      toast({
        title: "Invalid Password",
        description: "Please enter the correct password to download the file",
        variant: "destructive",
      });
      return;
    }
    await download({
      fileId: fileInfo.id,
      fileName: fileInfo.name,
    });
  };

  return { fileInfo, isFetching, password, setPassword, downloadFile };
};

export default DownloadFilePage;
