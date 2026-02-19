import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12 text-center bg-gradient-to-tr from-blue-300 to-pink-300 relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"></div>

        <div className="relative z-10 max-w-4xl">
          <span className="inline-block bg-white text-blue-900 text-sm font-semibold px-4 py-1 rounded-full mb-6 shadow-sm">
            ✨ Your thoughts, your voice
          </span>

          <h1 className="text-5xl md:text-7xl font-extrabold text-blue-900 mb-6 leading-tight drop-shadow-sm">
            Unleash Your Thoughts —
            <span className="text-pink-600"> Inspire the World</span>
          </h1>

          <p className="text-gray-700 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed mb-10">
            A space where every voice matters and every story finds its place. Write, share, and connect with readers from around the world.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/explore"
              className="bg-blue-900 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              🔍 Explore Blogs
            </Link>
            <Link
              to="/register"
              className="bg-pink-500 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-pink-400 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              ✍️ Start Writing
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-20 px-6">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Why Blog Here?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            { icon: "✍️", title: "Rich Text Editor", desc: "Write beautifully formatted posts with our built-in editor. Add images, code blocks, and more." },
            { icon: "❤️", title: "Like & Comment", desc: "Engage with the community. Like posts you love and share your thoughts in the comments." },
            { icon: "🏷️", title: "Tags & Discovery", desc: "Organize your writing with tags. Help readers find exactly what they're looking for." },
          ].map((f, i) => (
            <div key={i} className="text-center p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-5xl mb-4">{f.icon}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{f.title}</h3>
              <p className="text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Banner */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to share your story?</h2>
        <p className="text-blue-200 mb-8 text-lg">Join thousands of writers already sharing their ideas.</p>
        <Link
          to="/register"
          className="bg-pink-500 hover:bg-pink-400 text-white px-10 py-4 rounded-xl text-lg font-semibold transition-all shadow-lg inline-block"
        >
          Get Started — It's Free
        </Link>
      </div>
    </>
  );
}

export default Home;
