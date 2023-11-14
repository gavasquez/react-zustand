import { create } from 'zustand';
import { persist } from 'zustand/middleware';
interface Bear {
  id: number;
  name: string;
}

interface BearState {
  blackBears: number;
  polarBears: number;
  pandaBears: number;
  bears: Bear[],
  totalBears: () => number;
  increaseBlackBear: ( by: number ) => void;
  increasePolarBear: ( by: number ) => void;
  increasePandaBear: ( by: number ) => void;
  doNothing: () => void;
  addBear: () => void;
  clearBears: () => void;
}

export const useBearStore = create<BearState>()(
  persist( ( set, get ) => ( {
    blackBears: 10,
    pandaBears: 1,
    polarBears: 5,
    bears: [
      {
        id: 1,
        name: 'Oso No.1'
      }
    ],
    totalBears(): number {
      return get().blackBears + get().polarBears + get().pandaBears + get().bears.length;
    },
    increaseBlackBear: ( by: number ) => set( ( state ) => ( { blackBears: state.blackBears + by } ) ),
    increasePolarBear: ( by: number ) => set( ( state ) => ( { polarBears: state.polarBears + by } ) ),
    increasePandaBear: ( by: number ) => set( ( state ) => ( { pandaBears: state.pandaBears + by } ) ),
    doNothing: () => set( state => ( { bears: [ ...state.bears ] } ) ),
    addBear: () => set( state => ( {
      bears: [ ...state.bears, { id: state.bears.length + 1, name: `Oso No.${ state.bears.length + 1 }` } ]
    } )
    ),
    clearBears: () => set( ( { bears: [] } ) ),
  } ),
    { name: 'bears-store' } )
);