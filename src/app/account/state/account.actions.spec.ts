import {
  AccountActionTypes,
  LoadMerchants
} from './account.actions';

describe('Account Actions', () => {
  it('should create LoadMerchants action', () => {
    const action = new LoadMerchants();
    expect(action.type).toEqual(AccountActionTypes.LoadMerchants);
  });
});
