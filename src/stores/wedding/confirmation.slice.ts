import { StateCreator } from 'zustand';

export interface ConfirmationState {
  isConfimed: boolean,
  setIsConfirmed: ( confirmed: boolean ) => void;
}

export const createConfirmationSlice: StateCreator<ConfirmationState> = ( set ) => ( {
  isConfimed: true,
  setIsConfirmed: ( confirmed: boolean ) => set( ( { isConfimed: confirmed } ) )
} );