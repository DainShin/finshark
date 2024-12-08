import axios from "axios";
import { toast } from "react-toastify";

export const handleError = (error: any) => {
    // Axios 요청중 발생한 에러인지 확인
    if(axios.isAxiosError(error)) {
        var err = error.response; // AxiosError 객체에서 HTTP 응답 정보를 가져옴
        if(Array.isArray(err?.data.errors)) // 서버 응답에서  errors가 배열로 반환되었는지 확인
        {
            // errors 배열 순회 -> 각 요소의 description 속성을 경고 메세지로 표시
            for(let val of err?.data.errors){
                // react-toastify
                toast.warning(val.description);
            }
        } else if(typeof err?.data.errors === 'object') {
            for(let e in err?.data.errors) {
                toast.warning(err.data.errors[e][0]);
            }
        } else if(err?.data) {
            toast.warning(err.data);
        } else if (err?.status === 401) {
            toast.warning("Please login");
            window.history.pushState({}, "LoginPage", "/login"); // push them back to the login page
        } else if (err) {
            toast.warning(err?.data);
        }
    }
};

/* 
    for..of : 배열순회
    for..in : 객체순회 (배열을 for in 이용하여 출력시 값이 아닌 인덱스 번호가 출력)

*/
