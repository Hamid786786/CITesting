import { Component, OnInit, Input, ElementRef, OnDestroy, ViewEncapsulation } from '@angular/core';
import { InboxService, NodeDisplayService } from '@pl-core/_services/';
import { DialogComponent } from '@pl-modules/dialog/dialog.component';
import { MdDialog, MdSnackBar } from '@angular/material';
import { TranslateService } from '@pl-core/_services/translate/translate.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { IInboxDetails } from '@pl-core/_interfaces/inbox-details';
import { GLOBAL} from '@pl-core/_config/constants';

@Component({
  selector: 'app-inbox-details',
  templateUrl: './inbox-details.component.html',
  styleUrls: ['./inbox-details.component.scss'],
  providers: [InboxService],
  encapsulation: ViewEncapsulation.None
})

export class InboxDetailsComponent implements OnInit, OnDestroy {
  public inboxId: number;
  public inboxDetails: IInboxDetails = {
    to: null,
    priority: null,
    type: null,
    from: null,
    receivedOn: null,
    greetings: null,
    contentBody: null
  };
  public selectedOption: any;
  public priorityFlag: boolean = false;
  public prioritySubscription: Subscription;
  public myElement: ElementRef;

  constructor(private _inboxService: InboxService,
              public dialog: MdDialog,
              public translateService: TranslateService,
              public _router: Router,
              public NodeDisplayService: NodeDisplayService,
              myElement: ElementRef,
              private route: ActivatedRoute,
              private snackBar: MdSnackBar) {
    localStorage.setItem('redirectOnMobile', 'inbox');
    this.myElement = myElement;
  }

  public ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.inboxId = +params['inboxId']; // (+) converts string 'id' to a number;
      this._inboxService.getInboxDetails(this.inboxId).subscribe((_res) => {
        this.inboxDetails = _res;
      });
    });

    this.prioritySubscription = this.NodeDisplayService.node$.subscribe((node) => {
      if (node.id === this.inboxId) {
        this._inboxService.getInboxDetails(node.id).subscribe((_res) => {
          this.inboxDetails = _res;
        });
      }
    });
  }

  // dialog pop up
  public showDialogPopup(title, body): void {
    let dialogRef = this.dialog.open(DialogComponent, { disableClose: true }); // pass properties here
    dialogRef.componentInstance.title = this.translateService.instant(`${title}`);
    dialogRef.componentInstance.body = body;
    dialogRef.componentInstance.button = this.translateService.instant('ok');
    dialogRef.componentInstance.isAutherized = true;
    dialogRef.afterClosed().subscribe((result) => {
      this.selectedOption = result;
    });
  }

  // on click of flag icon to set priority and set color to the flag
  public setPriority(Id, mailDetailItem) {
    this.priorityFlag = mailDetailItem.isPrioritySet;
    let mailItem = mailDetailItem;
    mailItem.isPrioritySet = !this.priorityFlag;
    this._inboxService.setPriority(Id, mailItem).subscribe((_res) => {
      if (_res) {
        this.NodeDisplayService.addNode(_res);
        if (_res.isPrioritySet) {
          let div = this.myElement.nativeElement.querySelector('.priority' + Id).style.color = 'red';
        } else {
          let div = this.myElement.nativeElement.querySelector('.priority' + Id).style.color = 'grey';
        }
      }
    });

  }

  // toast messages for the actions commited
  public callActionsOnClick(actiontype) {

    switch (actiontype) {
      case 'Approve': {
        this.snackBar.open(this.translateService.instant('Task Approved'), this.translateService.instant('close'), {
          duration: GLOBAL.constants.DURATION,
          extraClasses: ['success']
        });
        break;
      }
      case 'Decline': {
        this.snackBar.open(this.translateService.instant('Task Declined'), this.translateService.instant('close'), {
          duration: GLOBAL.constants.DURATION,
          extraClasses: ['error']
        });
        break;
      }
      case 'Reply': {
        this.snackBar.open(this.translateService.instant('Coming Soon'), this.translateService.instant('close'), {
          duration: GLOBAL.constants.DURATION,
          extraClasses: ['warning']
        });
        break;
      }

      case 'Reply All': {
        this.snackBar.open(this.translateService.instant('Coming Soon'), this.translateService.instant('close'), {
          duration: GLOBAL.constants.DURATION,
          extraClasses: ['warning'],
        });
        break;
      }
      case 'Forward': {
        this.snackBar.open(this.translateService.instant('Coming Soon'), this.translateService.instant('close'), {
          duration: GLOBAL.constants.DURATION,
          extraClasses: ['warning']
        });
        break;
      }
      case 'More Information': {
        this.snackBar.open(this.translateService.instant('Coming Soon'), this.translateService.instant('close'), {
          duration: GLOBAL.constants.DURATION,
          extraClasses: ['warning']
        });
        // TODO, need to write the redirect logic
        break;
      }
      default:
        ;
    }
  }

  public ngOnDestroy() {
    this.prioritySubscription.unsubscribe();
  }
}
