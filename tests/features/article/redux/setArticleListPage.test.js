import {
  ARTICLE_SET_ARTICLE_LIST_PAGE,
} from '../../../../src/features/article/redux/constants';

import {
  setArticleListPage,
  reducer,
} from '../../../../src/features/article/redux/setArticleListPage';

describe('article/redux/setArticleListPage', () => {
  it('returns correct action by setArticleListPage', () => {
    expect(setArticleListPage()).toHaveProperty('type', ARTICLE_SET_ARTICLE_LIST_PAGE);
  });

  it('handles action type ARTICLE_SET_ARTICLE_LIST_PAGE correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: ARTICLE_SET_ARTICLE_LIST_PAGE }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
