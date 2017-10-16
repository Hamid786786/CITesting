import {Directive, ElementRef, HostListener, Output, EventEmitter, Input, AfterViewInit} from '@angular/core';

@Directive({
    selector: '[loadMoreData]'

})
export class LoadMoreDataDirective implements AfterViewInit {
    @Output() public scrolledToBottom: EventEmitter<any> = new EventEmitter<any>();
    @Input('loadOnData') public loadOnData;
    @Input('reinitialize') public reinitialize;

    constructor(private el: ElementRef) {

    }

    public ngAfterViewInit() {
        // console.log('Slim scroll appeared', this.el.nativeElement);

    }

    @HostListener('scroll', ['$event'])
    public onScroll(event) {
        let element = this.el.nativeElement;
        // console.log(`scrollTop ${element.scrollTop},clientHeight : ${element.clientHeight}, scrollHeight ${element.scrollHeight}, offsetHeight ${element.offsetHeight}`
        if ( Math.round(parseInt(element.scrollTop + element.offsetHeight, 10)) >= parseInt(element.scrollHeight, 10)) {
            // console.log('element is at the end of its scroll, load more content')
            this.scrolledToBottom.emit('loadmore');
        }
    }
}
