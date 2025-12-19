import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterStateService } from '../services/filter-state.service';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-dashboard-filters',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './dashboard-filters.component.html',
  styleUrls: ['./dashboard-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardFiltersComponent {
  private readonly filterState = inject(FilterStateService);

  // Local (unapplied) state
  from: Date | null = null;
  to: Date | null = null;
  programId: number | null = null;

  apply(): void {
    if (this.from && this.to && this.from > this.to) {
      const tmp = this.from;
      this.from = this.to;
      this.to = tmp;
    }

    this.filterState.updateFilter({
      from: this.from,
      to: this.to,
      programId: this.programId
    });
  }

  clear(): void {
    this.from = null;
    this.to = null;
    this.programId = null;
    this.filterState.reset();
  }
}
