import { StateCreator } from 'zustand';


export interface GuestSlice {
  guestCount: number,
  setGuestCount: ( value: number ) => void,
}


export const createGuestSlice: StateCreator<GuestSlice> = ( set, get ) => ( {
  guestCount: 0,
  setGuestCount: ( value: number ) => {
    if ( get().guestCount < 0 ) return;
    set( { guestCount: value } );
  }
} );