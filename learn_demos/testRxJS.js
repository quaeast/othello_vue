let rxjs = require('rxjs')
let Observable = rxjs.Observable;

const dataStream$ = new Observable(observer => {
    observer.next(1);
    setTimeout(() => {
        observer.next(2);
        observer.complete();
    }, 1000);
    observer.next(3);
});

const observer = {
    next: x => console.log(x),
    error: err => console.error(err),
    complete: () => console.log('done'),
}

dataStream$.subscribe(observer);

//200行代码理解 RxJS 的核心概念 - 王玉略的文章 - 知乎
// https://zhuanlan.zhihu.com/p/146795979
