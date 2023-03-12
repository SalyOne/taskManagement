import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {IEpic} from "../../../../../core/interfaces/epic";
import {Subject, takeUntil} from "rxjs";
import {MatPaginator} from "@angular/material/paginator";
import {IQueryTable} from "../../../../../core/interfaces";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {EpicService} from "../../../../../core/services/epic.service";
import {IIssueType} from "../../../../../core/interfaces/issue-type";
import {DeletePopupComponent} from "../../../../../shared/popups/delete-popup/delete-popup.component";

@Component({
  selector: 'app-epic',
  templateUrl: './epic.component.html',
  styleUrls: ['./epic.component.scss']
})
export class EpicComponent implements OnDestroy,AfterViewInit{

  displayedColumns: string[] = ['id', 'name','description','createdAt','updatedAt','actions'];
  sub$ = new Subject();
  isLoading = false;
  totalData?: number;
  pageSizes = [5,10,20];
  @ViewChild('paginator') paginator!: MatPaginator;

  dataSource = new MatTableDataSource<IEpic>();
  epics:IEpic[] = []
  empTable!: IQueryTable<IEpic>;

  constructor(
    private epicService : EpicService,
    private route : ActivatedRoute,
    private router:Router,
    public dialog: MatDialog,
    private cd: ChangeDetectorRef
  ) { }

  getEpics(){
    console.log("in getIssues")
    return this.epicService.getAllEpics()
      .pipe(takeUntil(this.sub$))
      .subscribe(res=>{
        this.epics = res;
        this.dataSource =  new MatTableDataSource<IEpic>(this.epics);
        this.dataSource.paginator = this.paginator;
        this.isLoading =false
      })
  }

  ngAfterViewInit() {
    this.isLoading = true
    this.getEpics()
    // imistvis rom afterViewInit-is mere shecvlilma isLoading cvladma errori ar amoagdos
    this.cd.detectChanges()
  }


  delete(id?: number):void {
    this.openDialog().afterClosed().subscribe(res=>{
        if(res){
          this.epicService.deleteEpic(String(id))
            .pipe(takeUntil(this.sub$))
            .subscribe(res=>{
              // this.router.navigate(['/types'])
              console.log('get delete issue',  res)
              this.getEpics()
            })
        }
      }
    )
  }

  openDialog(){
    return  this.dialog.open(DeletePopupComponent, {
      width: '250px',
    });
  }
  ngOnDestroy(): void {
    this.sub$.next(null);
    this.sub$.complete()
  }

}
