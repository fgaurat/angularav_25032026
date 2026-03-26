import { interval, map, share, take, tap,merge,switchMap } from "rxjs";


let obs1$ = interval(1000)
obs1$.pipe(
    take(5),
    tap(i => console.log("avant",i)),
    switchMap(i =>{
        return interval(200).pipe(take(5))
        // return interval(200)
    }),
    // take(5),
    tap(i => console.log("\taprès",i)),
).subscribe()
