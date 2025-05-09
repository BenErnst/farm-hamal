import { useSelector, useDispatch, type TypedUseSelectorHook } from 'react-redux';
import type { AppDispatch, RootState } from '../types/Store';

export const useAppSelector = useSelector as TypedUseSelectorHook<RootState>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
