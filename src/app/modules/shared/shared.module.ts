import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InboxComponent} from './inbox/inbox.component';
import {CoreModule} from '@pl-core/core.module';
import { CreateComponent } from './create/create.component';
import {LoadMoreDataDirective} from './directives/loadmore.directive';
import {InboxService} from '../../core/_services/communication/inbox.service';
import { SearchComponent } from './search/search.component';
import {DynModuleSubcomponentComponent} from './dyn-module-subcomponent/dyn-module-subcomponent.component';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [CommonModule, CoreModule, RouterModule],
  declarations: [InboxComponent, CreateComponent, LoadMoreDataDirective, SearchComponent, DynModuleSubcomponentComponent],
  exports: [InboxComponent, CreateComponent, LoadMoreDataDirective, SearchComponent, DynModuleSubcomponentComponent],
  providers: [InboxService]
})

export class SharedModule {
}
