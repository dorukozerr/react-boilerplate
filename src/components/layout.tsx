import type { ReactNode } from "react";
import { Link } from "react-router-dom";

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="w-full h-full flex flex-col justify-start items-start">
      <header className="p-4 w-full flex justify-between items-center gap-4">
        <h2>React Boilerplate</h2>
        <nav className="flex justify-center items-center gap-4">
          <Link to="/">Home</Link>
          <Link to="/comments">Comments</Link>
          <Link to="/users">Users</Link>
        </nav>
      </header>
      <section className="w-full flex-1">{children}</section>
    </main>
  );
};
