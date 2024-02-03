'use client'; //next.js에서는 서버에서 렌더링 되기 떄문에 클라이언트에서 사용하는 hook을 사용할 수 없어 사용하고 싶을땐 use client를 사용한다.

import Link from "next/link";
import { usePathname } from "next/navigation";
import classes from './nav-link.module.css';


export default function NavLink({href, children}) {
    const path = usePathname(); //현재 활동경로를 도메인 다음에 줌.
    return (
    <Link href={href} className={path.startsWith(href) ? `${classes.link} ${classes.active}`: classes.link}>
        {children}
    </Link>
    );
}