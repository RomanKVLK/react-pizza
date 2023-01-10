export type Sort = {
    name: string;
    sortProperty: 'rating' | 'title' | 'price';
}
  
export interface FilterSliseState {
    searchValue: string;
    currentPage: number;
    categoryId: number;
    sort: Sort;
}