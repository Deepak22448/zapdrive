"use client";
import { ShareFileForm } from "./components/share-file-form";
import { FileInfo } from "./components/file-info";
import { FilePreviewPageLoading } from "./components/file-preview-page-loading";
import { useFileInfo } from "@/app/(auth)/hooks/use-file-info";

interface FilePreviewPageProps {
  params: {
    fileId: string;
  };
}
const FilePreviewPage = ({ params }: FilePreviewPageProps) => {
  const { fileInfo, isFetching } = useFileInfo({ fileId: params.fileId });
  if (isFetching) {
    return <FilePreviewPageLoading />;
  }

  if (!fileInfo) {
    return <></>;
  }

  return (
    <div className="w-full flex h-full lg:items-center">
      <div className="w-full flex flex-col lg:flex-row  space-y-4 lg:space-y-0 lg:space-x-8 h-min items-center">
        <FileInfo {...fileInfo} />
        <ShareFileForm fileId={params.fileId} fileInfo={fileInfo} />
      </div>
    </div>
  );
};

export default FilePreviewPage;
