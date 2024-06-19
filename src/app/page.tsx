import Link from "next/link";
import ButtonRedirect from "@/components/ButtonRedirect";

export default function Home() {

  return (
    <main>
      <ul>
        <li>
          <Link href={"/login"}>Login</Link>
        </li>
      </ul>
      <ul>
        <li>
          <Link href={"/register"}>Register</Link>
        </li>
      </ul>
      <ButtonRedirect />
    </main>
  );
}
