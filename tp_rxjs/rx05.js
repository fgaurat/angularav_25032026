import { interval, scan,map } from "rxjs";



interval(400).pipe(

    scan( ([a,b]) => [b,a+b],[0,1]),
    map(([b])=> b))
.subscribe(v => console.log(v))


