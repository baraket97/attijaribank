import { Component, OnInit } from '@angular/core';
import { Programe } from 'src/app/models/Programe.model';
import { ProgrameService } from '../../_services/programe.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-programes-list',
  templateUrl: './programes-list.component.html',
  styleUrls: ['./programes-list.component.css'],
})
export class programesListComponent implements OnInit {
  public isCollapsed = true;
  userId = null;
  userName = null;

  programes?: Programe[];
  currentPrograme?: Programe;
  currentIndex = -1;
  owner = '';

  constructor(
    private programeService: ProgrameService,
    private tokenStorageService: TokenStorageService
  ) {}

  ngOnInit(): void {
    this.retrieveProgrames();
    console.log(this.programes);
    this.userId = this.tokenStorageService.getUser().id;
  }

  retrieveProgrames(): void {
    this.programeService.getAll().subscribe(
      (data: Programe[] | undefined) => {
        this.programes = data;
        console.log(data);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  refreshList(): void {
    this.retrieveProgrames();
    this.currentPrograme = undefined;
    this.currentIndex = -1;
  }

  setActivePrograme(programe: Programe, index: number): void {
    this.currentPrograme = programe;
    this.currentIndex = index;
  }

  removeAllProgrames(): void {
    this.programeService.deleteAll().subscribe(
      (response: any) => {
        console.log(response);
        this.refreshList();
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  searchOwner(): void {
    this.currentPrograme = undefined;
    this.currentIndex = -1;

    this.programeService.findByOwner(this.owner).subscribe(
      (data: Programe[] | undefined) => {
        this.programes = data;
        console.log(data);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
