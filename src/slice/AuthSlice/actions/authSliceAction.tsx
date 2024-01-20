import { setData, setLoading } from "../authSlice.tsx"

export const setAuthAction = (data: any) => (dispatch: any) => {
  dispatch(setLoading())
  dispatch(setData(data))
}