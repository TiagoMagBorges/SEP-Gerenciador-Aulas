import Link from "next/link";

export default function Logo(){
  return(
      <Link
          className={'logo'}
          href={'/'}>SEP</Link>
  );
}