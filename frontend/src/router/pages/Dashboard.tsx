import { useState } from 'react';
import { useGetAllRepetitionsQuery } from '@/features/repetition/repetitionApiSlice';
import RepetitionDetails from '@/features/repetition/repetitionDetails/RepetitionDetails';

export default function Dashboard() {
  const [page, setPage] = useState<number>(1);
  const { data: repetitionsData, isLoading } = useGetAllRepetitionsQuery({ page });

  const previousPageHandler = () => {
    setPage((prev) => (prev - 1 > 0 ? prev - 1 : prev));
  };

  const nextPageHandler = () => {
    setPage((prev) => (repetitionsData?.lastPage === prev ? repetitionsData?.lastPage : prev + 1));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard">
      <div className="dashboard__heading-container">
        <h1 className="dashboard__heading">Your repetitions:</h1>
        <div className="dashboard__pagination">
          <button
            onClick={previousPageHandler}
            className="dashboard__pagination-btn"
            type="button"
            disabled={page === 1}
          >
            previous page
          </button>
          <button
            onClick={nextPageHandler}
            className="dashboard__pagination-btn"
            type="button"
            disabled={page === repetitionsData?.lastPage}
          >
            next page
          </button>
        </div>
      </div>
      <div className="dashboard__container">
        {repetitionsData?.repetitions &&
          repetitionsData.repetitions.map((repetition) => (
            <RepetitionDetails key={repetition.id} repetition={repetition} />
          ))}
      </div>
    </div>
  );
}
