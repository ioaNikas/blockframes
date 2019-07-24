import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { OrganizationQuery, OrganizationService, Organization } from '../../+state';
import { PermissionsQuery } from '../../permissions/+state';
import { OrganizationProfileForm } from '../../forms/organization-profile-edit-form';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { startWith, tap } from 'rxjs/operators';

@Component({
  selector: 'organization-editable',
  templateUrl: './organization-editable.component.html',
  styleUrls: ['./organization-editable.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrganizationEditableComponent implements OnInit {
  public opened = false;
  public organizationProfileForm: OrganizationProfileForm;
  public organization$: Observable<Organization>;
  public isSuperAdmin$: Observable<boolean>;

  constructor(
    private query: OrganizationQuery,
    private permissionsQuery: PermissionsQuery,
    private service: OrganizationService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.organization$ = this.query
      .select('org')
      .pipe(tap(org => this.organizationProfileForm.patchValue(org)));
    this.isSuperAdmin$ = this.permissionsQuery.isSuperAdmin$;
    this.organizationProfileForm = new OrganizationProfileForm(this.query.getValue().org);
  }

  public get organizationInformations$() {
    return this.organizationProfileForm.valueChanges.pipe(
      startWith(this.organizationProfileForm.value)
    );
  }

  public openSidenav() {
    this.opened = true;
  }

  public update() {
    try {
      if (this.organizationProfileForm.invalid)
        throw new Error('Your organization profile informations are not valid');
      this.service.update(this.organizationProfileForm.value);
      this.snackBar.open('Organization profile change succesfull', 'close', { duration: 2000 });
    } catch (error) {
      this.snackBar.open(error.message, 'close', { duration: 2000 });
    }
  }
}