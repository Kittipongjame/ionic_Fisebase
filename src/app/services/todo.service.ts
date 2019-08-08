import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
 
export interface Todo {
  id?: string;
  task: string;
  priority: string;
  nickname:string;
  addess: string;
  createdAt: number;
}
 
@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todosCollection: AngularFirestoreCollection<Todo>;
 
  private todos: Observable<Todo[]>;
 
  constructor(db: AngularFirestore) {
    this.todosCollection = db.collection<Todo>('Jame');
 
    this.todos = this.todosCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }
 
  getTodos() {
    return this.todos;
  }
 
  getTodo(id) {
    return this.todosCollection.doc<Todo>(id).valueChanges();
  }
 
  updateTodo(todo: Todo, id: string) {
    return this.todosCollection.doc(id).update(todo);
  }
 
  addTodo(todo: Todo) {
    return this.todosCollection.add(todo);
  }
 
  removeTodo(id) {
    return this.todosCollection.doc(id).delete();
  }
  editTodo(idd) {
    idd.isEdit = true;
    idd.EditTask = idd.task;
    idd.EditPriority = idd.priority;
    idd.EditNickname = idd.nickname;
    idd.EditAddess = idd.addess;
  }
  updateSave(upsave){
    let idd = {};
    idd['tack'] = upsave.EditTask;
    idd['priority'] = upsave.EditPriority;
    idd['nickname'] = upsave.EditNickname;
    idd['addess'] = upsave.EditAddess;

  }
}
