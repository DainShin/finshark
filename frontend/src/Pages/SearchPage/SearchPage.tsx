import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react';
import { searchCompanies } from '../../api';
import { CompanySearch } from '../../company';
import Search from '../../Search/Search';
import CardList from '../../Components/CardList/CardList';
import ListPortfolio from '../../Components/Portfolio/ListPortfolio/ListPortfolio';
import { PortfolioGet } from '../../Models/Portfolio';
import { portfolioAddAPI, portfolioDeleteAPI, portfolioGetAPI } from '../../Services/PortfolioService';
import { toast } from 'react-toastify';

interface Props { }

const SearchPage: React.FC<Props> = (props: Props) => {
  // State 선언
  const [search, setSearch] = useState<string>('');
  const [portfolioValues, setPortfolioValues] = useState<PortfolioGet[] | null>([]);
  const [searchResult, setSearchResult] = useState<CompanySearch[]>([]);
  const [serverError, setServerError] = useState<string>('');

  // 입력값 변경 이벤트 핸들러
  // 매개변수 e: ChangeEvent 타입으로, input 요소에서 발생하는 변경 이벤트를 나타냄
  // e.target.value: input 요소에 현재 입력된 값을 반환
  
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value); // 입력된 값을 상태값으로 업데이트
    console.log(e);
  };

  useEffect(() => {
    getPortfolio();
  }, []);

  const getPortfolio = () => {
    portfolioGetAPI()
      .then((res) => {
        if(res?.data) {
          setPortfolioValues(res?.data);
        }
      })
      .catch((e) => {
        toast.warning("Could not get portfolio values");
      });
  }

  // 포트폴리오 추가 핸들러
  const onPortfolioCreate = (e: any) => {
    e.preventDefault();
    portfolioAddAPI(e.target[0].value)
      .then((res) => {
        if(res?.status === 204) {
          toast.success("Stock added to portfolio");
          getPortfolio();
        }
      })
      .catch((e) => {
        toast.warning("Could not create portfolio item");
      })
    
  };

  // 포트폴리오 삭제 핸들러
  const onPortfolioDelete = (e: any) => {
    e.preventDefault(); // 기본 제출 동작을 막음
    portfolioDeleteAPI(e.target[0].value)
      .then((res) => {
        if(res?.status === 200) {
          toast.success("Stock deleted from portfolio");
          getPortfolio();
        }
      })
      .catch((e) => {
        toast.warning("Could not delete portfolio item");
      })
   
  };

  // 검색 제출 핸들러
  const onSearchSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    // 서버로 search 키워드를 보내 검색 결과 받아옴
    const result = await searchCompanies(search);
    if (typeof result === 'string') {
      setServerError(result); // 에러 메시지 업데이트
    } else if (Array.isArray(result.data)) {  // 배열인지 확인할때 쓰이는 메서드
      setSearchResult(result.data); // 검색 결과 업데이트
    }
    console.log(searchResult);
  };

  return (
    <>
      <Search
        onSearchSubmit={onSearchSubmit}
        search={search}
        handleSearchChange={handleSearchChange}
      />
      {serverError && <h1>{serverError}</h1>}
      {/* serverError가 존재하면 에러 메시지 출력 */}
      <ListPortfolio portfolioValues={portfolioValues!} onPortfolioDelete={onPortfolioDelete} />
      <CardList searchResults={searchResult} onPortfolioCreate={onPortfolioCreate} />
    </>
  );
};

export default SearchPage;
