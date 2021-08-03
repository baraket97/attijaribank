import { Component, OnInit } from '@angular/core';
import { ProgrameService } from '../../_services/programe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Programe } from 'src/app/models/Programe.model';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-programe-action',
  templateUrl: './programe-action.component.html',
  styleUrls: ['./programe-action.component.css'],
})
export class ProgrameActionComponent implements OnInit {
  currentPrograme: Programe = {
    title: '',
    date: '',
    duree: '',
    constat: '',
    cause: '',
    delait: '',
    conseq: '',
    action: '',
  };
  message = '';
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;

  constructor(
    private programeService: ProgrameService,
    private tokenStorageService:TokenStorageService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      console.log(this.roles);
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
    }
    this.message = '';
    this.getPrograme(this.route.snapshot.params.id);
  }

  getPrograme(id: string): void {
    this.programeService.get(id).subscribe(
      (data: Programe) => {
        this.currentPrograme = data;
        console.log(data);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  updatePrograme(): void {
    this.message = '';

    this.programeService
      .update(this.currentPrograme.id, this.currentPrograme)
      .subscribe(
        (response: { message: string }) => {
          console.log(response);
          this.message = response.message
            ? response.message
            : 'This programe was updated successfully!';
          this.router.navigate(['/programes']);
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  deletePrograme(): void {
    this.programeService.delete(this.currentPrograme.id).subscribe(
      () => {
        this.router.navigate(['/programes']);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
