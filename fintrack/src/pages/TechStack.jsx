function TechStack() {
  return (
    <div className="p-5 text-[var(--color-text)]">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Tech Stack</h1>
        <p className="mt-4 text-xl">
          Tools and technologies used to build this project.
        </p>
      </div>

      <div className="mt-10 flex flex-row">
        <p className="mt-2 text-xl">🚀 Made on: 10-02-2025</p>
        <div className="flex flex-row">
          <img
            src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/github.png"
            alt="Github"
            className="mb-4 h-10 w-10"
          />
          <a
            href="https://github.com/KDSCRIPT/fintrack"
            className="mt-2 text-xl underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Hosted on GitHub
          </a>
        </div>
      </div>

      <div className="mt-2 bg-[var(--color6)] p-1 font-semibold">
        <div className="mt-4 grid grid-cols-3 gap-6">
          <div className="flex flex-col items-center">
            <img
              src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/html.png"
              alt="HTML"
              className="mb-4 h-10 w-10"
            />
            <p className="text-center">HTML: Structure of the web pages.</p>
          </div>
          <div className="flex flex-col items-center">
            <img
              src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/css.png"
              alt="CSS"
              className="mb-4 h-10 w-10"
            />
            <p className="text-center">CSS: Styling and layout design.</p>
          </div>
          <div className="flex flex-col items-center">
            <img
              src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/tailwind_css.png"
              alt="Tailwind CSS"
              className="mb-4 h-10 w-10"
            />
            <p className="text-center">
              Tailwind CSS: Utility-first CSS framework for rapid UI building.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <img
              src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/react.png"
              alt="React"
              className="mb-4 h-10 w-10"
            />
            <p className="text-center">
              React: A JavaScript library for building user interfaces.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <img
              src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/redux.png"
              alt="Redux"
              className="mb-4 h-10 w-10"
            />
            <p className="text-center">
              Redux: A state management library for JavaScript apps.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <img
              src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/react_query.png"
              alt="React Query"
              className="mb-4 h-10 w-10"
            />
            <p className="text-center">
              React Query: Data fetching and synchronization for React apps.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <img
              src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/vite.png"
              alt="Vite"
              className="mb-4 h-10 w-10"
            />
            <p className="text-center">
              Vite: A fast and modern development server and build tool.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <img
              src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/javascript.png"
              alt="JavaScript"
              className="mb-4 h-10 w-10"
            />
            <p className="text-center">
              JavaScript: The core language for dynamic and interactive web
              content.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <img
              src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/supabase.png"
              alt="Supabase"
              className="mb-4 h-10 w-10"
            />
            <p className="text-center">
              Supabase: Open-source Firebase alternative, offers database,
              authentication, and storage.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TechStack;
