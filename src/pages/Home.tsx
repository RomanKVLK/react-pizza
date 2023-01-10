import React from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/store';
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

const Home: React.FC = () => {
  const categoryId = useSelector((state: any) => state.filter.categoryId);
  const { items, status } = useSelector((state: any) => state.pizza);
  const sortType = useSelector((state: any) => state.filter.sort.sortProperty);
  const currentPage = useSelector((state: any) => state.filter.currentPage);
  const searchValue = useSelector((state: any) => state.filter.searchValue);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const itemsPizzas = items.map((obj: any) => (
      <PizzaBlock key={obj.id} {...obj} />
  ));
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);
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
      <h2 className="content__title">Все пиццы</h2>
      {status === Status.ERROR ? (
        <div className="content__error-info">
          <h2>Произошла ошибка 😕</h2>
          <p>К сожалению, не удалось получить пиццы. Попробуйте повторить попытку позже.</p>
        </div>
      ) : (
        <div className="content__items">{status === Status.LOADING ? skeletons : itemsPizzas}</div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </>
  );
};

export default Home;
