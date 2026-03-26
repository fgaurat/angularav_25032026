import { interval, map, share, take, tap } from "rxjs";

let obs$ = interval(500)
obs$ = obs$.pipe(
    take(5),
    share()
)


obs$.subscribe(d => console.log("subscriber 1",d))
obs$.subscribe(d => console.log("subscriber 2",d))

setTimeout(()=>
    obs$.subscribe(d => console.log("subscriber 3",d))
,1000)