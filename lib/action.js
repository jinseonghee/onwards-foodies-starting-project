'use server';

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";

function isInvalidText(text) {
    return !text || text.trim() === '';
}

export async function shareMeal(formData) { //이 함수는 자동적으로 제출된 formData를 받게 됨(form의 input 태그들에 모인 데이터)
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
            throw new Error('Invalid input');
        }


        //좌우의 공백을 제거한 뒤 빈 문자열과 같은지 검사, 같다면 유효하지 않는다는 것.
        await saveMeal(meal);
        redirect('/meals'); //사용자를 다른페이지로 redirect
    }