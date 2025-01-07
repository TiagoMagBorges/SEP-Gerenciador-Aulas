import Link from "next/link";

export default function Logo(){
    return(
        <Link
            style={{
                textDecoration: 'none',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '25px',
                textShadow: '0 0 10px #CCC, 0 0 20px #CCC, 0 0 30px #CCC, 0 0 40px #CCC, 0 0 50px #CCC',
            }}
            href={'/'}>SEP</Link>
    );
}