import { ReactElement } from 'react';
import { Connect } from 'react-redux';

export interface Action<T = any> {
  type: T
}

export interface AnyAction extends Action {
  // Allows any extra properties to be defined in an action.
  [extraProps: string]: any
}

export interface Dispatch<A extends Action = AnyAction> {
  <T extends A>(action: T): T
}

export interface MiddlewareAPI<D extends Dispatch = Dispatch, S = any> {
  dispatch: D
  getState(): S
}

export interface Middleware<
  DispatchExt = {},
  S = any,
  D extends Dispatch = Dispatch
  > {
  (api: MiddlewareAPI<D, S>): (
    next: Dispatch<AnyAction>
  ) => (action: any) => any
}

export interface StateModule {
  module: string,
  state?: any,
  reducers: any
}

export const connect: Connect;

export type StateConfig = StateModule | StateModule[];

export type MiddleWareConfig = Middleware | Middleware[];

export interface BootoInstance {
  setup: (config: StateConfig) => void,
  use: (middleWareConfig: MiddleWareConfig) => void,
  start: (element: ReactElement, selector: HTMLElement) => void
}

declare const Booto:BootoInstance;

export default Booto;