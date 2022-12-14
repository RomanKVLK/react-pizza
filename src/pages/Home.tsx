import React from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../redux/store';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import { setCategoryId, setCurrentPage } from '../redux/slices/filter/slice';
import { fetchPizza} from '../redux/slices/pizza/asyncActions';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/index';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { Status } from '../redux/slices/pizza/types';
import NotFoundBlock from '../components/NotFoundBlock/NotFoundBlock';

const Home: React.FC = () => {
  const categoryId = useSelector((state: any) => state.filter.categoryId);
  const { items, status } = useSelector((state: RootState) => state.pizza);
  const sortType = useSelector((state: RootState) => state.filter.sort.sortProperty);
  const currentPage = useSelector((state: any) => state.filter.currentPage);
  const searchValue = useSelector((state: RootState) => state.filter.searchValue);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const itemsPizzas = items.map((obj) => (
      <PizzaBlock key={obj.id} {...obj} />
  ));
  const skeletons = [...new Array(8)].map((_, index) => <Skeleton key={index} />);
  const sortBy = sortType;

  const onChangeCategory = React.useCallback((id: number) => {
    dispatch(setCategoryId(id));
  }, [dispatch]);

  function onChangePage(page: number) {
    dispatch(setCurrentPage(page));
  }

  
  const search = searchValue ? `&search=${searchValue}` : '';

  const getPizzas = async () => {
    dispatch(
      fetchPizza({
        search,
        currentPage,
        sortBy,
        categoryId,
      }),
    );

    window.scrollTo(0, 0);
  };



  React.useEffect(() => {
    getPizzas();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue, currentPage, sortBy, categoryId]);

  const valueSearch = searchValue === '' || items.length > 0;

  React.useEffect(() => {
    const queryString = qs.stringify({
      sortBy,
      categoryId,
      currentPage,
    });

    navigate(`?${queryString}`);
  }, [categoryId, searchValue, currentPage, navigate, sortBy]);

  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={(i: number) => onChangeCategory(i)} />
        <Sort />
      </div>
      {(valueSearch) && <h2 className="content__title">?????? ??????????</h2>}
      {valueSearch ? 
      (status === Status.ERROR) ? (
        <div className="content__error-info">
          <h2>?????????????????? ???????????? ????</h2>
          <p>?? ??????????????????, ???? ?????????????? ???????????????? ??????????. ???????????????????? ?????????????????? ?????????????? ??????????.</p>
        </div>
      ) : (
        <div className="content__items">{status === Status.LOADING ? skeletons : itemsPizzas}</div>
      ) : <NotFoundBlock />}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </>
  );
};

export default Home;

// searchValue === '' || items.length > 0