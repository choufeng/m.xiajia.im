import {
  ARTICLE_SET_ARTICLE_LIST_LIMIT,
} from '../../../../src/features/article/redux/constants';

import {
  setArticleListLimit,
  reducer,
} from '../../../../src/features/article/redux/setArticleListLimit';

describe('article/redux/setArticleListLimit', () => {
  it('returns correct action by setArticleListLimit', () => {
    expect(setArticleListLimit()).toHaveProperty('type', ARTICLE_SET_ARTICLE_LIST_LIMIT);
  });

  it('handles action type ARTICLE_SET_ARTICLE_LIST_LIMIT correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: ARTICLE_SET_ARTICLE_LIST_LIMIT }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
