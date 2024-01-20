import { createSlice } from "@reduxjs/toolkit"
import { AUTH_SLICE } from "../../constants/authConstant.tsx"


interface AuthState {
    data: any,
    loading: boolean,
    error: any
}

const initialState: AuthState ={
  data: null,
  loading: false,
  error: null
}

const AuthSlice = createSlice({
  name: AUTH_SLICE,
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload
      state.loading = false;
      state.error = null
    },
    setLoading: (state) => {
      state.loading = true,
      state.error = null
    },
    setError: (state, action) => {
      state.loading = false,
      state.error = action.payload
    }
  }
})

export const {setData, setError, setLoading} = AuthSlice.actions

export default AuthSlice.reducer