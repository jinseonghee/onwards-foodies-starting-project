'use client'; //error 컴포넌틑는 클라이언트 컴포넌트여야 한다.

export default function Error() { //에러파일과 같은 폴더에 있거나 중첩된 페이지나 레이아웃의 오류만 처리. (세분화 해서 에러 처리)
    return (
        <main className="error">
            <h1>an Error occured!</h1>
            <p>Failed to fetch meal data. Please try again later!</p>

        </main>
    )


}