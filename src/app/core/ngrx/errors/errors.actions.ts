import { createAction, props } from "@ngrx/store";
import { CustomError } from "@shared/types/class.types";

// GET ERRORS
export const get =
  createAction('[Errors API] Get Errors');

export const getSuccess =
  createAction('[Errors API] Get Errors Success',
  props<{ errors: CustomError[] }>());

export const getFailure =
  createAction('[Errors API] Get Errors Failure',
  props<{ error: string }>());