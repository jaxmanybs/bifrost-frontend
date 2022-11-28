import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent, ModalViewerDashboard, NewUserDashboard } from './dashboard.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatGridListModule } from '@angular/material/grid-list';
// import { TranslateModule } from '@ngx-translate/core';
import { MainService } from 'src/app/shared/services/main/main.service';

import { StatModule } from 'src/app/shared/modules/stat/stat.module';

import { DialogOverviewDashboard } from './dashboard.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    Ng2SearchPipeModule,
    MatGridListModule,
    StatModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    // TranslateModule,
    NgbModule,
    MatDialogModule, MatFormFieldModule,
    FormsModule,
    HttpClientModule,
    MatPaginatorModule,
    // SEARCH BAR
    MatInputModule,
    // END SEARCH BAR
    FlexLayoutModule.withConfig({addFlexToParent: false})
  ],
  declarations: [DashboardComponent, DialogOverviewDashboard, ModalViewerDashboard, NewUserDashboard],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {}
    },
  MainService],
  bootstrap: [DashboardComponent],
  exports: [DashboardComponent],
  entryComponents: [DialogOverviewDashboard, ModalViewerDashboard, NewUserDashboard]
})
export class DashboardModule { }
