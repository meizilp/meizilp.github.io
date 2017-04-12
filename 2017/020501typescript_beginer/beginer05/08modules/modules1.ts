export interface m1_1 {
    name: string
}

interface m1_2 {
    name: string
}

export { m1_2 }

import { m2_1 } from './modules2';
export { m2_1 }
export { m2_2 as m22 } from './modules2'
export * from './modules3'

let m21: m2_1 = { name: "m21" }
//let m22: m2_2 = { name: "m22" }

// export default interface {
//     pp: string
// }
