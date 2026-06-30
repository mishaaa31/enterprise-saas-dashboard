import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  sidebarOpen: boolean;
  columnVisibility: Record<string, boolean>;
}

const initialState: UiState = {
  sidebarOpen: true,
  columnVisibility: {},
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
    setColumnVisibility: (state, action: PayloadAction<Record<string, boolean>>) => {
      state.columnVisibility = action.payload;
    },
    toggleColumnVisibility: (state, action: PayloadAction<string>) => {
      const columnId = action.payload;
      state.columnVisibility[columnId] = !(state.columnVisibility[columnId] ?? true);
    },
  },
});

export const { toggleSidebar, setSidebarOpen, setColumnVisibility, toggleColumnVisibility } = uiSlice.actions;
export default uiSlice.reducer;
