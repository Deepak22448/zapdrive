import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";

export const FilePreviewPageLoading = () => {
  return (
    <div className="w-full flex h-full lg:items-center">
      <div className="w-full flex flex-col lg:flex-row  space-y-4 lg:space-y-0 lg:space-x-8 h-min items-center">
        <Skeleton className="relative lg:w-2/5 self-stretch h-60 w-full lg:h-auto" />
        <form className="lg:w-3/5 w-full self-start space-y-4">
          <div>
            <Label htmlFor="short-url">Short Url</Label>
            <Skeleton className="h-10 w-full" />
          </div>

          <div className="space-y-1">
            <Label htmlFor="password" className="flex items-center">
              <Checkbox className="mr-1" disabled />
              Enable Password ?
            </Label>

            <div className="flex space-x-2">
              <Skeleton className="h-10 w-full" />
              <Button disabled>Save</Button>
            </div>
          </div>

          <div className="border p-2 space-y-2 rounded-md">
            <Label htmlFor="email">Email</Label>
            <Skeleton className="h-10 w-full" />
            <Button className="w-full md:w-min block ml-auto" disabled>
              Send Email
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
