import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

const HomePage = () => {
  return (
    <>
      <Header />
      <section className="min-h-[calc(100vh-4rem-7rem)] mx-auto max-w-screen-xl px-4 flex items-center justify-center">
        <div className="mx-auto max-w-3xl text-center relative h-min">
          <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-5xl font-extrabold text-transparent sm:text-7xl">
            Upload, Save and easily share your files
            <span className="sm:block"> with anyone in one place. </span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed text-muted-foreground">
            Drag and drop your file directly on our cloud and share it with your
            friends or colleagues securely with password protection and email
            notifications.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link className={buttonVariants({ variant: "secondary" })} href="/">
              Get Started
            </Link>

            <Link className={buttonVariants()} href="/">
              Learn More
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default HomePage;
