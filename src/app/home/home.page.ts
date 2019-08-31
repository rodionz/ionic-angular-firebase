import { Component, ViewChild, ElementRef } from '@angular/core';
import { Plugins } from '@capacitor/core';
import * as firebase from 'firebase';
import { Observable} from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Promise } from 'q';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})



export class HomePage {

  @ViewChild('firstNameRef', {static: false}) firstNameRef: ElementRef
  @ViewChild('lastNameRef', {static: false}) lastNameRef: ElementRef
  $users : Observable<User[]>;
  usersCollection: AngularFirestoreCollection<User>;
  
  constructor(private afs:AngularFirestore) {
   
//this.fApp = firebase.app();

this.usersCollection = this.afs.collection<User>('users');



this.$users = this.usersCollection.snapshotChanges().pipe(
  map(actions => {
    return actions.map(a => {
      const data = a.payload.doc.data();
      const id = a.payload.doc.id;
      return { id, ...data };
    });
  })
);
  }


  addIdea(user: User) {
    this.usersCollection.add(user);
  }

    
   
    
      localUser: User = {
        firstName : '',
        lastName : ''
          
        }
  //Plugins.GoogleAuth.signIn()

  handleFirstNameValue(event) {
    
  }
 handleLastNameValue(event) {
 
  }
  
  processForm(event){
    console.clear();
    this.localUser.firstName = this.firstNameRef.value;
    this.localUser.lastName = this.lastNameRef.value;
   this.addIdea(this.localUser)   
  }
}

export interface User{
  firstName : string;
  lastName: string
}

