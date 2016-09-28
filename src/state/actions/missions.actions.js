import { UPDATE_FIELD } from 'state/constants/missions.constants';

export const updateField = (field, data) => ({
  type: UPDATE_FIELD,
  field,
  data
});
