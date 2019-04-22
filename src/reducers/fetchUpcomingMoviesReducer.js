export default(state = [], action) => {
	switch(action.type) {
		case 'FETCH_CAROUSEL_MOVIES':
			return action.payload.upcoming;
		default:
			return state;
	}
};