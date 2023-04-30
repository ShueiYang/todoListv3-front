import { FaRegListAlt, FaGithub } from "react-icons/fa";
import ThemeButton from "./items/ThemeButton";



const Header = () => {

  return (
    <header className="flex w-full justify-between items-center my-4 px-4">
      <div className="flex items-center">
        <FaRegListAlt className="text-4xl sm:text-5xl text-[#7277da] dark:text-pink-600"/>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium ml-2 sm:ml-3">
          Todo List
        </h1>    
      </div>
      <div className="flex gap-8">
        <a href="https://github.com/ShueiYang/todoListv3-front"
          className="flex items-center"
          rel="noopener noreferrer"
          target="_blank"
        >
          <FaGithub className="w-6 text-xl text-slate-900 dark:text-stone-50"/>
          <span>Source</span>
        </a>
        <ThemeButton />
      </div>
    </header>
  )
}

export default Header;