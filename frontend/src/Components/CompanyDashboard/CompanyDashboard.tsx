import React from 'react'
import { Outlet } from 'react-router-dom'
// <Outlet /> 있는 위치에 Routes에서 정의한 자식 컴포넌트가 렌더링 됨
// 자식라우트를 동적으로 바꾸려면 반드시 부모 라우트 안에 <Outlet/> 이 있어야됨.
// Outlet 자리에 CompanyProfile 또는 IncomeStatement 뜨게됨

// children: React 컴포넌트 태그 사이에 삽입된 자식요소 참조
// 부모 컴포넌트가 전달한 자식 콘텐츠가 children 으로 전달되어 CompanyDashboard에서 렌더링됨
// 부모컴포넌트가 전달한 자식 콘텐츠: <Tile/>
type Props = {
    children: React.ReactNode; 
    ticker: string;
}

const CompanyDashboard = ({ children, ticker }: Props) => {
    return (
        <div className="relative md:ml-64 bg-blueGray-100 w-full">
            <div className="relative pt-20 pb-32 bg-lightBlue-500">
                <div className="px-4 md:px-6 mx-auto w-full">
                    <div>
                        <div className="flex flex-wrap">{children}</div>
                        <div className="flex flex-wrap">{<Outlet context={ticker}/>}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompanyDashboard
