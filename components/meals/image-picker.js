'use client'; //이벤트 핸들러는 즉, onClick 속성에 함수나 값을 설정하거나 어떤 다른 이벤트 핸들러들은 서버 컴포넌트에 사용할 수 없다. (왜냐하면 유저가 브라우저에서 버튼을 클릭하기 때문에)

import { useRef, useState } from 'react';
import classes from './image-picker.module.css';
import Image from 'next/image';

export default function ImagePicker({label, name}) {
    const imageInput = useRef()//useRef는 ref를 가져와서 html 요소로 연결시켜줌
    const [pickedImage, setPickedImage] = useState();

    function handlePickClick() {
        imageInput.current.click();//ref를 사용하여 클릭 메소드를 작동하게 함. current에 먼저 접근해야 하는데 이것이 실제로 연결된 요소와 객체에 접근할 수 있게하기 때문
    }
    function handleImageChange(event) { //밑 input의 onChange속성에 이 함수를 추가해 줘서 자동으로 event객체가 생김
        const file = event.target.files[0];

        if(!file) {
            setPickedImage(null); //이미지가 설정되지 않았을 경우 미리보기 된 이미지를 재설정
            return;
        }
        const fileReader = new FileReader(); //이미지를 미리보기 하려면 data url로 변환 필요(단순히 이미지 요소의 입력값으로 사용)

        fileReader.onload = () => { //fileReader는 아무것돋 반환하지 않기 때문에 onload로 data url을 얻는다.
            setPickedImage(fileReader.result) //
        }

        fileReader.readAsDataURL(file); //filereder를 이용해 file을 이 메소드로 전달
    }

    return (
        <div className={classes.picker}>
            <label htmlFor={name}>{label}</label> {/*htmlfor을 이용하여 이 label을 input에 연결시켜주는 역할을 해줌  */}
            <div className={classes.controls}>
                <div className={classes.preview}>
                    {!pickedImage && <p>No image picked yet.</p>}
                    {pickedImage && (
                        <Image
                        src={pickedImage}
                        alt="The image selected by The user."
                        fill
                        />
                    )}

                </div>
                <input
                className={classes.input} 
                type="file"
                id={name}
                accept="image/png, image/jpeg"
                name={name}
                //multiple 파일 여러개 선택 가능
                ref={imageInput} //ref의 속성값으로 샤용
                onChange={handleImageChange}//input 이벤트에 변화 생길때 감지
                required // 이미지가 선택되지 않았을 경우 <form>을 제출 할 수 없음
                 /> {/*id를 image로 하여 이 label을 input에 연결시킴, accept는 어떤 파일이 접수되는지 제어해줌, name은 나중에 업로드된 이미지를 추출하는데 사용 */}
                <button 
                className={classes.button}
                type="button"
                onClick={handlePickClick}>
                    Pick an Image
                </button>
            </div>
        </div>
        
    )
}