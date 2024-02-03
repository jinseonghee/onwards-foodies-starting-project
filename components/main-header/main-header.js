import Link from "next/link";
import logoImg from '@/assets/logo.png';
import Image from "next/image";
import classes from './main-header.module.css';
import { MainHeaderBackground } from "./main-header-background";

export default function MainHeader() {
    return (
        <>
       <MainHeaderBackground/>
        <header className={classes.header}>
        <Link className={classes.logo} href="/">
            <Image src={logoImg} alt="A plate with food on it" priority/>{/*header img는 항상 제일먼저 로딩되어하기 때무넹 priority */}
            NextLevel Food
        </Link>
        <nav className={classes.nav}>
            <ul>
                <li>
                    <Link href="/meals">Browse Meals</Link>
                </li>
                <li>
                    <Link href="/community">Foodies community</Link>
                </li>
            </ul>
        </nav>
    </header>
    </>
    )
}