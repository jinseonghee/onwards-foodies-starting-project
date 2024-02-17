'use client';

import {useFormStatus} from 'react-dom'

export default function MealsFormSubmit() {
    const {pending} = useFormStatus(); //요청(status.pending)이 진행중이면 true, 아님 false인 pending 속성(client의 속성)
    //status를 받길 원하는 form 안에 있을때만 form의 status를 받을 수 있음
    
    return <button disabled={pending}> {/*버튼이 포함된 form이 제출중이라면 버튼을 비활성화, 아니면 활성화 */}
        {pending ? 'Submitting... ' : 'Share Meal'}
    </button>
    
}