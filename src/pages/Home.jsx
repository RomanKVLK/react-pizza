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
  const items = useSelector((state) => state.pizza.items);
  const sortType = useSelector((state) => state.filter.sort.sortProperty);
  const currentPage = useSelector((state) => state.filter.currentPage);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = React.useState(true);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const { searchValue } = React.useContext(SearchContext);

  const itemsPizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);
  const search = searchValue ? `&search=${searchValue}` : '';
  const sortBy = sortType.sortProperty;

  const getPizzas = async () => {
    setIsLoading(true);

    dispatch(
      fetchPizza({
        search,
        currentPage,
        sortBy,
        categoryId,
      }),
    );
    setIsLoading(false);

    window.scrollTo(0, 0);
  };

  React.useEffect(() => {
    getPizzas();
  }, []);

  React.useEffect(() => {
    const queryString = qs.stringify({
      sortProperty: sortType,
      categoryId,
      currentPage,
    });

    navigate(`?${queryString}`);
  }, [categoryId, sortType, searchValue, currentPage, navigate]);

  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={(i) => onChangeCategory(i)} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : itemsPizzas}</div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </>
  );
};

export default Home;
