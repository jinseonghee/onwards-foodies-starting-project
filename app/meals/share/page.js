import classes from './page.module.css';
import ImagePicker from '@/components/meals/image-picker';
import { shareMeal } from '@/lib/action'; //'use client'를 사용하기 위해 컴포넌트를 따로 빼서 server action을 관리

export default function ShareMealPage() {

  return (
    <>
      <header className={classes.header}>
        <h1>
          Share your <span className={classes.highlight}>favorite meal</span>
        </h1>
        <p>Or any other meal you feel needs sharing!</p>
      </header>
      <main className={classes.main}>
        <form className={classes.form} action={shareMeal}> {/*원래 action은 form기능제어 안에 요청이 보내질 경로에 대한 설정이 이뤄지는데 server action을 사용하므로써 nextjs가 자동으로 next서버로 보냄 */}
          <div className={classes.row}>
            <p>
              <label htmlFor="name">Your name</label>
              <input type="text" id="name" name="name" required />
            </p>
            <p>
              <label htmlFor="email">Your email</label>
              <input type="email" id="email" name="email" required />
            </p>
          </div>
          <p>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" required />
          </p>
          <p>
            <label htmlFor="summary">Short Summary</label>
            <input type="text" id="summary" name="summary" required />
          </p>
          <p>
            <label htmlFor="instructions">Instructions</label>
            <textarea
              id="instructions"
              name="instructions"
              rows="10"
              required
            ></textarea>
          </p>
          <ImagePicker label="Your image" name="image"/> {/*여기에 이름을 설정함으로써 formData.get을 통해 image를 추출  */}
          <p className={classes.actions}>
            <button type="submit">Share Meal</button>
          </p>
        </form>
      </main>
    </>
  );
}