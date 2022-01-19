import { SET_ALERT, REMOVE_ALERT } from "../types";

export default (action, state) => {
	switch (action.type) {
		case SET_ALERT:
			return action.payload;
		case REMOVE_ALERT:
			return null;
		default:
			return state;
	}
};
