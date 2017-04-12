declare module "myurl" {
    export interface Url {
        proto?: string
        path?: string
    }
    export default function parse(url: string): string
}

declare module "mypath" {
    export let sep: string
    export default function normalize(p: string): string
}
