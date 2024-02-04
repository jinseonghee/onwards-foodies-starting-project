//not-found.js 폴더는 어느곳이나 추가해 줘도 된다. 그러면 자동으로 형제 요소나 중첩된 페이지까지 커버 가능하다.
export default function NotFound() {
    return (
        <main className="not-found">
            <h1>Not Found</h1>
            <p>Unfortunately, We could not found the requested page or resource. </p>
        </main>
    )
}