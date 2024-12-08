/* 
    user, token, registerUser, loginUser, logout, isLoggedIn 상태를 
    UserContext를 통해 모든 컴포넌트에서 접근 가능하게 함

    UserContext.Provider을 통해 하위 컴포넌트에 상태 값과 함수를 제공할 수 있음.
*/

// createContext: 리액트 앱에서 전역상태를 다룰때 사용하는 기능
import { createContext, useEffect, useState } from "react"; 
import { UserProfile } from "../Models/User";
import { useNavigate } from "react-router-dom";
import { loginAPI, registerAPI } from "../Services/AuthService";
import { toast } from "react-toastify";
import React from "react";
import axios from "axios";

// UserContextType 이라는 TypeScript 타입을 정의
type UserContextType = {
    user: UserProfile | null;
    token: string | null;
    registerUser: (email: string, username: string, password: string) => void;
    loginUser: (username:string, password:string) => void;
    logout: () => void;
    isLoggedIn: () => boolean;
};

// children: 컴포넌트의 자식요소들을 나타냄
// React.ReactNode: React에서 렌더링할 수 있는 요소 포함 (ex. jsx요소, 문자열, 숫자, 배열 등)
type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
    
    const navigate = useNavigate();
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<UserProfile | null>(null);
    const [isReady, setIsReady] = useState(false);

    useEffect( () => {
        const user = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        if(user && token) {
            setUser(JSON.parse(user));
            setToken(token);
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        }
        setIsReady(true);
    }, [])

    const registerUser = async (
        email:string, 
        username:string, 
        password: string
    ) => {
        await registerAPI(email,username,password).then((res) => {
            if(res) {
                localStorage.setItem("token", res?.data.token);
                const userObj = {
                    userName: res?.data.userName,
                    email: res?.data.email
                }
                localStorage.setItem("user", JSON.stringify(userObj));
                setToken(res?.data.token!);
                setUser(userObj!);
                toast.success("Login Success!");
                navigate("/search");
            }
        }).catch((e) => toast.warning("Server error occurred"));
    }

    const loginUser = async (
        username:string, 
        password: string
    ) => {
        await loginAPI(username, password)
            .then((res) => {
                if(res) {
                    localStorage.setItem("token", res?.data.token);
                    const userObj = {
                        userName: res?.data.userName,
                        email: res?.data.email
                    }
                    localStorage.setItem("user", JSON.stringify(userObj));
                    setToken(res?.data.token!);
                    setUser(userObj!);
                    toast.success("Login Success!");
                    navigate("/search");
                }
            })
            .catch((e) => toast.warning("Server error occurred"));
    }

    const isLoggedIn = () => {
        if(!isReady) return false;
        return !!token && !!user;
    }

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        setToken("");
        navigate("/");
    }

    return (
        <UserContext.Provider value={{loginUser, user, token, logout, isLoggedIn, registerUser}}
        >
            {isReady ? children : null}

        </UserContext.Provider>
    )
};


export const useAuth = () => React.useContext(UserContext);

/*
    context: a component with no jsx. that is global
*/