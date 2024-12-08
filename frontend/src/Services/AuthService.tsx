import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler";
import { UserProfileToken } from "../Models/User";

// backend server
const api = "http://localhost:5132/api/";

export const loginAPI = async (username: string, password: string) => {
    try
    {
        // UserProfileToken 제네릭 타입 사용 -> 응답 데이터의 타입 명시
        const data = await axios.post<UserProfileToken>(api + "account/login", {
           // 사용자 로그인 정보를 서버로 전달
            username: username,
            password: password,
        });
        return data; // 서버로부터 반환받은 응답 데이터 반환
    }
    catch (error)
    {
    handleError(error)
    }
};

export const registerAPI = async (email:string, username: string, password: string) => {
    try
    {
        const data = await axios.post<UserProfileToken>(api + "account/register", {
            email: email,
            username: username,
            password: password,
        });
        return data;
    }
    catch (error)
    {
        handleError(error)
    }
};