import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Programe } from 'src/app/models/Programe.model';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { ProgrameService } from '../../_services/programe.service';

@Component({
  selector: 'app-add-programe',
  templateUrl: './add-programe.component.html',
  styleUrls: ['./add-programe.component.css'],
})
export class AddProgrameComponent implements OnInit {
  programe: Programe = {
    title: '',
    date: '',
    duree: '',
    constat: '',
    cause: '',
    delait: '',
    conseq: '',
    action: ''
  };

  constructor(
    private programeService: ProgrameService,
    private router: Router,
    // private tokenStorageService: TokenStorageService,
  ) {}

  ngOnInit(): void {

  }

  savePrograme(): void {
    const data = {
      title: this.programe.title,
      date: this.programe.date,
      duree: this.programe.duree,
      constat: this.programe.constat,
      cause: this.programe.cause,
      delait: this.programe.delait,
      conseq: this.programe.conseq,
      action: this.programe.action,
    };

    this.programeService.create(data).subscribe(() => {
      this.router.navigate(['/programes']);
    });
  }

  newPrograme(): void {
    this.programe = {
      title: '',
      date: '',
      duree: '',
      constat: '',
      cause: '',
      delait: '',
      conseq: '',
      action: ''
    };
  }
}
