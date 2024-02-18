import { getMeal } from '@/lib/meals';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import classes from './page.module.css';

export async function generateMetadata({ params }) {
    const meal = getMeal(params.mealSlug);

    if(!meal) {
        notFound();
    }

    return {
        title : meal.title,
        description: meal.summary,
    };
  }

export default function MealDetailPage({params}) { //여기서 받은 params가 key value의 객체형태로 저장이 되고, 파일의 대괄호에 설정한 이름이 key의 역할을 하게됨. 실제로 url에 인코딩 된 값이 그 키의 값이 됨
    //그리고 Db에서 해당 값을 찾기 위해 필요한 값임
    const meal = getMeal(params.mealSlug); //여기서 slug는 단순히 url에 인코딩 된 부분. 이 url은 여기 플레이스더([mealSlug])의 도움으로 포착된 것
    //db에서 meal을 가져올 수 있게 하는 식별자임(params.mealSlug)

    if(!meal) {
        notFound();
    }

    meal.instructions = meal.instructions.replace(/\n/g, '<br />')//줄바꿈 무시 해결, replace로 덮어써서 string의 부분을 바꾸기

    return (
        <>
        <header className={classes.header}>
            <div className={classes.image}>
                <Image src={meal.image} alt={meal.title} fill/>
            </div>
            <div className={classes.headerText}>
                <h1>{meal.title}</h1>
                <p className={classes.creator}>
                    by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
                </p>
                <p className={classes.summary}>{meal.summary}</p>
            </div>
        </header>
        <main>
            {/*컨텐츠를 html로 출력시키면 크로스사이트스크립트 공격에 노출되기 때문에 저걸로 검증해야함. 
                이건 속성을 객체의 값으로 가져가야하고, 그 객첸 __html 속성을 가지고 있어 실제 화면에 출력되어야 하는 html 코드를 가지고 있는다.
            */}
            <p className={classes.instructions} 
            dangerouslySetInnerHTML={{__html: meal.instructions}}> 
            </p>
        </main>
        </>
    )
}