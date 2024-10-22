import { UploadForm } from "./components/upload-form";

const UploadPage = () => {
  return (
    <section className="w-full space-y-5">
      <h2 className="text-3xl font-bold tracking-wide text-center">
        Start
        <span className="font-extrabold capitalize bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-transparent">
          {" uploading "}
        </span>
        files and
        <span className="text-primary font-extrabold capitalize">
          {" share "}{" "}
        </span>
        it.
      </h2>
      <UploadForm />
    </section>
  );
};

export default UploadPage;
