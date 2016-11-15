import * as actions from '../../src/state/actions/squadList.actions';
import * as types from '../../src/state/constants/squads.constants';

describe('squadList actions', () => {
  it('should create a Get Squad List attempt', () => {
    const payload = { a: 'b' };
    const expected = {
      type: types.GET_SQUAD_LIST.ATTEMPT,
    };

    expect(actions.getSquadList(payload)).toEqual(expected);
  });

  it('should create an New Squad Mission attempt', () => {
    const payload = { a: 'b' };
    const expected = {
      type: types.NEW_MISSION.ATTEMPT,
      payload
    };

    expect(actions.newSquadMission(payload)).toEqual(expected);
  });
})
