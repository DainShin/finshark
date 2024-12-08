import React, { SyntheticEvent } from 'react'
import CardPortfolio from '../CardPortfolio/CardPortfolio';

// Props: React 컴포넌트가 외부로부터 전달받는 데이터와 함수의 집합을 정의하는 타입
// Props를 사용해 부모컴포넌트에서 자식 컴포넌트로 데이터를 전달할 수 있음
// Props는 객체 형태로 데이터를 포함하며 각 데이터 필드에 대해 타입을 지정할 수 있음
interface Props {
  portfolioValues: string[];
  onPortfolioDelete: (e: SyntheticEvent) => void
}

const ListPortfolio = ({ portfolioValues, onPortfolioDelete }: Props) => {
  return (
    <section id="portfolio">
      <h2 className="mb-3 mt-3 text-3xl font-semibold text-center md:text-4xl">
        My Portfolio
      </h2>
      <div className="relative flex flex-col items-center max-w-5xl mx-auto space-y-10 px-10 mb-5 md:px-6 md:space-y-0 md:space-x-7 md:flex-row">
        <>
          {portfolioValues.length > 0 ? (
            portfolioValues.map((portfolioValue) => {
              return (
                <CardPortfolio
                  portfolioValue={portfolioValue}
                  onPortfolioDelete={onPortfolioDelete}
                />
              );
            })
          ) : (
            <h3 className="mb-3 mt-3 text-xl font-semibold text-center md:text-xl">
              Your portfolio is empty.
            </h3>
          )}
        </>
      </div>
    </section>
  );
}

export default ListPortfolio