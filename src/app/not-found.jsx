import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="bg-gradient-to-t h-[100vh] from-[#ebf6ff] to-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-[#006abc]">404</h1>
        <p className="mt-4 text-lg text-gray-700">
          The page you have requested does not exist.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block bg-[#5CE6FF] hover:bg-[#00bfff] text-black py-4 px-6 border-1 border-[#00bfff] rounded-4xl"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  );
}
