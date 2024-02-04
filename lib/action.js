'use server';

export async function shareMeal(formData) { //이 함수는 자동적으로 제출된 formData를 받게 됨(form의 input 태그들에 모인 데이터)
        //'use server'; //이건 server action이란 걸 생성하는데, 오직 서버에서만 실행 될 수 있게 보장해주는 것
   
        const meal = {
            title: formData.get('title'),
            summary: formData.get('summary'),
            instructions: formData.get('instructions'),
            image: formData.get('image'),
            creator: formData.get('name'),
            creator_image: formData.get('email')
        }
    }