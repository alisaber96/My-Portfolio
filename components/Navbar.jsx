"use client";
import { Menu, Moon, Sun, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV_ITEMS = [
  { label: "Home", id: "home", type: "scroll" },
  { label: "CV", href: "/cv", type: "link" },
  { label: "Projects", id: "projects", type: "scroll" },
  { label: "Skills", id: "skills", type: "scroll" },
  { label: "Contact", id: "contact", type: "scroll" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const pathname = usePathname();
  const label = ""

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const systemDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const nextTheme = stored || (systemDark ? "dark" : "light");
    setTheme(nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
  };

  const handleScroll = (id) => {
    setMenuOpen(false);
    if (pathname !== "/") {
      window.location.href = `/#${id}`;
      return;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const isActive = (item) => {
    if (item.type === "link") return pathname === item.href;
    return pathname === "/" && label === item.label;
  };

  const navButtonClass = (active) =>
    `relative rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-200 ${
      label === active.label
        ? "bg-blueprint text-circuit shadow-sm dark:bg-signal/15 dark:text-sky-200"
        : "text-slate-mid hover:bg-lab hover:text-deep-space dark:hover:bg-white/10"
    }`;

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-deep-space/10 bg-white/86 shadow-[0_10px_34px_rgba(10,22,40,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-[#08111f]/82 dark:shadow-[0_14px_42px_rgba(0,0,0,0.28)]"
          : "border-b border-deep-space/8 bg-white/78 backdrop-blur-lg dark:border-white/8 dark:bg-[#08111f]/70"
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-5xl items-center justify-between px-5 sm:px-6">
        <button
          onClick={() => handleScroll("home")}
          className="group flex items-center gap-3 text-left"
          aria-label="Go to home"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-deep-space text-sm font-semibold text-white shadow-sm transition-colors group-hover:bg-circuit dark:bg-white dark:text-deep-space">
            AS
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-[17px] font-semibold tracking-tight text-deep-space transition-colors group-hover:text-circuit">
              Ali Saber
            </span>
            <span className="mt-1 hidden text-[11px] font-medium uppercase tracking-[0.18em] text-slate-mid sm:block">
              A Researcher
            </span>
          </span>
        </button>

        <div className="hidden items-center gap-2 md:flex">
          <ul className="flex items-center gap-1 rounded-full border border-gray-100 bg-white/74 p-1 shadow-sm dark:border-white/10 dark:bg-white/8">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                {item.type === "link" ? (
                  <Link
                    href={item.href}
                    className={navButtonClass(isActive(item))}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
                    onClick={() => handleScroll(item.id)}
                    className={navButtonClass(isActive(item))}
                  >
                    {item.label}
                  </button>
                )}
              </li>
            ))}
          </ul>

          <button
            onClick={toggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-100 bg-white text-slate-mid shadow-sm transition-all hover:border-signal/40 hover:text-deep-space dark:border-white/10 dark:bg-white/8 dark:text-sky-100 dark:hover:bg-white/12"
            aria-label="Toggle dark mode"
            title="Toggle dark mode"
          >
            {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
          </button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-100 bg-white text-slate-mid shadow-sm dark:border-white/10 dark:bg-white/8 dark:text-sky-100"
            aria-label="Toggle dark mode"
          >
            {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-100 bg-white text-slate-mid shadow-sm dark:border-white/10 dark:bg-white/8 dark:text-sky-100"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-gray-100 bg-white/96 px-5 py-4 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-[#08111f]/96 md:hidden">
          <div className="mx-auto flex max-w-5xl flex-col gap-1">
            {NAV_ITEMS.map((item) =>
              item.type === "link" ? (
                <Link
                  key={item.label}
                  href={item.href}
                  className={navButtonClass(isActive(item))}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  key={item.label}
                  onClick={() => handleScroll(item.id)}
                  className={`${navButtonClass(isActive(item))} text-left`}
                >
                  {item.label}
                </button>
              ),
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
