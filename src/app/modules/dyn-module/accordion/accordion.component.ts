import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';

@Component({
    selector: 'app-accordion',
    templateUrl: './accordion.component.html',
    styleUrls: ['./accordion.component.scss']
})
export class AccordionComponent implements OnInit {
    public groups = [];
    public headerIndex = 0;
    public noOfRows = 0;
    @ViewChild('accordionDiv') public accordionDiv;
    @Input() public header;
    @Input() private accordion;
    @Output() private moreData = new EventEmitter<any>();
    private page;
    constructor() {
        // constructor
    }
    public ngOnInit() {
        // ngInit
        const cardHeight = 68;
        const remainingHeight =  window.innerHeight - this.accordionDiv.nativeElement.offsetTop;
        this.noOfRows = Math.floor((remainingHeight) / cardHeight) - 1;
        console.log(this.noOfRows, remainingHeight, cardHeight);
        this.accordionDiv.nativeElement.style.maxHeight = (this.noOfRows * cardHeight) + 'px';
        this.page = 0;
        this.moreRows();
        console.log(this.accordionDiv);
    }
    public moreRows() {
        this.page += 1;
        if ((this.page * this.noOfRows) >= this.accordion.length) {
            this.groups = this.accordion;
            this.page = -1; // to hide the more items icon
        } else {
            this.groups = this.accordion.slice(0, (this.page * this.noOfRows));
        }
        this.groups.map((group, i) => {
            group.heading = {
                label: this.header[this.headerIndex].headerLabel,
                value: group[this.header[this.headerIndex].fieldId]
            };
        });
    }
    public moreDetails(id) {
            this.moreData.emit(id);
        }

    // public changeHeader(index) {
    //   this.headerIndex = index;
    //   this.groups.map((group) => {
    //     group.heading  = `${this.header[this.headerIndex].headerLabel} : ${group[this.header[this.headerIndex].fieldId]}`;
    //   });
    // }

}
