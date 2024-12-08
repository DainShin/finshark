import React, { SyntheticEvent } from 'react'
import Card from '../Card/Card';
import { CompanySearch } from '../../company';
import { v4 as uuidv4 } from "uuid";

interface Props {
  searchResults: CompanySearch[];
  onPortfolioCreate: (e: SyntheticEvent) => void; // 반환값이 아무것도 없음
}

const CardList: React.FC<Props> = ({ searchResults, onPortfolioCreate }: Props): JSX.Element => {
  return (
    <>
      {searchResults.length > 0 ? (
        searchResults.map((result) => {
          return <Card id={result.symbol} key={uuidv4()} searchResult={result} onPortfolioCreate={onPortfolioCreate} />;
          // uuidv4()는 각 Card 컴포넌트에 고유한 key를 부여하여 React가 컴포넌트 리스트를 효과적으로 관리하고 업데이트할 수 있도록 함.
        })
      ) : (
        <p className="mb-3 mt-3 text-xl font-semibold text-center md:text-xl">
          No results!
        </p>
      )}

    </>
  )
}

export default CardList;