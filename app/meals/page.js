import MealsGrid from '@/components/meals/meals-grid';
import { getMeals } from '@/lib/meals';
import Link from 'next/link';
import { Suspense } from 'react'; //컴포넌트 일부 데이터 또는 리소스가 불리울때까지 로딩 상태를 처리하고 대체 컨텐츠를 표시 가능
import classes from './page.module.css';

async function Meals() {
    const meals = await getMeals();    
    return <MealsGrid meals={meals}/>
}

export default function MealsPage() {
    //const meals = await getMeals();

    return (
        <>
        <header className={classes.header}>
            <h1>
                Delicious meals, created{' '}
                <span className={classes.highlight}>by you</span>
            </h1>
            <p>
                choose your favorite recipe and cook it yourself. It is easy and fun!
            </p>
            <p className={classes.cta}>
                <Link href="/meals/share"> Share your favorite recipe</Link>
            </p>
        </header>
        <main className={classes.main}>
            {/* <MealsGrid meals={meals}/> */}
            <Suspense fallback={ <p className={classes.loading}>Fetching Meals...</p>}>
            <Meals/>
            </Suspense>
        </main>
        </>
    )

}