import { interval, map, share, take, tap,merge } from "rxjs";


let obs1$ = interval(500).pipe(map(i => `source 01 ${i}`))
let obs2$ = interval(500).pipe(map(i => `source 02 ${i}`))


let obs3$ = merge(obs1$,obs2$).pipe(take(5))

obs3$.subscribe(console.log)

