import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

/**
 * Custom hooks to use Redux dispatch and selector with app typings.
 * These hooks provide typed versions of useDispatch and useSelector for the app.
 */
export const useAppDispatch = useDispatch;
export const useAppSelector = useSelector;
