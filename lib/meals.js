import sql from 'better-sqlite3';

const db = sql('meals.db')

export async function getMeals() {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    //throw new Error('Loading meals failed')
    return db.prepare('SELECT * FROM meals').all();
}

export function getMeal(slug) {
    //return db.prepare('SELECT * FROM meals WHERE slug = ' + slug) 이렇게 사용하면 sql인젝션에 노출됨. 해서 물음표를 플레이스홀더로 사용해야 함.
    return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug) //한가지 기록만 원하기 때문에 get, 해당 플레이스홀더에 들어가는건 get 안에 slug를 이용해서 사용해야 sql인젝션으로부터 better-sqlite3기 자동으로 보호해줌

}