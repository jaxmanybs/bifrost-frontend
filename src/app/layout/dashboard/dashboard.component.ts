// ELEMENTOS Y SERVICIOS QUE VAS A USAR
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MainService } from 'src/app/shared/services/main/main.service';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Main } from 'src/app/shared/models/main';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})

/* IMPORTANTE:
    LAS PÁGINAS DE LICENCIAS Y SERVIDORES SON PRÁCTICAMENTE LO MISMO A ESTO,
    PERO ENFOCADAS A DICHAS ÁREAS
    LO ÚNICO PENDIENTE ES QUE LAS FILAS TENGAN UNA VIEW ENFOCADA A LICENCIAS Y SERVIDORES RESPECTIVAMENTE
*/

export class DashboardComponent implements OnInit {
  // EN EL CONSTRUCTOR METES LOS SERVICIOS Y IMPORTS QUE VAS A USAR
  // private/public CodeName: ServiceName
  constructor(private userService: MainService, public dialog: MatDialog) {
    console.log(this.dataSource);
    userService.usersMain().subscribe((data) => {
      console.warn('data');
      this.dataSource = data;
    });
  }
  displayedColumns: string[] = [
    'Id', 'OwnerName', 'UserName', 'Password', 'Category', 'Access', 'Resource', 'Instructions', 'Notes', 'Extras'
  ];
  dataSource;
  user;
  users: Main[];
  // dataSource: any;

  @ViewChild(MatSort) sort: MatSort;
  filterTerm!: string;

  ngOnInit() {
    this.dataSource.filterPredicate = function (record, filter) {
      return record.Gender.toLocaleLowerCase() === filter.toLocaleLowerCase();
    };
  }

  addItem() {
    // ADD ITEM ESTÁ INCOMPLETO, LA COLUMNA SE SIGUE AGREGANDO VACÍA
    /*
      const newRow = {'Id': 10, 'OwnerName': '', 'UserName': '', 'Password': '', 'Category': '',
      'Access': '', 'Resource:' : '', 'Instructions': '', 'Notes': '', 'Extras': '', isEdit: true};
      this.dataSource = [...this.dataSource, newRow];
    */
    const newRow = this.dialog.open(NewUserDashboard);
    this.dataSource = [...this.dataSource, newRow];
    newRow.afterClosed().subscribe(result => {
    });
  }
  // EDIT USER YA FUNCIONA BIEN
  editUser(user) {
    // ABRE EL MODAL
    const dialogRef = this.dialog.open(DialogOverviewDashboard, {
      width: '450px', // ANCHO DEL MODAL
      data: user // DATOS QUE JALA
    });

    // GUARDA LA INFORMACIÓN NUEVA TRAS CERRARLO
    dialogRef.afterClosed().subscribe(result => {
      this.user = user;
    });
  }

  // SEE ITEM YA FUNCIONA, SOLO ES UN DISPLAY
  seeItem(user) {
    const dialogView = this.dialog.open(ModalViewerDashboard, {
      width: '450px',
      data: user
    });
  }

  // ELIMINA LA FILA CON LOS DATOS BASADOS EN EL ID DE LA FILA
  removeRow(id: number) {
    console.log(this.dataSource);
    this.dataSource = this.dataSource.filter((u) => u.Id !== id);
    console.log(this.dataSource);
  }
}


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'dialog-overview-dashboard',
  templateUrl: 'dialog.html',
})

// tslint:disable-next-line:component-class-suffix
export class DialogOverviewDashboard {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewDashboard>,
    @Inject(MAT_DIALOG_DATA) public data: Main) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'modal-viewer-dashboard',
  templateUrl: 'modalview.html',
  styleUrls: ['dashboard.component.scss']
})
// tslint:disable-next-line:component-class-suffix
export class ModalViewerDashboard {

  constructor(
    public dialogRef: MatDialogRef<ModalViewerDashboard>,
    @Inject(MAT_DIALOG_DATA) public data: Main) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'new-user-dashboard',
  templateUrl: 'newuser.html',
  styleUrls: ['dashboard.component.scss']
})
// tslint:disable-next-line:component-class-suffix
export class NewUserDashboard {

  constructor(
    public dialogRef: MatDialogRef<NewUserDashboard>,
    @Inject(MAT_DIALOG_DATA) public data: Main) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}


