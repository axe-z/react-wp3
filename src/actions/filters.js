/*** action creator  FILTERS ***/

export const setTextFilter = (text = '') => ({
  type: 'SET_TEXT_FILTER',
  text
});

export const setSortByFilter = (val) => ({
  type: 'SET_SORT_BY_FILTER',
  val
})

export const setSortByDate = (payload = "date") => ({
  type: "SET_SORT_BY_DATE",
  payload
})
//OU
export const setSortByAmount = ( ) => ({
  type: "SET_SORT_BY_AMOUNT",
})


export const setStartDate = (payload = undefined) => ({
  type: "SET_START_DATE",
  payload
})
export const setEndDate = (payload = undefined) => ({
  type: "SET_END_DATE",
  payload
})
