import { Injectable } from '@angular/core';
import {BaseService} from "./base.service";
import {IWorkspace} from "../interfaces/workspace.interface";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WorkspaceService extends BaseService{

  addWorkspace(param: IWorkspace):Observable<IWorkspace>{
    return this.post<IWorkspace>('project', param)
  }



}
