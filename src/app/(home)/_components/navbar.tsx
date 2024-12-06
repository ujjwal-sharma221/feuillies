import Image from "next/image";
import Link from "next/link";

import logo from "@/assets/logo.svg";
import { SearchInput } from "./search-input";

export function Navbar() {
  return (
    <nav className="flex items-center justify-between size-full">
      <div className="flex gap-3 items-center shrink-0 pr-6">
        <Link href="/">
          <Image src={logo} alt="logo" width={36} height={36} />
        </Link>
        <h3 className="text-xl font-bold">Feuillies</h3>
      </div>
      <SearchInput />
      <div></div>
    </nav>
  );
}
