import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice';
import { fetchPizza } from '../redux/slices/pizzaSlice';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/index';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';

const Home = () => {
  const categoryId = useSelector((state) => state.filter.categoryId);
  const { items, status } = useSelector((state) => state.pizza);
  const sortType = useSelector((state) => state.filter.sort.sortProperty);
  const currentPage = useSelector((state) => state.filter.currentPage);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const itemsPizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);
  const sortBy = sortType;

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const { searchValue } = React.useContext(SearchContext);
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
        <Categories value={categoryId} onChangeCategory={(i) => onChangeCategory(i)} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Произошла ошибка 😕</h2>
          <p>К сожалению, не удалось получить пиццы. Попробуйте повторить попытку позже.</p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : itemsPizzas}</div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </>
  );
};

export default Home;
