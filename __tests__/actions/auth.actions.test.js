import * as actions from '../../src/state/actions/auth.actions';
import * as types from '../../src/state/constants/auth.constants';

describe('auth actions', () => {
  it('should create a login attempt', () => {
    const payload = { a: 'b' };
    const expected = {
      type: types.LOGIN.ATTEMPT,
      payload
    };

    expect(actions.tryLogin(payload)).toEqual(expected);
  });

  it('should create an accept invite attempt', () => {
    const payload = { a: 'b' };
    const expected = {
      type: types.ACCEPT_INVITE.ATTEMPT,
      payload
    };

    expect(actions.tryAcceptInvite(payload)).toEqual(expected);
  });
});
