import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { CompanyProfile } from '../../company';
import { getCompanyProfile } from '../../api';
import Sidebar from '../../Components/Sidebar/Sidebar';
import CompanyDashboard from '../../Components/CompanyDashboard/CompanyDashboard';
import Tile from '../../Components/Tile/Tile';
import Spinner from '../../Components/Spinner/Spinner';
import CompFinder from '../../Components/CompFinder/CompFinder';
import TenKFinder from '../../Components/TenKFinder/TenKFinder';

interface Props { }

function CompanyPage({ }: Props) {
  //https:localhost:3000/
  // React Router의 useParams 훅 사용해 URL 경로에서 전달된 매개변수를 가져옴. 여기서 ticker라는매개변수 값이 추출됨.
  // let ticker = useParams(); => 객체가 ticker에 저장됨
  // let {ticker} = useParams(); => 구조분해할당 => useParams()가 반환한 객체에서 ticker 속성만 추출해 변수 ticker에 저장
  let { ticker } = useParams();

  // 초기값은 undefined, company 타입은 CompanyProfile|undefined
  const [company, setCompany] = useState<CompanyProfile>();


  // useEffect: 컴포넌트가 렌더링된 이후 실행됨. 
  // 상태(company)가 변경되면 컴포넌트를 다시 렌더링함 => setCompany
  // 두번째 인자로 빈배열을 전달하여 useEffect가 컴포넌트가 처음 렌더링될때만 실행되도록 설정
  useEffect(() => {
    // 비동기함수 getProfileInit 정의. 회사정보를 가져옴
    const getProfileInit = async () => {
      const result = await getCompanyProfile(ticker!); // api.tsx에서 getCompanyProfile에 접근
      setCompany(result?.data[0]); // setCompany가 호출되면 페이지 렌더링. 
    }
    getProfileInit();
  }, [])

  return <>
    {company ? (
      <div className="w-full relative flex ct-docs-disable-sidebar-content overflow-x-hidden">
        <Sidebar/>
        <CompanyDashboard ticker={ticker!}>
          <Tile title="Company Name" subTitle={company.companyName}/>
          <Tile title="Price" subTitle={"$" + company.price.toString()}/>
          <Tile title="DCF" subTitle={"$" + company.dcf.toString()}/>
          <Tile title="Sector" subTitle={company.sector}/>
          <CompFinder ticker={company.symbol}/>
          <TenKFinder ticker={company.symbol}/>
          <p className='bg-white shadow rounded text-medium font-medium'>
            {company.description}
          </p>
        </CompanyDashboard>
      </div>
    ) : ( <Spinner/>)
    }
  </>
}

export default CompanyPage