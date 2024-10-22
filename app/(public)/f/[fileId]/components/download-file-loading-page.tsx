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
import { Skeleton } from "@/components/ui/skeleton";
import { DownloadIcon, FileDownIcon } from "lucide-react";

const DownloadFilePageLoading = () => {
  return (
    <>
      <Header />
      <section className="min-h-[calc(100vh-4rem-7rem)] h-full flex justify-center items-center px-2">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle className="text-center space-y-2">
              <Skeleton className="w-full h-7" />
              <Skeleton className="w-1/4 h-7" />
            </CardTitle>
            <CardDescription className="text-center">
              Find the detials below
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FileDownIcon className="size-52 mx-auto animate-bounce mt-8 text-primary" />
            <div className="flex justify-between text-muted-foreground gap-x-2">
              <Skeleton className="w-3/5 h-6" />
              <Skeleton className="w-1/5 h-6" />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">
              <DownloadIcon className="size-5 mr-1" /> Download
            </Button>
          </CardFooter>
        </Card>
      </section>
      <Footer />
    </>
  );
};

export default DownloadFilePageLoading;
