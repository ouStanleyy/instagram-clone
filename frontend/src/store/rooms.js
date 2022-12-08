// constants
const LOAD_ROOMS = "rooms/LOAD_ROOMS";

// ACTION
const loadRooms = (rooms) => ({
  type: LOAD_ROOMS,
  rooms,
});

// THUNKS
export const getRooms = () => async (dispatch) => {
  const res = await fetch(`/api/rooms/`);
  const { Rooms } = await res.json();

  if (res.ok) {
    const normalizedData = {};
    Rooms.forEach((room) => (normalizedData[room.id] = room));
    dispatch(loadRooms(normalizedData));
    return normalizedData;
  }
};

const roomsReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_ROOMS:
      return { ...action.rooms };
    default:
      return state;
  }
};

export default roomsReducer;
