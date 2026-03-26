import { interval, map, take, tap } from "rxjs";


// interval(500).pipe(
//     take(5),
//     tap(d =>console.log("tap",d)),
//     map(d => d*10)
// )
// .subscribe(console.log)


let obs$ = interval(500)
obs$ = obs$.pipe(
    take(5),
    // tap(d =>console.log("tap",d)),
    // map(d => d*10)
)


obs$.subscribe(d => console.log("subscriber 1",d))
obs$.subscribe(d => console.log("subscriber 2",d))

setTimeout(()=>
    obs$.subscribe(d => console.log("subscriber 3",d))
,1000)
