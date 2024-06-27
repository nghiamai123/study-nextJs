import Link from "next/link";

const LinkItem = ({ href, pathname, text }) => (
  <li>
    <Link
      href={href}
      className={`${pathname === href ? 'dark:text-white bg-gray-500' : ''} block py-2 px-2 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 rounded-sm lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700`}
      scroll={false}
    >
      {text}
    </Link>
  </li>
);

export default LinkItem;
