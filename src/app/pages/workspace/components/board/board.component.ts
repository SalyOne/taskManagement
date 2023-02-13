import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ITask } from 'src/app/core/interfaces/board';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit{


todoForm !: FormGroup
tasks: ITask [] = []
inprogress: ITask[] = []
done: ITask[] = []
updateIndex!: any
isEditEnabled: boolean = false

constructor(
  private fb: FormBuilder
) {
  
}

ngOnInit(): void {

  this.todoForm = this.fb.group({
    item : ['', Validators.required]
  })
  

}

addTask(){
  this.tasks.push({
    description:this.todoForm.value.item,
    done:false
})
this.todoForm.reset()
}

onEdit(item:ITask, i: number){
  this.todoForm.controls['item'].setValue(item.description)
  this.updateIndex = i
  this.isEditEnabled = true
}

deleteTask(i: number){
  this.tasks.splice(i,1)
}

deleteInprogress(i: number){
  this.inprogress.splice(i,1)
}
deleteDone(i: number){
  this.done.splice(i,1)
}

updateTask(){
  this.tasks[this.updateIndex].description = this.todoForm.value.item;
  this.tasks[this.updateIndex].done = false
  this.todoForm.reset()
  this.updateIndex = undefined
  this.isEditEnabled = false
}


drop(event: CdkDragDrop<ITask[]>) {
  if (event.previousContainer === event.container) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  } else {
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex,
    );
  }
}

}
