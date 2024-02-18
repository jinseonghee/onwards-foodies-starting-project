'use server';

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { saveMeal } from "./meals";

function isInvalidText(text) {
    return !text || text.trim === '';
}

export async function shareMeal(prevState, formData) { //이 함수는 자동적으로 제출된 formData를 받게 됨(form의 input 태그들에 모인 데이터)
        //'use server'; //이건 server action이란 걸 생성하는데, 오직 서버에서만 실행 될 수 있게 보장해주는 것
   
        const meal = {
            title: formData.get('title'),
            summary: formData.get('summary'),
            instructions: formData.get('instructions'),
            image: formData.get('image'),
            creator: formData.get('name'),
            creator_email: formData.get('email')
        };

        if(
            isInvalidText(meal.title) || 
            isInvalidText(meal.summary) || 
            isInvalidText(meal.instructions) ||
            isInvalidText(meal.image) ||
            isInvalidText(meal.creator) ||
            isInvalidText(meal.creator_email) ||
            !meal.creator_email.includes('@') ||
            !meal.image || meal.image.size === 0 //유효하지 않은 파일 검사
        ) {
            return {
                message: 'Invalid input.'  //직렬화가 가능한 객체여야 한다(이 객체에 메소드를 만들면 안된다.)
            }
        }


        //좌우의 공백을 제거한 뒤 빈 문자열과 같은지 검사, 같다면 유효하지 않는다는 것.
        await saveMeal(meal);
        revalidatePath('/meals') //path 유효성 검사(페이지에 변화하는 데이터가 있으면 다시 path에 대한 유효성 검사를 함.) 
        //두번쨰 인수로 layout을 받는데 중첩된 경로로 유효성 재검사를 하지 못하기 때문에 layout자리에 기본값은 page로 이 path의 페이지만 재검사 하겠단 의미
        //revalidatePath('/', 'layout') //모드 경로를 재검사 하고 싶을 경우
        redirect('/meals'); //사용자를 다른페이지로 redirect
    }