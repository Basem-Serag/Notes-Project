import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotesService } from './../../services/notes.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import jwt_decode from 'jwt-decode';
import * as _ from 'lodash';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  userInfo: any = {};
  TOKEN: string;
  userNotes: any[] = [];
  noteID: any;
  isLoading: boolean = true;
  addForm: FormGroup;
  editForm: FormGroup;

  constructor(
    private modalService: NgbModal,
    private _NotesService: NotesService,
    private fb: FormBuilder,
    private _Router: Router
  ) {
    try {
      this.TOKEN = localStorage.getItem('TOKEN') || '{}';
      this.userInfo = jwt_decode(this.TOKEN);
    } catch (error) {
      localStorage.clear();
      this._Router.navigate(['/signin']);
    }
  }

  ngOnInit(): void {
    this.addForm = this.fb.group({
      title: [null, Validators.required],
      description: [null, Validators.required],
    });
    this.editForm = this.fb.group({
      title: [null, Validators.required],
      description: [null, Validators.required],
    });
    this.getUserNotes();
  }

  get f() {
    return this.addForm.controls;
  }

  getUserNotes() {
    const req = {
      token: this.TOKEN,
      userID: this.userInfo._id,
    };

    this._NotesService.getUserNotes(req).subscribe((res) => {
      if (res.message == 'success') {
        this.userNotes = res.Notes;
        this.isLoading = false;
      } else {
        localStorage.clear();
        this._Router.navigate(['/signin']);
      }
    });
  }

  onAdd() {
    this.isLoading = true;
    const req = {
      title: this.f.title.value,
      desc: this.f.description.value,
      citizenID: this.userInfo._id,
      token: this.TOKEN,
    };
    this._NotesService.addNote(req).subscribe((res) => {
      if (res.message == 'success') {
        this.isLoading = false;
        this.userNotes.push(res);
        this.modalService.dismissAll();
        this.addForm.reset();
        this.getUserNotes();
      }
    });
  }

  onDelete(id: number) {
    const req = {
      NoteID: id,
      token: this.TOKEN,
    };
    this._NotesService.deletedNote(req).subscribe((res) => {
      if (res.message == 'deleted') {
        this.modalService.dismissAll();
        this.getUserNotes();
      }
    });
  }

  onEdit(id: number) {
    for (let index = 0; index < this.userNotes.length; index++) {
      if (this.userNotes[index]._id == id) {
        this.editForm.controls.title.setValue(this.userNotes[index].title);
        this.editForm.controls.description.setValue(this.userNotes[index].desc);
        console.log(this.userNotes[index]);
      }
    }
  }

  onSave(noteID: number) {
    const req = {
      token: this.TOKEN,
      title: this.editForm.controls.title.value,
      desc: this.editForm.controls.description.value,
      NoteID: noteID,
    };
    this._NotesService.updateNote(req).subscribe((res) => {
      if (res.message == 'updated') {
        this.modalService.dismissAll();
        this.addForm.reset();
        this.getUserNotes();
        console.log(res);
      }
    });
  }

  //  open Modal method
  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  //  dismiss Modal method
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
