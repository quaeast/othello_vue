const rxjs = require('rxjs')
const Observable = rxjs.Observable;
const Subject = rxjs.Subject;

//https://stackoverflow.com/questions/44369387/how-to-watch-object-changes-with-rxjs-5

Observable.ofProxyChanges = (target) => {
    let subject = new Subject
    let proxy = new Proxy(target, {
        set(target, key, val) {
            let oldValue = target[key]
            target[key] = val
            subject.next({
                type: oldValue === undefined ? "add" : "change",
                object: target,
                name: key,
                oldValue: oldValue
            })
        }
    })
    return [proxy, subject.asObservable()]
}

let [obj, objChange$] = Observable.ofProxyChanges({})
objChange$.subscribe({next: x => console.log(x), complete: () => console.log("over")})

obj.bar = 1 // logs { type: "add", name: "bar", object: { bar: 1 } }
obj.foo = 2 // logs { type: "add", name: "foo", object: { bar: 1, foo: 2 } }
obj.foo = 3 // logs { type: "change", name: "foo", object: { bar: 1, foo: 3 }, oldValue: 2 }
