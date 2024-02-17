import fs from 'node:fs'; // 파일 시스템을 이용하기 위해
import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';

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

export async function saveMeal(meal) {
    meal.slug= slugify(meal.title, {lower: true})//모든 문자를 소문자로 저장
    meal.instructions = xss(meal.instructions);

    const extension = meal.image.name.split('.').pop();
    const fileName = `${meal.slug}.${extension}`;

    
    //이미진 db에 저장되는게 아닌 파일시스템에 저장되어야 함.
    const stream = fs.createWriteStream(`public/images/${fileName}`); //어떤 파일에 데이터를 쓸 수 있도록 해주는 stream 생성,createWriteStream는 기본적으로 파일을 쓰고 싶은 경로가 필요
    const bufferdImage = await meal.image.arrayBuffer();

    stream.write(Buffer.from(bufferdImage), (error) => {
        if(error) {
            throw new Error('Saving image failed!')
        }
    }); //write가 작동하기 위해선 buffer가 필요, write에서 첫번째 인수는 저장할 파일,두번째 인수는 쓰기를 마치면 실행될 함수

    meal.image = `/images/${fileName}`

    db.prepare(`
        INSERT INTO meals
        (title, summary, instructions, creator, creator_email, image, slug) 
        VALUES (
            @title,
            @summary,
            @instructions,
            @creator,
            @creator_email,
            @image,
            @slug
        )
    `).run(meal);

}