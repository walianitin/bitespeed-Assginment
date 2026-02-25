import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans relative overflow-hidden">
      {/* Dotted Background layer */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: 'radial-gradient(#d1d5db 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      <main className="flex-1 flex flex-col items-center pt-16 pb-12 px-4 z-10 w-full max-w-7xl mx-auto">

        {/* Text Group */}
        <div className="text-center max-w-3xl mb-12 flex flex-col items-center">
          <h1 className="text-5xl font-extrabold text-[#0f172a] mb-6 tracking-tight">
            Build Powerful Flows
          </h1>
          <p className="text-lg text-gray-500 mb-10">
            Easily create and manage automated workflows to streamline your tasks.
          </p>
          <Link
            href="/flow"
            className="bg-[#059669] hover:bg-[#047857] text-white px-8 py-3 rounded-md text-base font-medium transition-colors shadow-md inline-block mb-16"
          >
            Get Started
          </Link>
        </div>

        {/* Hero Graphic representing the canvas with edge blending */}
        <div
          className="w-full relative flex-1 flex justify-center mt-4"
          style={{
            maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%), linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%), linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
            WebkitMaskComposite: 'source-in',
            maskComposite: 'intersect'
          }}
        >
          <Image
            src="/landing-page.png"
            alt="Flow Workflow Demonstration"
            width={1600}
            height={1000}
            className="w-full max-w-[1400px] h-auto object-contain"
            priority
          />
        </div>
      </main>
    </div>
  );
}
